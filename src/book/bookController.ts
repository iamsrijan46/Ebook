import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import fs from "node:fs";
import createHttpError from "http-errors";
import bookModel from "./bookModel";


const createBook = async (req:Request,res: Response, next: NextFunction) => {
    // console.log("files", req.files);
    const { title, genre } = req.body;

    const files = req.files as { [filename: string]: Express.Multer.File[] };

    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);

    const uploadResult = await cloudinary.uploader.upload(filePath,{
        filename_override: fileName,
        folder: "book-covers",
        format: coverImageMimeType

    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(__dirname, "../../public/data/uploads", bookFileName);
    const bookUploadResult = await cloudinary.uploader.upload(bookFilePath,{
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf"
    })

    console.log("bookUploadResult", bookUploadResult);
    console.log("uploadResult", uploadResult);
    
    const newBook = await bookModel.create({
        title,
        genre,
        author: "66f12421558e17f42611b292",
        coverImage: uploadResult.secure_url,
        file:bookUploadResult.secure_url,
    });
    try{
        await fs.promises.unlink(filePath);
        await fs.promises.unlink(bookFilePath);
    }catch(err){
        console.log(err);
        return next(createHttpError(500));
    }

    res.status(201).json({id: newBook._id});
};

export {createBook};