import { z } from "zod";

export const urlvalidator = z.string().url();

export const stringValidator = z.string();

export const numberValidator = z.number();

export const emailValidator = z.string().email();

export const passwordValidator = z.string().min(6);

export const booleanValidator = z.boolean();

export const dateValidator = z.coerce.date();

export const arrayValidator = (type: z.ZodType) => z.array(type);
