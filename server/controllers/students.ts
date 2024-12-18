import { NextFunction } from "express"
import Students from "../models/Students"
import type { Request, Response } from "express";
import Classes from "../models/Classes";
import {faker} from "@faker-js/faker"
import { Student, StudentReduce } from "../types/students";
import { getRandomItem, getRandomDate } from "../utils/random";

export const getStudentsRepeating = async (req: Request, res : Response, next : NextFunction) :Promise<void> =>{
    try {
        const students : Student[] = await Students.find({isRepeating: true}, {_id:0, __v:0, createdAt:0}).populate('classId', 'name order -_id ')
        
        const studentsByClass = students.reduce((acc : StudentReduce, student: Student): StudentReduce => {
              const classStudent = student.classId.name;
              if (classStudent) {
                if (!acc[classStudent]) {
                  acc[classStudent] = {
                    level: classStudent,
                    order: student.classId.order,
                    students: []
                  };
                }
                acc[classStudent].students.push({
                  firstname: student.firstname,
                  lastname: student.lastname,
                  birthdate: student.birthdate,
                  status: !student.isRepeating ? 'Admis' : 'Redoublant',
                  level: classStudent,
              });
              }
            return acc;
        }, {});
        const sortedStudentsByClass = Object.values(studentsByClass).sort((a, b) => b.order - a.order);
        res.status(200).json(sortedStudentsByClass)
    } catch (error) {
        res.status(500).json({message: "Network Error"})
    }   
}

export const mockStudents = async (req: Request, res : Response, next : NextFunction) :Promise<void> =>{
    try {
        const classes = await Classes.find({},{__v:0, name:0, teacherId:0, order:0, createdAt:0})
        
        const students = [];
        for (let i = 0; i < 20; i++) {
          const randomClass = getRandomItem(classes);
          const newStudent = new Students({
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            birthdate: getRandomDate(new Date(2000, 0, 1), new Date(2010, 11, 31)),
            classId: randomClass._id,
            isRepeating: Math.random() < 0.4
          });

        students.push(newStudent);
        }
        await Students.insertMany(students)
        res.status(200).json({message: "Student Mocked"})
    } catch (error) {
        res.status(500).json({message: "Network Error"})
    }   
}

