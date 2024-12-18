import { Header } from "@/components/layout/header";
import { StudentAccordion } from "@/components/students/StudentAccordion";
import { Button } from "@/components/ui/button";
import { Student, StudentLevel } from "@/types/student";
import {  useMutation, UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";

type StudentsResponse = {level: StudentLevel, order: number, students: Student[]}
type UpdateYearResponse = {message: string}
type GetYearResponse = {year: string}
type OnLoadResponse = {year: GetYearResponse, students: StudentsResponse[]}

const getStudentsRepeating = async (): Promise<StudentsResponse[]>=> {
    const response = await fetch("http://localhost:3001/api/students/repeating", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    if (!response.ok) {
      throw new Error("Get students failed");
    }
  
    return response.json();
  };
  
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
  
const patchYear = async (data: GetYearResponse): Promise<UpdateYearResponse>=> {
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
function CloseYear() {
  const navigate = useNavigate()
    const onLoad = async ()=>{
      const [year, dataStudents] = await Promise.all( [getCurrentYear(), getStudentsRepeating()]) 
      return {year, students: dataStudents}
    }
    const { mutate, data, isLoading, isError, error} :UseMutationResult<OnLoadResponse, Error, void>  = useMutation(onLoad, {
        onSuccess: (data) => {
          console.log('Data fetched successfully:', data);
        },
      });
      React.useEffect(() => {
        mutate();
      }, []);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>;
      }
    const onSubmit = ()=>{
      if(data?.year)patchYear(data?.year).then((()=>navigate('/')))
    }
    return <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-6">
            {data?.students && data.students.map((item: StudentsResponse , index : number)=> {
                return <StudentAccordion key={index} level={item.level} students={item.students} />
            })}
        </main>
        <Button variant="default" onClick={onSubmit}
          className="bg-emerald-600 hover:bg-emerald-700">Valider</Button>
      </div>
}
export default CloseYear