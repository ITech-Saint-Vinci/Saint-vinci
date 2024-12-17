import express from "express";
import { authValidation } from "../middleware/authValidation";
import { signIn, validateToken } from "../controllers/auth";

export const authRouter = express.Router();

authRouter.post("/sign-in", authValidation, signIn);

authRouter.post("/validate-token", validateToken)