import { GetYearResponse, ResponsePatch } from "@/types";
import { useAuth } from "./useAuth";
import { z } from "zod";

const useHandleYear = () => {
    const {token}= useAuth()
    const getCurrentYear = async (): Promise<GetYearResponse>=> {
        const response = await fetch("http://localhost:3001/api/academicYear", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
      
        if (!response.ok) {
          throw new Error("L'année n'a pas été récupéré");
        }
      
        return response.json();
      };
      
    const patchYear = async (data: GetYearResponse): Promise<ResponsePatch>=> {
      try {
        const updateYearSchema = z.object({
          year: z.string().nonempty("La demande n'a pas pu aboutir !"),
        });
        updateYearSchema.parse(data)
        const response = await fetch("http://localhost:3001/api/academicYear", {
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
    
      return response.json();
      } catch (error: any) {
          if(error instanceof z.ZodError){
            throw new Error(JSON.parse(error.toString()).map((e: any)=>e.message).flat().join(' '))
          }
        throw new error
      }
    };
  return {getCurrentYear, patchYear}
}

export default useHandleYear
