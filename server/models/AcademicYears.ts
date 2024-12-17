import mongoose from "mongoose";

const AcademicYearsSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true },
 year: { type: Number, required: true },
 isCurrent: { type: Boolean, default: true},
});

const AcademicYears = mongoose.model("AcademicYears", AcademicYearsSchema);

export default AcademicYears; 