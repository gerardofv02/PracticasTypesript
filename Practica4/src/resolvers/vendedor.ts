import { ObjectId } from "mongo";
import { CochesCollection, ConcesionarioCollection } from "../db/mongo.ts";
import { cocheSchema, concesionarioSchema, vendedorSchema } from "../db/schemas.ts";

export const Vendedor = {
    id: (parent: vendedorSchema): string => parent._id.toString(),
    coches: async (parent: vendedorSchema): Promise<cocheSchema[] | undefined> => {
      try {
        const arrayIds = parent.coches.map((id ) => new ObjectId(id));
        const coches = await CochesCollection.find({
          _id : {$in: arrayIds}
        }).toArray();
        return coches;
      } catch (e) {
        throw new Error(e);
      }
    },
  };