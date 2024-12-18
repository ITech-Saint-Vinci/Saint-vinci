import mongoose from "mongoose";

const StudentsSchema = new mongoose.Schema({
 firstname: { type: String, required: true },
 lastname: { type: String, required: true },
 birthdate: { type: Date, required: true },
 classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classes', required: true },
 isRepeating: { type: Boolean, default: false},
 createdAt: { type: Date, default: Date.now()},
});

const Students = mongoose.model("Students", StudentsSchema);

export default Students; 