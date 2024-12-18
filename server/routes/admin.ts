import express from "express";
import { getClasses, postStudent } from "../controllers/admin";
import { inscriptionValidation } from "../middleware/inscriptionValidation";

export const adminRouter = express.Router();

adminRouter.get("/classes", getClasses)
adminRouter.post("/", inscriptionValidation, postStudent)