import express from "express";
import { authValidation } from "../middleware/authValidation";
import { signIn, signUp, validateToken } from "../controllers/user";

export const authRouter = express.Router();

authRouter.post("/sign-in", authValidation, signIn);
authRouter.post("/sign-up", authValidation, signUp);

authRouter.post("/validate-token", validateToken)