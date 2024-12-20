import { Spinner } from "@/components/loading/spinner";
import { StudentAccordion } from "@/components/students/StudentAccordion";
import { Button } from "@/components/ui/button";
import useDirector from "@/hooks/useDIrector";
import { StudentsGetResponse } from "@/types";
import { useNavigate } from "react-router";

function CloseYear() {
  const navigate = useNavigate();
  const { queryOnLoad, mutationPatchYear, mutationUpdateStudent, allStudents } =
    useDirector();

  const onSubmit = () => {
    if (queryOnLoad.data?.year.year)
      mutationPatchYear.mutate(queryOnLoad.data?.year);
  };
  const onClickOnClose = async (id: string) => {
    mutationUpdateStudent.mutate({ studentId: id, isReapeating: false });
  };
  const back = () => {
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-background ">
        {queryOnLoad.isInitialLoading ? (
          <Spinner />
        ) : (
          <>
            <main className="container px-4 py-6 flex flex-col items-center gap-3 w-full">
              <div className="w-full">
                {allStudents.length > 0 &&
                  allStudents.map(
                    (item: StudentsGetResponse, index: number) => {
                      return (
                        <StudentAccordion
                          key={index}
                          level={item.name}
                          students={item.students}
                          onClickButton={onClickOnClose}
                        ></StudentAccordion>
                      );
                    }
                  )}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="default"
                  onClick={back}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Retour
                </Button>
                <Button
                  variant="default"
                  onClick={onSubmit}
                  disabled={
                    mutationPatchYear.isLoading ||
                    !queryOnLoad.data?.year.year
                  }
                  className="bg-destructive hover:bg-destructive-100"
                >
                  Valider
                </Button>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
}
export default CloseYear;
