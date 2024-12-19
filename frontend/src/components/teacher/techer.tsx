import { Button } from "@/components/ui/button";
import { StudentAccordion } from "@/components/students/StudentAccordion";
import { useStudents } from "@/hooks/useStudents";
import { Spinner } from "../loading/spinner";
import { studentApi } from "@/services/api";
import { jsPDF } from "jspdf";
import { Classes } from "@/types";
import { Download } from "lucide-react";

export function TeacherYear() {
  const { data: teacherStudents, isLoading } = useStudents(
    "teacherStudents",
    studentApi.getAllClasses
  );

  const handleDownloadPDF = async () => {
    try {
      const content = teacherStudents!.data.flatMap((classe: Classes) =>
        classe.students.map(({ firstName, lastName, birthdate }) => ({
          name: `${firstName} ${lastName}`,
          birthdate: birthdate,
        }))
      );

      const doc = new jsPDF();

      let yPosition = 10;

      content.forEach((student) => {
        doc.text(`Name: ${student.name}`, 10, yPosition);
        yPosition += 5;
        doc.text(`Date of Birth: ${student.birthdate}`, 10, yPosition);
        yPosition += 10;
      });

      doc.save("students.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Année 2024-2025</h2>
        <div className="flex items-center justify-between space-x-4">
          <>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownloadPDF}
            >
              <Download className="h-4 w-4" />
              Télécharger PDF
            </Button>
          </>
        </div>
      </div>

      <div className="space-y-4">
        {teacherStudents.data.map((classe: Classes) => (
          <StudentAccordion
            key={classe._id}
            level={classe.name}
            students={classe.students}
          />
        ))}
      </div>
    </div>
  );
}

export default TeacherYear;
