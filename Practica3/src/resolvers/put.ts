import { ObjectId } from "mongo";
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { usersCollection,booksCollection } from "../db/mongo.ts";
import { UserSchema } from "../db/schemas.ts";

type PutUpdateCartSlotContext = RouterContext<
"/updateCart", Record<string | number, string | undefined>, 
Record<string, any>>

export const updateCart = async (context: PutUpdateCartSlotContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;
    if (!value.id_book || !value.id_user) {
      context.response.status = 406;
      return;
    }

    const user = await usersCollection.findOne({
      _id: new ObjectId(value.id_user),
    });

    if (!user) {
      context.response.status = 404;
      return;
    }

    const book = await booksCollection.findOne({
      _id: new ObjectId(value.id_book),
    });

    if (book) {
    const auxCart = user.cart;
    auxCart.push(value.id_book.toString());
    const updatedUser: UserSchema = {
      ...user,
      cart: auxCart,
    };

    const resultado = await usersCollection.updateOne(
      { _id: new ObjectId(value.id_user) },
      { $set: updatedUser },
    );

    console.log(resultado);

    context.response.status = 200;
    context.response.body = { message: "El carrito ha sido correctamente actualizado" };
    } else {
      context.response.body = { message: "El usuario ya tiene ese libro en el carrito"};
    }

  } catch (error) {
    context.response.status = 500;
    console.log(error);
  }
};