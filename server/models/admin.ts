import { model, Schema } from "mongoose";

export const Admin = model(
  "Admin",
  new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);