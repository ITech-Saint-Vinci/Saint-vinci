import express from "express";
import { requireAnyRole, requireAuth, requireAuthTeacher } from "../middleware/requireAuth";
import { getClasses, getStudents, updateStudent } from "../controllers/teachers";
import { UserRole } from "../contansts";

export const teacherRouter = express.Router();

teacherRouter.get("/", requireAuth, requireAnyRole([UserRole.Director, UserRole.Admin, UserRole.Teacher]), getStudents);

teacherRouter.get("/classes", requireAuth, requireAuthTeacher, getClasses)

teacherRouter.put("/", requireAuth, requireAnyRole([UserRole.Director, UserRole.Teacher]), updateStudent)