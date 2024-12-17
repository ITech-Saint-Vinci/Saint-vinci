import { Eye } from 'lucide-react';
import { Student, StudentLevel } from '@/types/student';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
              {students.length} élève{students.length !== 1 ? 's' : ''}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {students.map((student) => (
              <div
                key={student.id}
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
                      student.status === 'Admis'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {student.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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