import mongoose from "mongoose";
import colors from "colors";


export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database successfully".bgMagenta.white);
    }catch(err){
        console.log("Database connection failed".bgRed.white);
        console.log("Error : ", err);
    }
}