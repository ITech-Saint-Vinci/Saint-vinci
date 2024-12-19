import { Request } from "express";
import multer from "multer"
import path from "path"

export const storage = multer.memoryStorage();
export const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (fileExt === ".csv") {
    cb(null, true);  
  } else {
    cb(Error("Only CSV files are allowed")); 
  }
};