import { QueryFunction, useQuery } from "@tanstack/react-query";
import { studentApi } from "../services/api";

export function useStudents(queryKey: string, queryFn: QueryFunction) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => studentApi.getStudentById(id),
    enabled: !!id,
  });
}
