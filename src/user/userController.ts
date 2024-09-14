import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

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

    res.json({message: "User registered"});
};


export { createUser };