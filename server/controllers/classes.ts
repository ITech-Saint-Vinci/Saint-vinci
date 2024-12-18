import { NextFunction } from "express"
import Classes from "../models/Classes"
import { User } from "../models/user";
import type { Request, Response } from "express";

type ClassesResponse<T> = {
    data?: T;
};
type ClassesType = {
    name: string;
    teacherId: string
};
interface RequestBody {
    name: string;
  }
export const getClasses =async  (req : Request, res : Response, next: NextFunction) : Promise<void> =>{
    try {
        const classes = await Classes.find();
        res.status(200).json(classes as ClassesResponse<ClassesType>)
    } catch (error) {
        res.status(500).json({message: "Network Error"})
        
    }
}

export const postClasses =async  (req : Request<{},{}, RequestBody>, res : Response, next: NextFunction) : Promise<void> =>{
    try {
        const user = await User.findOne({username: "teacher7"})
        if (!user){
            res.status(401).json({message: "Don't have teacher"})
        }
        const body : RequestBody = req.body
        await Classes.create({name: body.name ?? '', teacherId: user?._id, order:1});
        res.status(200).json({message: "Class created !"})
    } catch (error) {
        res.status(500).json({message: "Network Error"})
        
    }
}
