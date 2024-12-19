import { NextFunction } from "express"
import type { Request, Response } from "express";
import { Class } from "../models/class";
import { Students } from "../models/student";

export const getStudentsRepeating = async (req: Request, res : Response) :Promise<void> =>{
    try {
      const studentsByClass = await Class.find({}, {__v:0, order:0}).populate({
        path: 'students',
        match: { isReapeating: true },
        select :"-__v -createdAt -class"
      })
        res.status(200).json(studentsByClass)
    } catch (error) {
        res.status(500).json({message: "Network Error"})
    }   
}


export const updateStudentByDirector = async (req: Request, res: Response): Promise<void> =>{
    const { studentId, isReapeating } = req.body;
    try{
      const ok = await Students.findOneAndUpdate(
                { _id: studentId },
                { isReapeating: isReapeating }
            );
            if(!ok){
                throw new Error()
            }
        res.status(200).json({ message: "Updated succsessfully" });
    }catch (error){
        res.status(400).json({ message: "No updates applied to the student" });
    }
}