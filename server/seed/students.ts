import mongoose from 'mongoose';
import path from 'path';
import { Students } from '../models/student'; 
import { apiConfig } from '../config';
import { User } from '../models/user';
import { Class } from '../models/class';
import { CsvRecord, parseCSV, serializeData } from '../lib/utils';
import { MAX_CLASSES } from '../contansts';

type Students = {
  firstName: string;
  lastName: string;
  birthdate: Date;
}

const splitStudents = (records: CsvRecord[], teachersMap: { [key: string]: mongoose.Types.ObjectId }) => {
    const studentsByLevel = records.reduce((acc: { [key: string]: CsvRecord[] }, record) => {
    const level = record['Niveau'];
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(record);
    return acc;
  }, {});

  let classes = [];

  for (const [level, students] of Object.entries(studentsByLevel)) {
    students.sort((a, b) => {
      const dateA = new Date(a['Date de Naissance']).getTime();
      const dateB = new Date(b['Date de Naissance']).getTime();
      return dateA - dateB;
    });

    for (let i = 0; i < students.length; i += 25) {
      const group = students.slice(i, i + 25);

      const className = `Classe ${level}-${Math.floor(i / 25) + 1}`;

      const teacherName = group.find(
        (record) => record['Niveau'] === level
      )?.['Nom Professeur'];

      if (!teacherName || !teachersMap[teacherName]) {
        console.warn(`No teacher found for level: ${level}, group starting at index: ${i}`);
        continue;
      }

      const teacher = teachersMap[teacherName];

      const studentsData = group.map((student) => ({
        firstName: serializeData(student['Prénom Élève']),
        lastName: serializeData(student['Nom Élève']),
        birthdate: new Date(student['Date de Naissance']),
      }));

      classes.push({
        className,
        teacher,
        studentsData,
      });
    }
  }

  if (classes.length > MAX_CLASSES) {
    console.warn(
      `Exceeded the maximum number of allowed classes (${MAX_CLASSES}).`
    );
    classes = classes.slice(0, MAX_CLASSES);
  }

  return classes;
};


const createTeachers = async (records: CsvRecord[]): Promise<{ [key: string]: mongoose.Types.ObjectId }> => {
  const uniqueTeachers = [...new Set(records.map(record => record['Nom Professeur']))];
  const teachersMap: { [key: string]: mongoose.Types.ObjectId } = {};

  for (const teacherName of uniqueTeachers) {
    try {
      const teacherData = {
        username: serializeData(teacherName),
        password: '$2a$12$E9jdlUb.PcRXReTmca8Pjugms2IdfoSrm5BJdsEV/IAGPQymIDRAW',
        role: 'teacher',
      };
      const teacher = await User.create(teacherData);
      teachersMap[teacherName] = teacher._id;
      console.log(`Teacher created: ${teacherName}`);
    } catch (error) {
      console.error(`Error creating teacher ${teacherName}:`, error);
      throw error;
    }
  }

  return teachersMap;
}

const createClasses = async (records: CsvRecord[], teachersMap: { [key: string]: mongoose.Types.ObjectId }): Promise<{ [key: string]: mongoose.Types.ObjectId }> => {
  const classData = splitStudents(records, teachersMap);

  const classesMap: { [key: string]: mongoose.Types.ObjectId } = {};

  for (const { className, teacher, studentsData } of classData) {
    const classDoc = await Class.create({
      name: serializeData(className),
      teacher,
      students: [],
    });

    const studentDocs = await Students.insertMany(
      studentsData.map(student => ({
        ...student,
        class: classDoc._id,
      }))
    );
    console.log('Students created');

    await Class.findByIdAndUpdate(classDoc._id, {
      $push: { students: { $each: studentDocs.map(student => student._id) } },
    });

    classesMap[className] = classDoc._id;
  }

  return classesMap;
}


(async ()=> {
  try {
    await mongoose.connect(apiConfig.db.mongoUrl);
    console.log('Connected to MongoDB');

    await Students.deleteMany({});
    await Class.deleteMany({});
    await User.deleteMany({ role: 'teacher' });

    const csvPath = path.resolve(__dirname, 'students.csv');
    const records = parseCSV(csvPath);

    const teachersMap = await createTeachers(records);
    await createClasses(records, teachersMap);


    await mongoose.connection.close();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();
