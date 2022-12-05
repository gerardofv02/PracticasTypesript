import { RouterContext } from "router";
import { UserSchema, BookSchema, AuthorSchema } from "../db/schemas.ts";
import { User, Author, Book  } from "../types.ts";
import { usersCollection, booksCollection, authorsCollection } from "../db/mongo.ts";
import { v4 } from "https://deno.land/std@0.161.0/uuid/mod.ts";
import{ObjectId} from "mongo";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

type PostUserContext = RouterContext<
    "/addUser",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type PostBookContext = RouterContext<
    "/addBook",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type PostAuthorContext = RouterContext<
    "/addAuthor",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

export const addUser = async (context: PostUserContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;

    if (!value?.name || !value?.email || !value?.password) {
      context.response.status = 400;
      return;
    } else {
      const userr = await usersCollection.findOne({...value});

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/.test(value.email)) {
    context.response.status = 404;
    context.response.body = "El formato del email no es válido"
  }else {
      const hash = await bcrypt.hash(value.password);

      if(userr?.email == value.email){
        context.response.body = {
          message : "Usuario ya estaba en la base"
        }
        context.response.status = 404;
      } else{
        const user: Partial<User> = { // Es lo que se añade a la colección
          name: value.name,
          email: value.email,
          password: hash,
          createdAt: new Date(),
          cart: []
        };

        const id = await usersCollection.insertOne(user as UserSchema);
        context.response.body = {
          message: "Usuario insertado correctamente en la base de datos",
          name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            cart: user.cart
        };

      }
    }
  }
} catch (error) {
    context.response.status = 404;
    context.response.body = { message: "No se ha podido añadir el usuario a la base de datos", error: error };
}
  }

// Añadir autor
export const addAuthor = async (context: PostAuthorContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;
    if (!value?.name) {
      context.response.status = 400;
      return;
    } else {
        console.log("Todos los campos del autor han sido insertados correctamente");
    }

    const author: Partial<Author> = { // Es lo que se añade a la colección
      name: value.name,
      books: []
    };
    
    const id = await authorsCollection.insertOne(author as AuthorSchema); // id mongo
    context.response.body = {
      message: "Autor insertado correctamente en la base de datos",
      name: author.name
    };
} catch (error) {
    context.response.status = 404;
    context.response.body = { message: "No se ha podido añadir el autor a la base de datos",
  error: error };
}
  };

// Añadir libro
export const addBook = async (context: PostBookContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;
    if (!value?.title || !value?.author || !value?.pages) {
      context.response.status = 400;
      return;
    } else {
      const author: AuthorSchema | undefined = await authorsCollection.findOne({
        _id: new ObjectId(value.author),
      });
      if(author){
        const myUUID = crypto.randomUUID();
        const book: Partial<Book> = { // Es lo que se añade a la colección
          title: value.title,
          author: value.author,
            pages: value.pages,
            ISBN : myUUID
        };
    
    
        const id = await booksCollection.insertOne(book as BookSchema);
        context.response.body = {
          message: "Libro insertado correctamente en la base de datos",
          title: book.title,
          author: book.author,
          pages: book.pages
        };
        const auxAuthor = author.books;
        auxAuthor.push(id);
        const updateAuthor: AuthorSchema = {
          ...author,
          books: auxAuthor,
        };
        await authorsCollection.updateOne(
          {_id : new ObjectId(value.author)},
          {$set : updateAuthor},
        );

      }
      else{
        context.response.body = {
          message:"No hay autor con ese id"
        }
        context.response.status = 404;
      }
    }
} catch (error) {
    context.response.status = 500;
    context.response.body = { message: "No se ha podido añadir el libro a la base de datos" ,
                              error: error,
  };
}
  };