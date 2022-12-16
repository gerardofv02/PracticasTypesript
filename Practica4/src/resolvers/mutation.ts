import { CochesCollection, VendedorCollection ,ConcesionarioCollection} from "../db/mongo.ts";
import { vendedorSchema,cocheSchema,concesionarioSchema } from "../db/schemas.ts";
import { Vendedor , Coche,Concesionario} from "../types.ts";
import { ObjectId } from "mongo";

export const Mutation = {
    crearVendedor: async(_: unknown,args: {nombre: string,dni: string}) : Promise<vendedorSchema> => { 
        try{
            const{nombre,dni } = args;
            if (!/^[0-9]{8}[A-Z]$/.test(args.dni)) {
              throw new Error("Dni mal introducido");
            }
            else{
              const exists = await VendedorCollection.findOne({
                dni
              });
              if(exists){
                throw new Error("Ya existe el usuario con ese dni");
              }
              else{
            const _id = await VendedorCollection.insertOne({
                nombre,
                coches:[],
                dni,
            });

            return {
                _id,
                coches:[],
                nombre,
                dni
            };
          }
        }
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
              matricula,
              precio,
          };
        } catch (e) {
          throw new Error(e);
        }
      },
      
      
      anadirCoche_Vendedor: async ( _: unknown, args: { idCoche: string, idVendedor: string }): Promise<vendedorSchema> => {
        try {
          const { idCoche, idVendedor } = args;

          const vendedor = await VendedorCollection.findOne({ _id: new ObjectId(args.idVendedor) });
          if (!vendedor) {
            throw new Error("Vendedor no encontrado en la DB");
          }
          const coche = await CochesCollection.findOne({ _id: new ObjectId(args.idCoche) });
          if (!coche) {
            throw new Error("Coche no encontrado en la DB");
          }

          const find= vendedor.coches.find( (coches)  => {
            return coches.toString() === args.idCoche
            
          });
          if (find) {
            throw new Error ("El vendedor ya tenia el coche")
          }

          const coches = vendedor.coches;
          coches.push(coche._id);

          const _id = await VendedorCollection.updateOne(
            { _id: new ObjectId(args.idVendedor) },
            { $set: { coches } }
          );
          if(!_id.upsertedId){
            throw new Error("mal");
          }
          return {
            _id:_id.upsertedId!,
            coches,
            nombre: vendedor.nombre,
            dni: vendedor.dni,
          };
        } catch (e) {
          throw new Error(e);
        }
      },
      crearConcesionario : async (_: unknown, args: { nombre: string, localidad: string}): Promise<concesionarioSchema> => {
        try {
          const { nombre, localidad } = args;
          const exists = await ConcesionarioCollection.findOne({
            nombre, localidad
          });
          if (exists) {
            throw new Error("Ya existe el concesionario");
          }
  
          const _id = await ConcesionarioCollection.insertOne({
            nombre ,
            localidad,
            vendedores:[],
          });

          return {
              _id,
              nombre,
              localidad,
              vendedores:[],
          };
        } catch (e) {
          throw new Error(e);
        }
      },
      anadirVendedor_Concesionario: async ( _: unknown, args: { idVendedor: string, idConcesionario: string }): Promise<concesionarioSchema> => {
        try {
          const { idVendedor, idConcesionario } = args;

          const concesionario = await ConcesionarioCollection.findOne({ _id: new ObjectId(args.idConcesionario) });
          if (!concesionario) {
            throw new Error("Concesionario no encontrado en la DB");
          }

          const vendedor = await VendedorCollection.findOne({ _id: new ObjectId(args.idVendedor) });
          if (!vendedor) {
            throw new Error("Vendedor no encontrado en la DB");
          }

          const find= concesionario.vendedores.find( (vendedores:ObjectId)  => {
            return vendedores.toString() === args.idVendedor
          });
          
          if (find) {
            throw new Error ("El concesionario ya tenia el vendedor")
          }

          const vendedores = concesionario.vendedores;
          vendedores.push(vendedor._id);

          const _id = await ConcesionarioCollection.updateOne(
            { _id: new ObjectId(args.idConcesionario) },
            { $set: { vendedores } }
          );
          return {
            _id:_id.upsertedId!,
            vendedores,
            nombre: concesionario.nombre,
            localidad: concesionario.localidad
          };
        } catch (e) {
          throw new Error(e);
        }
      },
      
}