import { z } from "zod";
import { booleanValidator, stringValidator } from "../lib/validators";
import { NextFunction, Request, Response } from "express";


export const studentValidation = z.object({
  studentId: stringValidator,
  isReapeating: booleanValidator,
});

export const updateStatusValidation = async (
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


export const yearValidation = z.object({
    year: stringValidator,
  });
  
  export const updateYearValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await yearValidation.parseAsync(req.body);
      next();
    } catch (error) {
      const { errors } = error as z.ZodError;
      const errorMessages = errors.map((issue) => issue.message);
      res.status(400).json({ error: errorMessages });
    }
  };