import { GetYearResponse, ResponsePatch } from "@/types";

const useHandleYear = () => {
    const getCurrentYear = async (): Promise<GetYearResponse>=> {
        const response = await fetch("http://localhost:3001/api/academicYear", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
      
        if (!response.ok) {
          throw new Error("L'année n'a pas été récupéré");
        }
      
        return response.json();
      };
      
    const patchYear = async (data: GetYearResponse): Promise<ResponsePatch>=> {
      const response = await fetch("http://localhost:3001/api/academicYear", {
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
  return {getCurrentYear, patchYear}
}

export default useHandleYear
