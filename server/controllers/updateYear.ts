import Classes from "../models/Classes";
import Students from "../models/Students";
import {NextFunction, Response, Request } from "express";
import AcademicYears from "../models/AcademicYears";
import Notifications from "../models/Notifications";
import { User } from "../models/user";
import { Student } from "../types/students";
async function promoteStudents() {
    try {
      const students : Student[] = await Students.find().populate('classId', 'name order');
      const classes = await Classes.find().sort({ order: 1 });
  
      for (let student of students) {
        if(!student.isRepeating){

        const currentClass = student.classId;
        const nextClass = classes.find(
          (cls) => cls.order === currentClass.order + 1
        );
  
        if (nextClass) {
          await Students.updateOne({_id: student._id}, {classId: nextClass._id})
        } else {
          await Students.deleteOne({_id: student._id})
        }
      }else{
        await Students.updateOne({_id: student._id}, {isRepeating: false})

      }
    }
    } catch (error) {
      throw new Error("Problème lors de la promotion des classes.");
    }
  }

type RequestBody = {year: string}
export const updateYear =  async (req: Request<{},{},RequestBody>,res: Response, next:NextFunction )=>{
    try{
        
        const yearStart : number = parseInt(req.body.year.split("-")[0]) 
        const yearEnd : number = parseInt(req.body.year.split("-")[1]) 
        if(!yearStart || !yearEnd){
            res.status(404).json({message: "Entrée incorrecte"})
        }
        await promoteStudents()
        await AcademicYears.updateOne({year: req.body.year, isCurrent: true}, {$set: {isCurrent: false}})
        await AcademicYears.create({year : `${yearStart+1}-${yearEnd+1}`})
        const teachers = await User.find({role: "teacher"}, {username:0,password:0, createdAt:0, __v:0, role:0})
        const notif : {message: string }[]= []
        teachers.map((teacher)=>{
            const newNotif = new Notifications({message: "L'année a été clôturé !", userId: teacher._id})
            notif.push(newNotif)
        })
        await Notifications.insertMany(notif)
        res.status(200).json({message: "L'année a été cloturé. Les professeurs ont été notifiés."})
    }catch(e){
        res.status(500).json({message: "Erreur Serveur"})

    }
}

export const getCurrentYear =  async (req: Request,res: Response, next:NextFunction )=>{
    try {
        const currentYear = await AcademicYears.findOne({isCurrent: true}, {__v:0, _id:0, isCurrent:0 })
        res.status(200).json(currentYear || {})
    } catch (error) {
        res.status(500).json({message: "Erreur Serveur"})
        
    }
}