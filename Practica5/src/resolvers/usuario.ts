import { MensajesCollection } from "../db/mongo.ts";
import { mensajeSchema, usuarioSchema } from "../db/schemas.ts";
import{ObjectId} from "mongo";
export const Usuario = {
    id: (parent: usuarioSchema): string => parent._id.toString(),
    mensajes: async (parent: usuarioSchema): Promise<mensajeSchema[]> => {
      try {
        const arrayIds = parent.mensajes.map((id ) => new ObjectId(id));
        const mensajes = await MensajesCollection.find({
          _id : {$in: arrayIds}
        }).toArray();
        return mensajes;
      } catch (e) {
        throw new Error(e);
      }
    },
};