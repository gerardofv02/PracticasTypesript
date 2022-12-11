import { CochesCollection, VendedorCollection } from "../db/mongo.ts";
import { vendedorSchema,cocheSchema, } from "../db/schemas.ts";
import { Vendedor , Coche,Concesionario} from "../types.ts";
import { ObjectId } from "mongo";

export const Mutation = {
    crearVendedor: async(_: unknown,args: {nombre: string}) : Promise<vendedorSchema> => { 
        try{
            const{nombre } = args;
            const _id = await VendedorCollection.insertOne({
                nombre,
                coches:[],
            });

            return {
                _id,
                coches:[],
                nombre,
            };
        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },
    crearCoche: async (_: unknown, args: { matricula: string, precio: number }): Promise<cocheSchema> => {
        //pasarle el id por parametro o no? Como sabemos si existe en la base de datos?
        try {
          const { matricula, precio } = args;
          const exists = await CochesCollection.findOne({
            matricula
          });
          if (exists) {
            throw new Error("Ya existe el coche");
          }
  
          const _id = await CochesCollection.insertOne({
            matricula,
            precio
          });
          return {
              _id,
              precio,
              matricula,
          };
        } catch (e) {
          throw new Error(e);
        }
      },
}