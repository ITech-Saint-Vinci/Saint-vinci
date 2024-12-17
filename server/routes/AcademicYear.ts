import {NextFunction, Response, Request , Router} from "express";
import AcademicYears from "../models/AcademicYears";

const router = Router()

router.get("/", (req: Request,res: Response, next:NextFunction )=>{
    try{
        res.status(200).send("Ok")
    }catch{
        res.status(500).json({message: "Network Error"})

    }
})

router.patch("/academicYear/:year", async (req: Request,res: Response, next:NextFunction )=>{
    try{
        const year = req.params 
        await AcademicYears.updateOne({year, isCurrent: true}, {$set: {isCurrent: true}})
        res.status(200).json({message: "L'année a été cloturé."})
    }catch{
        res.status(500).json({message: "Network Error"})

    }
})
router.get("/academicYear/notify", async (req: Request,res: Response, next:NextFunction )=>{
    try{
        const year = req.params 
        await AcademicYears.updateOne({year, isCurrent: true}, {$set: {isCurrent: false}})
        res.status(200).json({message: "L'année a été cloturé."})
    }catch{
        res.status(500).json({message: "Network Error"})

    }
})
export default router