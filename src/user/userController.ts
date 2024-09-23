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
    console.log(user);

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

// Login user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  let newUser: User | null;

  try {
    // Find user by email
    newUser = await userModel.findOne({ email });

    if (!newUser) {
      return next(createHttpError(404, "User not found"));
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "Error finding user"));
  }

  try {
    // Check if password matches
    const isMatch = await bcrypt.compare(password, newUser!.password);
    if (!isMatch) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    // Generate JWT token after successful login
    const token = sign({ sub: newUser!._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // Send the token back in the response
    return res.status(201).json({ accessToken: token });
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error generating JWT token"));
  }
};

export { createUser, loginUser };
