import { getHeaders } from "@/lib/utils";
import { Classes, Student } from "@/types";

const API_URL = "http://localhost:3001/api";

export const studentApi = {
  getAllStudents: async (): Promise<{ data: Student[] }> => {
    const response = await fetch(`${API_URL}/teacher`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des élèves");
    }
    return await response.json();
  },

  getAllClasses: async (): Promise<{ data: Student[] }> => {
    const response = await fetch(`${API_URL}/teacher/yourclasses`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des élèves");
    }
    return await response.json();
  },

  getStudentById: async (id: string): Promise<Student> => {
    const response = await fetch(`${API_URL}/teachers/${id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'élève");
    }
    return await response.json();
  },

  getStudentsByClass: async (): Promise<{ data: Classes[] }> => {
    const response = await fetch(`${API_URL}/teacher/classes`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'élève");
    }

    return await response.json();
  },
};
