export type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  isLoading: boolean;
};

export type StudentStatus = 'Admis' | 'Redoublant';

export type StudentLevel = '1ère section maternelle' | '2ème section maternelle' | '3ème section maternelle' | 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2';

export type Student = {
  _id: string;
  firstName: string;
  lastName: string;
  isReapeating: boolean;
  birthDate: string;
}

export type ResponsePatch = {message: string}
export type StudentsGetResponse = {_id: string, name: StudentLevel, students: Student[]}
export type GetYearResponse = {year: string}
export type MutationOnLoad = {students: StudentsGetResponse[], year: GetYearResponse}
export type UpdateStatusData = {studentId: string, isReapeating:boolean}