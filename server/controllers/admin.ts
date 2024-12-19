import { Request, Response } from "express";
import { z } from "zod";
import { Students } from "../models/student";
import { parseCSV } from "../lib/utils";
import { createClasses, createTeachers } from "../lib/students";
import { Class } from "../models/class";

const studentSchema = z.object({
  firstName: z.string().nonempty("Firstname is required"),
  lastName: z.string().nonempty("Lastname is required"),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid birthdate format. Please use a valid date string.",
  }),
});

export const getAllClasses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const classes = await Class.find({}).populate("students");
    res.json({ data: classes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addAStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: classId } = req.params;

    if (!classId) {
      res.status(400).json({ error: "Class ID is required" });
      return;
    }

    const parsedBody = studentSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({
        error: "Validation error",
        details: parsedBody.error.errors,
      });
      return;
    }

    const { firstName, lastName, birthdate } = parsedBody.data;

    const newStudent = await Students.create({
      firstName,
      lastName,
      birthdate: new Date(birthdate),
      class: classId,
    });

    const classData = await Class.findOneAndUpdate(
      { _id: classId },
      { $push: { students: newStudent._id } },
      { new: true }
    ).populate("students");

    res.json({ data: classData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleCSVUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const fileBuffer = req.file.buffer;
    const records = parseCSV(fileBuffer);

    const teachersMap = await createTeachers(records);
    await createClasses(records, teachersMap);

    res.json({ message: "Teachers and class made sucsessfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClasses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const classData = await Class.find({});

    res.status(200).json({ data: classData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, birthDate, classes } = req.body;
    const student = await Students.findOne({
      firstName,
      lastName,
      birthdate: birthDate,
      class: classes,
    });
    if (student) {
      res.status(400).json({ message: "L'étudiant existe déjà" });
      return;
    }

    await Students.create({
      firstName,
      lastName,
      birthdate: birthDate,
      class: classes,
    });

    res.status(200).json({ message: "L'étudiant a été bien créé !" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
