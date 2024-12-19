import { Eye, X } from "lucide-react";
import { Student, StudentLevel } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/contants";

interface StudentAccordionProps {
  student: Student;
  onClickButton?: (id: string)=> void;
}

export function StudentAccordion({ level, students, onClickButton  }: StudentAccordionProps) {
  const {role} = useAuth()
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={student.class.name}>
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-4">
            <h2 className="text-xl font-semibold">{student.class.name}</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {students.map((student, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    {student.firstName[0]}
                  </div>
                  <span>{`${student.firstName} ${student.lastName}`}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      !student.isReapeating
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {!student.isReapeating ?"Admis" : "Redoublant"}
                  </span>
                  <Button variant="ghost" size="icon" onClick={()=>onClickButton && onClickButton(student._id)}>
                   {role === UserRole.Director ? <X  /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
