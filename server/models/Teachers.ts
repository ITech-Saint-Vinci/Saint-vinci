import mongoose from "mongoose";

const TeachersSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true },
 firstname: { type: String, required: true },
 lastname: { type: String, required: true },
 email: { type: String, required: true },
});

const Teachers = mongoose.model("Teachers", TeachersSchema);

export default Teachers; 