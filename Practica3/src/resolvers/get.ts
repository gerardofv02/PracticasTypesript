
import { getQuery } from "oak/helpers.ts";
import { RouterContext } from "oak/router.ts";
import { booksCollection } from "../db/mongo.ts";
import { BookSchema  } from "../db/schemas.ts";

type GetBooksContext = RouterContext<
  "/Books",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const getCars = async (context: GetBooksContext) => {
    try {
      const params = getQuery(context, { mergeParams: true });
      const bookDB: BookSchema[] = await booksCollection
        .find({ ...params })
        .toArray();
      const books = await Promise.all(
        bookDB.map(async (book) => ({
          ...book,
          bookings: await booksCollection.find({ book: book.nombre }).toArray(),
        }))
      );
      context.response.body = books;
    } catch (error) {
      context.response.status = 500;
      context.response.body = { message: error.message };
    }
  };