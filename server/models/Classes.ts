import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema({
 teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 name: { type: String, required: true },
 order: { type: Number, required: true },
 createdAt: { type: Date, default: Date.now()},
});

const Classes = mongoose.model("Classes", ClassesSchema);

export default Classes; 