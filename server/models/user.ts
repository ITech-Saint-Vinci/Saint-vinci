import { model, Schema } from "mongoose";

export const User = model(
  "User",
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
    role: {
      type: String,
      enum: ['teacher', 'admin', 'director']
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);