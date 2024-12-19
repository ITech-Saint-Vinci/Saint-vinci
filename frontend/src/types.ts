export type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  isLoading: boolean;
};

export type StudentStatus = 'Admis' | 'Redoublant';

export type StudentLevel = '1ere Section' | '2e Section' | '3e Section' | 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2';

export type Student = {
  _id: string;
  firstName: string;
  lastName: string;
  status: StudentStatus;
  level: StudentLevel;
  birthdate: string;
  class: {name: string}
}