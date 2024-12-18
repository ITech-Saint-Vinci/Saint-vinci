import { ResponsePatch, StudentsGetResponse, UpdateStatusData } from "@/types";

const useStudents = ()=>{
    const getStudentsRepeating = async (): Promise<StudentsGetResponse[]>=> {
        const response = await fetch("http://localhost:3001/api/students/repeating", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
      
        if (!response.ok) {
          throw new Error("Les élèves n'ont pas pu être récupérer !");
        }
      
        return response.json();
      };

      const updateStatusStudent = async (data: UpdateStatusData): Promise<ResponsePatch>=> {
        console.log(data);
        
        const response = await fetch("http://localhost:3001/api/students", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
      
        if (!response.ok) {
          throw new Error("Il y a eu une erreur lors de la clôture de l'année !");
        }
      
        return response.json();
      };
      return {updateStatusStudent, getStudentsRepeating}
}
export default useStudents