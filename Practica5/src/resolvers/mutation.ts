import{Usuario,Mensaje} from "../types.ts";
import{usuarioSchema,mensajeSchema} from "../db/schemas.ts";
import{UsuarioCollection, MensajesCollection} from "../db/mongo.ts";
import{ObjectId} from "mongo";

export const Mutation = {
    createUser: async(_:unknown, args: {username:string, password:string}): Promise<usuarioSchema> =>{
        try{
            const {username,password} = args;
            const exits = await UsuarioCollection.findOne({
                username
            });
            if(exits){
                throw new Error("EL usuario ya esta creado con ese username");
            }
            else{
                const _id = await UsuarioCollection.insertOne({
                    username,
                    password,
                });
                return{
                    _id,
                    username,
                    password,
                }
            }

        }
        catch(e){
            throw new Error(e);
           console.log(e);
        }
    }
    
}