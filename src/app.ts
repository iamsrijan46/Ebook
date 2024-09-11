import express, { NextFunction, Request, Response } from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler"

const app = express();

app.use(globalErrorHandler);

// app.get("/", (req, res) => {

//     const error = createHttpError(400, "Something went wrong...");
//     throw error;
//     res.json({message: "Welcome to eBook APIs..."});
// });



export default app;