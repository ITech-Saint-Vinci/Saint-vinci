import mongoose from "mongoose";

export interface ClassType {
  _id?: mongoose.Types.ObjectId;
  name: string,
  order: number;
  students: Student[]
}

export interface Student {
  _id?: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  isReapeating: boolean;
  class: ClassType;
  birthdate: string;
}

interface StudentResponse {
  firstname: string;
  lastname: string;
  status: string;
  birthdate: string;
  level: string;
}
export type StudentReduce = 
  Record<string, {order: number, students:StudentResponse[], level: string}>
