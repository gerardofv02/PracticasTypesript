import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";

export type User = {
    name: string;
    email: string;
    password: string; // cifrada
    createdAt: Date;
    cart: string[];
  };
  
  export type Books = {
    title: string;
    author: Author;
    pages: number;
    ISBN: string; // usando una libreria que cree IDs únicos
  };
  
  export type Author = {
    name: string;
    books: Books[];
  };
  
  // todas las librerias usarán como ID el que genera Mongo.