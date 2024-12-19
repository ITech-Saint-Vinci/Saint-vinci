import {NextFunction, Response, Request } from "express";
import AcademicYears from "../models/academicYears";
import Notifications from "../models/notifications";
import { User } from "../models/user";
import {  Student } from "../interface/students";
import { Students } from "../models/student";
import { Class } from "../models/class";

async function promoteStudents() {
  const students : Student[] = await Students.find().populate('class', 'name order') as unknown as Student[];
  const classes = await Class.find().sort({ order: 1 });
  const newClasses : Record<string, Student[]> = classes.reduce((acc : Record<string, Student[]> , next) : Record<string, Student[]> =>{
    acc[next._id.toString()] = []
    return acc
  }, {})
  const updateOperations = [];
  const deleteOperations = [];
  for (let student of students) {
    const currentClass = student.class;
    const currentClassId = currentClass ? currentClass._id?.toString() : null;
    
    if (!student.isReapeating) {
        const nextClass =  classes.find(
          (cls) => cls.order=== currentClass.order+ 1 
        );
      if (nextClass &&nextClass._id) {
        const nextClassId = nextClass._id.toString();
        if (newClasses[nextClassId]) {
          newClasses[nextClassId].push(student);
        }

        updateOperations.push(Students.updateOne(
          { _id: student._id },
          { class: nextClass._id }
        ));

      } else {
        deleteOperations.push(Students.deleteOne({ _id: student._id }));
      }

   } else {
     updateOperations.push(Students.updateOne(
       { _id: student._id },
       { isReapeating: false }
     ));

     if (currentClassId) {
       if (newClasses[currentClassId]) {
         newClasses[currentClassId].push(student);
       }
     }
    }
  }
  for (const classe of classes) {
    updateOperations.push(Class.updateOne({_id: classe._id}, {$set: {students: newClasses[classe._id.toString()]}}))
  }

  await Promise.all([...updateOperations, ...deleteOperations]);
  return newClasses;
}

type RequestBody = {year: string}
export const updateYear =  async (req: Request<{},{},RequestBody>,res: Response )=>{
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
        const nameDirector = req.user.username.split("_").join(" ")
        teachers.map((teacher)=>{
            const newNotif = new Notifications({subject:"Clôture de l'année", message: `Bonjour à tous les professeurs, l'année ${req.body.year} a été clôturé !`, userId: teacher._id, author:`${nameDirector}`})
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