import { useEffect, useState } from "react";
import { InscriptionFormValues } from "@/components/forms/inscriptionForm";
import { useAuth } from "./useAuth";
import { ClassType } from "@/types";

const useInscription = () => {
  const [classes, updateClasses] = useState<ClassType[]>([]);
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");
  const { token } = useAuth();

  const getClass = async () => {
    const response = await fetch("http://localhost:3001/api/teacher/classes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Couldn't get class");
    }

    return await response.json();
  };

  const fetchClass = async () => {
    const listClass = await getClass();
    console.log(listClass);
    updateClasses(listClass.data);
  };

  useEffect(() => {
    fetchClass();
  }, []);

  const inscriptionStudent = async (values: InscriptionFormValues) => {
    const classId = values.classes;
    const response = await fetch(`http://localhost:3001/api/admin/${classId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        birthdate: values.birthDate,
        class: classId,
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
      window.location.reload();
      setValid(result.message);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  };

  return { classes, onSubmit, error, valid };
};

export default useInscription;
