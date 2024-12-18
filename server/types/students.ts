import mongoose from "mongoose";

interface Class {
  _id?: mongoose.Types.ObjectId;
  name: string,
  order: number;
}

export interface Student {
  _id?: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  isRepeating: boolean;
  classId: Class;
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
