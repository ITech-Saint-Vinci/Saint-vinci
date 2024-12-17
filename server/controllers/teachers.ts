import { Request, Response } from "express";
import { Students } from "../models/student";
import { Class } from "../models/class";


export const getStudents = async (req: Request, res: Response): Promise<void> =>{
     try {
        const students = await Students.find({})
        res.json({data: students})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

export const getClasses = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {_id: teacherId} = req.user
        const classData = await Class.find({teacher: teacherId})
        res.json({data: classData})
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export const updateStudent = async (req: Request, res: Response): Promise<void> =>{
    const {_id: teacherId} = req.user
    const { studentId, isReapeating } = req.body;

    try{
        const classData = await Class.findOne({ teacher: teacherId,  students: { $in: [studentId] } });
        if (!classData) {
            res.status(404).json({ message: "Teacher not found in this class" });
            return
        }

       if (isReapeating) {
            await Students.updateOne(
                { _id: studentId },
                { isReapeating: true }
            );
            res.status(200).json({ message: "Updated succsessfully" });
            return
        }

        res.status(200).json({ message: "No updates applied to the student" });
    }catch (error){
        res.status(401).json({error})
    }
}
