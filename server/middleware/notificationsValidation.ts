import { z } from "zod";
import { stringValidator } from "../lib/validators";
import { NextFunction, Request, Response } from "express";


export const deleteNotifValidation = z.object({
  notifId: stringValidator,
});

export const deleteOneNotifValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteNotifValidation.parseAsync(req.params);
    next();
  } catch (error) {
    const { errors } = error as z.ZodError;
    const errorMessages = errors.map((issue) => issue.message);
    res.status(400).json({ error: errorMessages });
  }
};


export const getNotifValidation = z.object({
    page: stringValidator,
    rowPerPage: stringValidator,
  });
  
  export const getNotificationValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await getNotifValidation.parseAsync(req.query);
      next();
    } catch (error) {
      const { errors } = error as z.ZodError;
      const errorMessages = errors.map((issue) => issue.message);
      res.status(400).json({ error: errorMessages });
    }
  };