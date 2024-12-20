import { Button } from "@/components/ui/button";
import { StudentAccordion } from "@/components/students/StudentAccordion";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/contants";
import { useStudents } from "@/hooks/useStudents";
import { Spinner } from "../loading/spinner";
import { studentApi } from "@/services/api";
import { InscriptionForm } from "../forms/inscriptionForm";
import { Classes } from "@/types";
import { useState } from "react";
import { FileUploadDialog } from "../forms/fileUploadForm";

export function SchoolYear() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [err, setErr] = useState();

  const { data: classes, isLoading } = useStudents(
    "classes",
    studentApi.getStudentsByClass
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Année 2024-2025</h2>
        <div className="flex items-center justify-between space-x-4">
          {role === UserRole.Director && (
            <Button
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => {
                navigate("/closeYear");
              }}
            >
              Clôturer l'année
            </Button>
          )}
          {role === UserRole.Admin && (
            <>
              <FileUploadDialog />
              <InscriptionForm />
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {classes.data.map((classe: Classes) => (
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

export default SchoolYear;
