import express from "express";
import multer from "multer";
import path from "node:path";
import { createBook, updateBook, listBook, getSingleBook, deleteBook } from "./bookController";
import authenticate from "../middlewares/authenticate";
const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: {fileSize: 3e7}
})

bookRouter.post("/",authenticate , upload.fields([
    {name: "coverImage", maxCount: 1},
    {name: "file", maxCount: 1}
]), createBook);

bookRouter.patch("/:bookId",authenticate , upload.fields([
    {name: "coverImage", maxCount: 1},
    {name: "file", maxCount: 1}
]), updateBook);

bookRouter.get("/", listBook);
bookRouter.get("/:bookId", getSingleBook);
bookRouter.get("/:bookId", authenticate, deleteBook);

export default bookRouter;