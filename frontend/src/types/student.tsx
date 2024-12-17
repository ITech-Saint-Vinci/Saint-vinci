export type StudentStatus = 'Admis' | 'Redoublant';

export type StudentLevel = 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  status: StudentStatus;
  level: StudentLevel;
  birthDate: string;
}