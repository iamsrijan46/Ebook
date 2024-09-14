import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";

// Create an user
const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const {name, email, password} = req.body;   // Destructuring

    // Validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All fields are required"); // Create an error
        return next(error);
    }

    // Database call
    const user = await userModel.findOne({email});

    if(user){
        const error = createHttpError(400, "User already exist");
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({message: "User registered"});
};


export { createUser };