import { toast } from "@/hooks/useToast";
import { VariantToastProps } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHeaders = (): HeadersInit => ({
  Authorization: `Bearer ${getStored("auth_token")}`,
  "Content-Type": "application/json",
});

export const getStored = (field: string) => localStorage.getItem(field);
export const setStored = (field: string, data: string) =>
  localStorage.setItem(field, data);
export const removeStored = (field: string) => localStorage.removeItem(field);
export const showToast = (variant : VariantToastProps, message: ReactElement| string, description: string, action: any)=>{
  toast({
    variant: variant,
    title: message as string,
    description: description,
    action: action,
  })
}
