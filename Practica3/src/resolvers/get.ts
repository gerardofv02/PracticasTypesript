import { getQuery } from 'https://deno.land/x/oak/helpers.ts';
import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { booksCollection, usersCollection } from "../db/mongo.ts";
import { BookSchema, UserSchema  } from "../db/schemas.ts";
import { Database, ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

type GetBooksContext = RouterContext<
  "/getBooks",
  Record<string | number, string | undefined>,
  Record<string, any>
>;



export const getBooks = async (context: GetBooksContext) => {
  try{

    const params = getQuery(context, { mergeParams: true });
    if(!params.page){
      throw new Error("Missing param page");
      return;
    }
    else{
      if(params.title){
      const bookDB   = await booksCollection.find({title: params.title}).skip(Number(params.page)*10).limit(10).toArray();
      context.response.body = {
        bookDB,
      }
  
      }
      else{
      const bookDB: BookSchema[] = await booksCollection.find().skip(Number(params.page)*10).limit(10).toArray();
      context.response.body = {
        bookDB,
      }
  
      }
    
    }
}
catch(error){
  context.response.body = 404;
  context.response.body = { error: error };
  
}
};

type GetUserContext = RouterContext<
"/getUser/:id", {
  id: string;
} & Record<string | number, string | undefined>, 
Record<string, any>>

export const getUser = async (context: GetUserContext) => {
  try{
  if (context.params?.id) {
    const user: UserSchema | undefined = await usersCollection.findOne({
      _id: new ObjectId(context.params.id),
    });

    if (user) {
      context.response.body = user;
      return;
    }
  }

  context.response.status = 404;
}catch(error){
  context.response.status = 404;
  context.response.body = { error: error };
}
};