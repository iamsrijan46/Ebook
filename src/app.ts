import express from "express"

const app = express();

app.get("/", (req,res,next) => {
    res.json({message: "Welcome to eBook APIs..."});
});

export default app;