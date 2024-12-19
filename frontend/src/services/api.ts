import { getStored } from '@/lib/utils';
import { Student } from '@/types';

const token = getStored("auth_token");
const API_URL = 'http://localhost:3001/api';

export const studentApi = {
    getAllStudents: async (): Promise<{data: Student[]}> => {
        const response = await fetch(`${API_URL}/teacher`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des élèves');
        }
        return await response.json();
    },

    async getStudentById(id: string): Promise<Student> {
        const response = await fetch(`${API_URL}/teachers/${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'élève');
        }
        return response.json();
    },

    async createStudent(student: Omit<Student, 'id'>): Promise<Student> {
        const response = await fetch(`${API_URL}/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'élève');
        }
        return response.json();
    }
};