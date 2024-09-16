import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userType";

// Create an user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body; // Destructuring

  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required"); // Create an error
    return next(error);
  }

  // Database call

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const error = createHttpError(400, "User already exist");
      return next(error);
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while getting user"));
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user

  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {

    console.log(err);
    return next(createHttpError(500, " Error while creating user."));
  }

  // Create token using JWT

  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // Response

    res.status(201).json({ accessToken: token });
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while signin JWT token"));
  }
};



export { createUser, loginUser };
