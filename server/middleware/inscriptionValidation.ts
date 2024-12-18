import { z } from "zod";
import { dateValidator, stringValidator } from "../lib/validators";
import { NextFunction, Request, Response } from "express";


export const studentValidation = z.object({
    firstName:stringValidator, 
    lastName:stringValidator, 
    birthDate:dateValidator, 
    classes:stringValidator
});

export const inscriptionValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await studentValidation.parseAsync(req.body);
    next();
  } catch (error) {
    const { errors } = error as z.ZodError;
    const errorMessages = errors.map((issue) => issue.message);
    res.status(400).json({ error: errorMessages });
  }
};
