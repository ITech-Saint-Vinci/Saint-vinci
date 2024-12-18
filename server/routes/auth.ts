import express from "express";
import { authValidation } from "../middleware/authValidation";
import { signIn, userUpdate, validateToken } from "../controllers/user";
import { requireAuth } from "../middleware/requireAuth";

export const authRouter = express.Router();

authRouter.post("/sign-in", authValidation, signIn);

authRouter.post("/edit", requireAuth, userUpdate);

authRouter.post("/validate-token", validateToken);