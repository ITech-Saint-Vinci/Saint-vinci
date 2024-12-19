import type { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";


export const isValidMongoId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) {
        throw new Error("Document not found");
        }
        next();
    }catch(error){
        res.status(404).json({message: error})
    }
}