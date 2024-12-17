import { z } from "zod";
import { passwordValidator, stringValidator } from "../lib/validators";
import { NextFunction, Request, Response } from "express";


export const userValidation = z.object({
  username: stringValidator,
  password: passwordValidator,
});

export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userValidation.parseAsync(req.body);
    next();
  } catch (error) {
    const { errors } = error as z.ZodError;
    const errorMessages = errors.map((issue) => issue.message);
    res.status(400).json({ error: errorMessages });
  }
};
