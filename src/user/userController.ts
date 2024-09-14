import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

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

    // Create new user

    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
    });

    // Create token using JWT

    const token = sign({sub: newUser._id}, config.jwtSecret as string, {expiresIn: "7d"});

    res.json({accessToken: token});
};


export { createUser };