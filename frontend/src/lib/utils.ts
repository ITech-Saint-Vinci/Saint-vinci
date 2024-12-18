import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStored = (field: string) => localStorage.getItem(field);
export const setStored = (field:string, data: string) =>
  localStorage.setItem(field, data);
export const removeStored = (field: string) => localStorage.removeItem(field);

