import express from "express";
import { requireAnyRole, requireAuth, requireAuthTeacher } from "../middleware/requireAuth";
import { getClasses, getStudent, getStudents, updateStudent } from "../controllers/teachers";
import { UserRole } from "../contansts";

export const teacherRouter = express.Router();

teacherRouter.get("/", requireAuth, requireAnyRole([UserRole.Director, UserRole.Admin, UserRole.Teacher]), getStudents);

teacherRouter.get("/:id", requireAuth, requireAnyRole([UserRole.Director, UserRole.Admin, UserRole.Teacher]), getStudent)

teacherRouter.get("/classes", requireAuth, requireAuthTeacher, getClasses)

teacherRouter.patch("/", requireAuth, requireAnyRole([UserRole.Director, UserRole.Teacher]), updateStudent)