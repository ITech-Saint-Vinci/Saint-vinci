import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
 id: { type: String, required: true, unique: true },
 username: { type: String, required: true },
 password: { type: String, required: true },
 createdAt: { type: Date, default: Date.now()},
 updateddAt: { type: Date, default: Date.now()},
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin; 