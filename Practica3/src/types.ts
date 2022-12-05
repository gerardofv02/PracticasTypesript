import { ObjectId } from "mongo";

export type User = {
  name: string;
  email: string;
  password: string; // cifrada
  createdAt: Date;
  cart: string[] // Array de IDs de libros
};

export type Book = {
  title: string;
  author: string;
  pages: number;
  ISBN: string; // usando una libreria que cree IDs únicos
};

export type Author = {
  name: string;
  books: ObjectId[];
}