import { useState } from "react";
import { InscriptionFormValues } from "@/components/forms/inscriptionForm";
import { useAuth } from "./useAuth";
import { useStudents } from "./useStudents";
import { studentApi } from "@/services/api";

const useInscription = () => {
  const { data: classes } = useStudents("students", studentApi.getAllClasses);
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");
  const { token } = useAuth();

  const inscriptionStudent = async (values: InscriptionFormValues) => {
    const response = await fetch("http://localhost:3001/api/admin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        birthdate: values.birthDate,
        class: values.classes,
      }),
    });
    if (!response.ok) {
      throw new Error("Impossible de soumettre l'élève.");
    }

    return await response.json();
  };

  const onSubmit = async (values: InscriptionFormValues) => {
    try {
      const result = await inscriptionStudent(values);
      setValid(result.message);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  };

  return { classes, onSubmit, error, valid };
};

export default useInscription;
