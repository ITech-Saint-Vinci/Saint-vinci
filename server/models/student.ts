import { model, now, Schema } from "mongoose";

export const Students = model(
  "Student",
  new Schema({
    firstName: {
      type: String,
      require: true,
      unique: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    birthdate: {
      type: Date,
    },
    isReapeating: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: now(),
    },
    class: { type: Schema.Types.ObjectId, ref: "Class" },
  })
);
