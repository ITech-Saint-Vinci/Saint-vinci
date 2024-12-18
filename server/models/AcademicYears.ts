import mongoose from "mongoose";

const AcademicYearsSchema = new mongoose.Schema({
 year: { type: String, required: true },
 isCurrent: { type: Boolean, default: true},
});

const AcademicYears = mongoose.model("AcademicYears", AcademicYearsSchema);

export default AcademicYears; 