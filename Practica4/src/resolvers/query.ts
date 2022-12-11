import { VendedorCollection } from "../db/mongo.ts";
import { vendedorSchema } from "../db/schemas.ts";
import { Vendedor } from "../types.ts";

export const Query = {
    obtenerVendedores: async (_:unknown, args: {id: string, nombre: string}): Promise<vendedorSchema | null>=>{
        try{
            const id = args.id;
            const nombre = args.nombre;

            const VendedoresDB = await VendedorCollection.findOne({id: id, nombre:nombre});

            if(VendedoresDB){
                return {
                    ...VendedoresDB,
                }
            }
            else{
                return null;
            }

        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },
}