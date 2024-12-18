import { model, Schema } from "mongoose";

export const Class =  model("Class", new Schema({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  teacher: { type: Schema.Types.ObjectId, ref: 'User' },
  order: { type: Number, required: true },
}));