import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {

    try {
     const conn = await mongoose.connect(ENV_VARS.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`); //error.message is a property of error object
        process.exit(1); //1 means exit with failure, 0 means exit with success
        

        
    }
};