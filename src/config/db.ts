import mongoose from "mongoose"
import {config} from "./config";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully...");  
        });

        mongoose.connection.on("error", (err) => {
            console.log("Error in database connection...", err); 
        });
        
        await mongoose.connect(config.dataBaseUrl as string);

    }catch(err) {
        console.error("DataBase is not connected", err);
        process.exit(1);
    }
}

export default connectDB;