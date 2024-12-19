export type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  isLoading: boolean;
};

export type StudentStatus = "Admis" | "Redoublant";

export type Student = {
  _id: string;
  firstName: string;
  lastName: string;
  isRepeating: boolean;
  birthdate: string;
  class: { name: string };
};

export type Classes = {
  _id: string;
  name: string;
  students: Student[];
};

export type ResponsePatch = { message: string };
export type StudentsGetResponse = {
  _id: string;
  students: Student[];
};
export type GetYearResponse = { year: string };
export type MutationOnLoad = {
  students: StudentsGetResponse[];
  year: GetYearResponse;
};
export type UpdateStatusData = { studentId: string; isReapeating: boolean };

export type ClassType = { _id: string; name: string };
export type NotificationsType = {_id :string, subject: string, message: string, isReading: boolean, author: string}
export type NotificationsProps = {notification: NotificationsType, onClickButton: (id: string)=>void}
export type NotificationsDeleteProps = {notifId: string}

export type PaginationProps = {page: number, setPage : (value: number)=>void,totalPages: number}

export type VariantToastProps = "default" | "success" | "destructive"
