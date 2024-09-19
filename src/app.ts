import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouters";
import bookRouter from "./book/bookRouter";
const app = express();
app.use(express.json());

app.use(globalErrorHandler);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);


export default app;