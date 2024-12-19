import mongoose from "mongoose";

const Notifications = mongoose.model("Notifications", new mongoose.Schema({
 subject: { type: String, required: true },
 message: { type: String, required: true },
 userId: { type: mongoose.Types.ObjectId,  ref: 'User', required: true},
 isReading: {type: Boolean, default: false},
 author: {type: String , required: true},
 createdAt: { type: Date, default: Date.now()},
}));



export default Notifications; 