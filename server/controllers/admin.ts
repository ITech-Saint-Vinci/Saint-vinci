import { Request, Response } from "express";
import { Class } from "../models/class";
import { Students } from "../models/student";

export const getClasses = async (req: Request, res: Response): Promise<void> =>{
    try{
        const classData = await Class.find({})
        
        res.status(200).json({data: classData})
    }catch(error){
        res.status(500).json({error: "Internal server error"})
        
    }
}

export const postStudent = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {firstName, lastName, birthDate, classes} = req.body
        const student = await Students.findOne({firstName, lastName, birthdate:birthDate, class:classes})
        if (student) {
            res.status(400).json({message: "L'étudiant existe déjà"})
            return 
        } 

        await Students.create({firstName, lastName, birthdate:birthDate, class:classes})
        
        res.status(200).json({message:"L'étudiante a été bien créer"})
    }catch(error){
        res.status(500).json({error: "Internal server error"})
        
    }
}
