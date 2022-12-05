
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { usersCollection } from "../db/mongo.ts";

type DeleteUserContext = RouterContext<
"/deleteUser/:id", {
  id: string;
} & Record<string | number, string | undefined>, Record<string, any>>

export const deleteUser = async (context: DeleteUserContext) => {
  try{
  if (context.params?.id) {
    const count = await usersCollection.deleteOne({
      _id: new ObjectId(context.params.id),
    });
    if (count) {
      context.response.status = 200;
      context.response.body = {
        message: "Usuario eliminado correctamente de la base de datos",
      };
    } else {
      context.response.status = 404;
      context.response.body = {
        message: "No se encontró el usuario",
      };
    }
  }
}catch(error){
  context.response.status = 404;
  context.response.body = { error: error };
}
};