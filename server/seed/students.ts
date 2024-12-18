import mongoose from 'mongoose';
import path from 'path';
import { Students } from '../models/student'; 
import { apiConfig } from '../config';
import { User } from '../models/user';
import { Class } from '../models/class';
import { CsvRecord, parseCSV, serializeData } from '../lib/utils';


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
  const uniqueNiveaux = [...new Set(records.map(record => record['Niveau']))];
  const classesMap: { [key: string]: mongoose.Types.ObjectId } = {};
  let i = 1
  for (const niveau of uniqueNiveaux) {
    const teacherRecord = records.find(record => record['Niveau'] === niveau);
    
    if (!teacherRecord) {
      throw new Error(`No teacher found for niveau: ${niveau}`);
    }

    const teacherId = teachersMap[teacherRecord['Nom Professeur']];
    
    if (!teacherId) {
      throw new Error(`Teacher ID not found for niveau: ${niveau}`);
    }

    const classDoc = await Class.create({ 
      name: niveau, 
      teacher: teacherId, 
      students: [] ,
      order : i
    });
    i+=1
    classesMap[niveau] = classDoc._id;
    console.log(`Class created: ${niveau}`);
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
    const classesMap = await createClasses(records, teachersMap);

    const studentsData = records.map(record => ({
      firstName: serializeData(record['Prénom Élève']),
      lastName: serializeData(record['Nom Élève']),
      birthdate: new Date(record['Date de Naissance']),
      class: classesMap[record['Niveau']] 
    }));

    const students = await Students.insertMany(studentsData);
    console.log('Students created');

    // Add Students to Classes
    for (const student of students) {
      if (student.class) {
        await Class.findByIdAndUpdate(student.class, { $push: { students: student._id } });
      }
    }

    await mongoose.connection.close();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();
