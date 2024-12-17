import mongoose from "mongoose"

export const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI || '');
        console.log("Connected to MongoDB with Mongoose"); 
    } catch (error) {
        console.error("Error : Can't connect to DB", error.message)
    }
}