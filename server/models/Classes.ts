import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true },
 teacherId: { type: String, required: true },
 name: { type: String, required: true },
 academicYearId: { type: String, required: true },
 createdAt: { type: Date, default: Date.now()},
});

const Classes = mongoose.model("Classes", ClassesSchema);

export default Classes; 