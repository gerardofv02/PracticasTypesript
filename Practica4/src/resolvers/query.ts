import { VendedorCollection,CochesCollection,ConcesionarioCollection } from "../db/mongo.ts";
import { vendedorSchema,cocheSchema,concesionarioSchema } from "../db/schemas.ts";
import { Vendedor } from "../types.ts";
import{ObjectId} from "mongo";

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
    obtenerVendedores_id: async (_:unknown, args: { id: string}): Promise<vendedorSchema | undefined>=>{
        try{
            const id = args.id;

            const VendedoresDB = await VendedorCollection.findOne({ id:id});

            return VendedoresDB;

        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },
    
    obtenerCoches_id: async (_:unknown, args: { id: string}): Promise<cocheSchema | undefined>=>{
        try{
            const id = args.id;

            const CocheDB = await CochesCollection.findOne(
                { id:id
                });

            return CocheDB;

        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },
    obtenerCoches_rangoPrecio: async (_:unknown, args: { precioMin: number, precioMax: number}): Promise<cocheSchema[] | null>=>{
        try{
            const precioMin = args.precioMin;
            const precioMax = args.precioMax;

            const CochesDB = await CochesCollection.find({precio:{$gte:precioMin, $lte:precioMax}}).toArray();

            return CochesDB;

        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },
    obtenerConcesionario_id: async (_:unknown, args: { id: string}): Promise<concesionarioSchema | undefined>=>{
        try{
            const id = args.id;

            const ConcesionarioDB = await ConcesionarioCollection.findOne(
                { _id : new ObjectId(id),
                });

                if(!ConcesionarioDB){
                    throw new Error("NO existe");
                }

            return ConcesionarioDB;

        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },
    obtenerConcesionario_localidad: async (_:unknown, args: { localidad: string}): Promise<concesionarioSchema[] | null>=>{
        try{
            const localidad = args.localidad;

            const ConcesionarioDB = await ConcesionarioCollection.find({localidad:localidad}).toArray();

            return ConcesionarioDB;

        }catch(e){
            throw new Error(e);
            console.log(e);
        }
    },

    
}