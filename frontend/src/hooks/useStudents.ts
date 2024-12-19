import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../services/api';



export function useStudents() {
 return useQuery({
    queryKey: ['students'],
    queryFn: studentApi.getAllStudents,
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => studentApi.getStudentById(id),
    enabled: !!id,
  });
}