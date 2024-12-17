export type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  isLoading: boolean;
};

export type StudentStatus = 'Admis' | 'Redoublant';

export type StudentLevel = 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2';

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  status: StudentStatus;
  level: StudentLevel;
  birthDate: string;
}