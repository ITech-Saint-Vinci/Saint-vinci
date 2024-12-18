import mongoose from "mongoose";

export function getRandomItem(array: {_id:mongoose.Types.ObjectId}[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomDate(start : Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}