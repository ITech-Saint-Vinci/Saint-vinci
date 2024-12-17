import { Student, StudentLevel } from "@/types";
import { StudentCard } from "./student-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface StudentAccordionProps {
  level: StudentLevel;
  students: Student[];
}

export function StudentAccordion({ level, students }: StudentAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={level}>
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full pr-4">
            <h2 className="text-xl font-semibold">{level}</h2>
            <span className="text-sm text-muted-foreground">
              {students.length} élève{students.length !== 1 ? "s" : ""}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
            {students.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Aucun élève dans cette classe
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
