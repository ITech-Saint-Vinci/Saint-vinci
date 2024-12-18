import express from "express"
import { getStudentsRepeating, mockStudents } from "../controllers/students";

export const studentsRouter = express.Router();

studentsRouter.get("/repeating", getStudentsRepeating)
studentsRouter.post("/mockData", mockStudents)