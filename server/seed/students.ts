import mongoose from 'mongoose';
import path from 'path';
import fs from "fs"
import { Students } from '../models/student'; 
import { apiConfig } from '../config';
import { User } from '../models/user';
import { Class } from '../models/class';
import { parseCSV } from '../lib/utils';
import { createClasses, createTeachers, createYears } from '../lib/students';
import AcademicYears from '../models/academicYears';

(async ()=> {
  try {
    await mongoose.connect(apiConfig.db.mongoUrl);
    console.log('Connected to MongoDB');

    await Students.deleteMany({});
    await Class.deleteMany({});
    await User.deleteMany({ role: 'teacher' });
    await AcademicYears.deleteMany({});

    const csvBuffer = fs.readFileSync(path.resolve(__dirname, 'students.csv'));
    const records = parseCSV(csvBuffer);

    const teachersMap = await createTeachers(records);
    await createClasses(records, teachersMap);

    await createYears()
    console.log('Academic year created');
    
    await mongoose.connection.close();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();
