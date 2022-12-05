
import { User, Book, Author } from "../types.ts";
import { ObjectId } from "mongo";

export type UserSchema = Omit<User, "user"> & {
  _id: ObjectId;
  name: string,
  email: string,
  password: string, // cifrada
  createdAt: Date,
  Cart: string[] // Array de IDs de libros
};

export type BookSchema = Omit<Book, "book"> & {
  _id: ObjectId;
  title: string,
  author: Author,
  pages: number,
  ISBN: string
};

export type AuthorSchema = Omit<Author, "author"> & {
  _id: ObjectId;
  name: string,
  books: ObjectId[];
};