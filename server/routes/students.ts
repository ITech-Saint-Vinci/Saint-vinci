import express from "express"
import { getStudentsRepeating, updateStudentByDirector } from "../controllers/students";
import { requireAuth, requireAuthDirector } from "../middleware/requireAuth";
import { updateStatusValidation } from "../middleware/directorValidation";

export const studentsRouter = express.Router();

studentsRouter.get("/repeating", requireAuth, requireAuthDirector, getStudentsRepeating)
studentsRouter.put("/",requireAuth, requireAuthDirector, updateStatusValidation, updateStudentByDirector)
