import express from "express";
import { getClasses, postClasses } from "../controllers/classes";

export const classesRouter = express.Router();

classesRouter.get("/", getClasses);
classesRouter.post("/", postClasses);
