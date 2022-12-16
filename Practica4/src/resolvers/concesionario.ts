import { ObjectId } from "mongo";
import { VendedorCollection } from "../db/mongo.ts";
import {  concesionarioSchema, vendedorSchema } from "../db/schemas.ts";

export const Concesionario = {
  id: (parent: concesionarioSchema): string => parent._id.toString(),
  vendedores: async (parent: concesionarioSchema): Promise<vendedorSchema[] | undefined> => {
    try {
      const arrayIds = parent.vendedores.map((id ) => new ObjectId(id));
      const vendedores = await VendedorCollection.find({
        _id : {$in: arrayIds}
      }).toArray();
      return vendedores;
    } catch (e) {
      throw new Error(e);
    }
  },
};