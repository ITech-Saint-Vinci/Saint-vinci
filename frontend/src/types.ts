export type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  isLoading: boolean;
};

export type StudentStatus = 'Admis' | 'Redoublant';

export type Student = {
  _id: string;
  firstName: string;
  lastName: string;
  status: StudentStatus;
  birthdate: string;
  class: {name: string}
}