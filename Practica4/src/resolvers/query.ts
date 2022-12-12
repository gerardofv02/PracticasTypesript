import { VendedorCollection } from "../db/mongo.ts";
import { vendedorSchema } from "../db/schemas.ts";
import { Vendedor } from "../types.ts";

export const Query = {
    obtenerVendedores_nombre: async (_:unknown, args: { nombre: string}): Promise<vendedorSchema[] | null>=>{
        try{
            const nombre = args.nombre;

            const VendedoresDB = await VendedorCollection.find({ nombre:nombre}).toArray();

            return VendedoresDB;

        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },
}