import mongoose from "mongoose";

const AcademicYears = mongoose.model("AcademicYears", new mongoose.Schema({
 year: { type: String, required: true },
 isCurrent: { type: Boolean, default: true},
}));

export default AcademicYears; 