import mongoose from 'mongoose';
import path from 'path';
import fs from "fs"
import { Students } from '../models/student'; 
import { apiConfig } from '../config';
import { User } from '../models/user';
import { Class } from '../models/class';
import { parseCSV } from '../lib/utils';
import { createClasses, createTeachers } from '../lib/students';

(async ()=> {
  try {
    await mongoose.connect(apiConfig.db.mongoUrl);
    console.log('Connected to MongoDB');

    await Students.deleteMany({});
    await Class.deleteMany({});
    await User.deleteMany({ role: 'teacher' });

    const csvBuffer = fs.readFileSync(path.resolve(__dirname, 'students.csv'));
    const records = parseCSV(csvBuffer);

    const teachersMap = await createTeachers(records);
    await createClasses(records, teachersMap);


    await mongoose.connection.close();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();
