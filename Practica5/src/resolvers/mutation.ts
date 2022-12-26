import{Usuario,Mensaje} from "../types.ts";
import{usuarioSchema,mensajeSchema} from "../db/schemas.ts";
import{UsuarioCollection, MensajesCollection} from "../db/mongo.ts";
import{ObjectId} from "mongo";
import * as bcrypt from "bcrypt";

export const Mutation = {
    createUser: async(_:unknown, args: {username:string, password:string},ctx: {idioma?: string}): Promise<usuarioSchema> =>{
        try{
            console.log(ctx);
            const {username,password} = args;
            const exits = await UsuarioCollection.findOne({
                username
            });
            if(exits){
                throw new Error("EL usuario ya esta creado con ese username");
            }

            else{
                const hash = await bcrypt.hash(password);
                const _id = await UsuarioCollection.insertOne({
                    username,
                    password:hash,
                    
                });
                return{
                    _id,
                    username,
                    password : hash,
                }
            }

        }
        catch(e){
            throw new Error(e);
           console.log(e);
        }
    }
    
}