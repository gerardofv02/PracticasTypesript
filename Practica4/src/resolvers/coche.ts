import { VendedorCollection } from "../db/mongo.ts";
import { cocheSchema, vendedorSchema } from "../db/schemas.ts";

export const Vendedor = {
  /*
  id: (parent: coche): string => parent._id.toString(),
  coches: async (parent: vendedorSchema): Promise<vendedorSchema | undefined> => {
    try {
      const concesionario = await ConcesionarioCollection.findOne({
        vendedores: parent._id,
      });
      return concesionario;
    } catch (e) {
      throw new Error(e);
    }
  },
  */
};
