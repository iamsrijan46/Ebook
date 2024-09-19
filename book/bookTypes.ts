import { User } from "../src/user/userType";

export interface Book {
    _id: string;
    title: string;
    author: User;
    genre: string;
    coverImage: string;
    file: string;
    createAt: Date;
    UpdateAt: Date;
}