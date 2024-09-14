import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouters";

const app = express();

app.use(globalErrorHandler);
app.use("/api/users", userRouter);


export default app;