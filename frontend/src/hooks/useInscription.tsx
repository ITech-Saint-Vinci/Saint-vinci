import { useEffect, useState } from "react";
import { InscriptionFormValues } from "@/components/forms/inscriptionForm";

const useInscription = () => {
    const [classes, updateClasses] = useState([])
    const [error, setError] = useState("")

    const getClass = async () => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/admin/classes",
            {
                method: "GET",
                headers: {
                    // Authorization: `Bearer ${token}`,
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
            console.log("error")
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
                        // Authorization: `Bearer ${token}`,
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
            console.log(result)
        } catch (error) {
            console.log("error")
            setError(error.message)
        }
    }

    return {classes, onSubmit, error}; 

};

export default useInscription;
