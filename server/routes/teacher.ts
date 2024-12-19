import express from "express";
import {
  requireAnyRole,
  requireAuth,
  requireAuthTeacher,
} from "../middleware/requireAuth";
import {
  getAllClasses,
  getClassesTeacher,
  getStudent,
  getStudents,
  updateStudent,
} from "../controllers/teachers";
import { UserRole } from "../contansts";

export const teacherRouter = express.Router();

teacherRouter.get("/", getStudents);

teacherRouter.get("/classes", getAllClasses);

teacherRouter.get(
  "/:id",
  requireAuth,
  requireAnyRole([UserRole.Director, UserRole.Admin, UserRole.Teacher]),
  getStudent
);

teacherRouter.get(
  "/yourclasses",
  requireAuth,
  requireAuthTeacher,
  getClassesTeacher
);

teacherRouter.patch(
  "/",
  requireAuth,
  requireAnyRole([UserRole.Director, UserRole.Teacher]),
  updateStudent
);
