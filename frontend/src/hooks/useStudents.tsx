import { ResponsePatch, StudentsGetResponse, UpdateStatusData } from "@/types";
import { useAuth } from "./useAuth";
import { z } from "zod";

const useStudents = ()=>{
    const {token}= useAuth()
    const getStudentsRepeating = async (): Promise<StudentsGetResponse[]>=> {
        const response = await fetch("http://localhost:3001/api/students/repeating", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
      
        if (!response.ok) {
          throw new Error("Les élèves n'ont pas pu être récupérer !");
        }
      
        return await response.json();
      };

      const updateStatusStudent = async (data: UpdateStatusData): Promise<ResponsePatch>=> {
        try {
        const updateStudentSchema = z.object({
          studentId: z.string().nonempty("La demande n'a pas pu aboutir !"),
          isReapeating: z.boolean({invalid_type_error: "La demande n'a pas pu aboutir !"}),
        });
        updateStudentSchema.parse(data)
        const response = await fetch("http://localhost:3001/api/students", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
      
        if (!response.ok) {
          throw new Error("Il y a eu une erreur lors de la clôture de l'année !");
        }
      
        return await  response.json();
      } catch (error: any) {
          if(error instanceof z.ZodError){
          throw new Error(JSON.parse(error.toString()).map((e: any)=>e.message).flat().join(' '))
          }
          throw new error
      }
      };
      return {updateStatusStudent, getStudentsRepeating}
}
export default useStudents