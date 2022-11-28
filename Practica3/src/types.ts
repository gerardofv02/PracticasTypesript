export type User = {
    name: string;
    email: string;
    password: string; // cifrada
    createdAt: Date;
    cart: Book.id[];
  };
  
  export type Books = {
    title: string;
    author: string;
    pages: number;
    ISBN: string; // usando una libreria que cree IDs únicos
  };
  
  export type Author = {
    name: string;
    books: Books[];
  }
  
  // todas las librerias usarán como ID el que genera Mongo.