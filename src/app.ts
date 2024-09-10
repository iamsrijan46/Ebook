import express from "express"

const app = express();

app.get("/", (req,res) => {
    res.json({message: "Welcome to eBook APIs..."});
});

export default app;