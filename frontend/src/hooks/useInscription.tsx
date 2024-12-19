import { useEffect, useState } from "react";
import { InscriptionFormValues } from "@/components/forms/inscriptionForm";
import { useAuth } from "./useAuth";

type ClassType = {_id:string, name:string}

const useInscription = () => {
    const [classes, updateClasses] = useState<ClassType[]>([])
    const [error, setError] = useState("")
    const [valid, setValid] = useState("")
    const {token} = useAuth()
    
    const getClass = async () => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/admin/classes",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error("Couldn't get class");
        }

        return await response.json();

    } catch (error) {
        throw error;
    }}

    const fetchClass = async() => {
        try {
            const listClass = await getClass() 
            updateClasses(listClass.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchClass()
    },[])

    const inscriptionStudent = async (values:InscriptionFormValues) => {
        try {
            const response = await fetch(
                "http://localhost:3001/api/admin",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName:values.firstName,
                        lastName:values.lastName,
                        birthDate:values.birthDate,
                        classes:values.classes,
                    })
                }
            );
            if (!response.ok) {
                throw new Error("Impossible de soumettre l'élève.");
            }
    
            return await response.json();
    
        } catch (error) {
            throw error;
        }
    
    }

    const onSubmit = async (values:InscriptionFormValues) => {
        try {
            const result = await inscriptionStudent(values) 
            setValid(result.message)
        } catch (error: any) {
            setError(error.message)
        }
    }

    return {classes, onSubmit, error, valid}; 

};

export default useInscription;
