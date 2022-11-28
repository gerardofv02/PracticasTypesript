import { RouterContext } from "xd";
import { BookSchema } from "../db/schemas.ts";
import { User, Author, Books  } from "../types.ts";
import { usersCollection, booksCollection, authorsCollection } from "../db/mongo.ts";

type PostUserContext = RouterContext<
    "/user",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type PostBooksContext = RouterContext<
    "/books",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type PostAuthorsContext = RouterContext<
    "/authors",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

export const addUser = async (context: PostUserContext) => {
    try {
        const body = await context.request.body();
        const user: User = body.value;
        const userDB = await usersCollection.insertOne(user);
        context.response.body = userDB;
    } catch (error) {
        context.response.status = 500;
        context.response.body = { message: error.message };
    }
}
export const addAuthor = async (context: PostAuthorsContext) => {
    try {
        const body = await context.request.body();
        const author: Author = body.value;
        const authorDB = await authorsCollection.insertOne(author);
        context.response.body = authorDB;
    } catch (error) {
        context.response.status = 500;
        context.response.body = { message: error.message };
    }
}

export const addBook = async (context: PostBooksContext) => {
    try {
        const body = await context.request.body();
        const book: Book = body.value;
        const bookDB = await booksCollection.insertOne(book);
        context.response.body = bookDB;
    } catch (error) {
        context.response.status = 500;
        context.response.body = { message: error.message };
    }
}