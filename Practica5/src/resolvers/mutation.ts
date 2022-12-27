import{Usuario,Mensaje} from "../types.ts";
import{usuarioSchema,mensajeSchema} from "../db/schemas.ts";
import{UsuarioCollection, MensajesCollection} from "../db/mongo.ts";
import{ObjectId} from "mongo";
import * as bcrypt from "bcrypt";
import { createJWT } from "../utils/jwt.ts";

export const Mutation = {
    createUser: async(_:unknown, args: {username:string, password:string},ctx: {idioma?: string}): Promise<usuarioSchema> =>{
        try{
            const {username,password} = args;
            const exits = await UsuarioCollection.findOne({
                username
            });
            if(exits){
                throw new Error("EL usuario ya esta creado con ese username");
            }

            else{
                const idioma = ctx.idioma;
                if(idioma == null){
                    throw new Error("No se ha introducido el idioma")
                }
                else{
                    const fechaCreacion = new Date();
                    const hash = await bcrypt.hash(password);
                    const _id = await UsuarioCollection.insertOne({
                        username,
                        password:hash,
                        idioma,
                        fechaCreacion,
                        
                        
                    });
                    return{
                        _id,
                        username,
                        password : hash,
                        idioma: ctx.toString(),
                        fechaCreacion
                    }
            }
            }

        }
        catch(e){
            throw new Error(e);
           console.log(e);
        }
    },
    login:async(_:unknown,args:{username: string, password:string}) : Promise<string> =>{
        try{
            const {username, password} = args;
            const usuario : usuarioSchema | undefined = await UsuarioCollection.findOne({
                username: username,
            });
            if(!usuario){
                throw new Error("Usuario no encontrado en la base de datos");
            }
            const validPass = await bcrypt.compare(password,usuario.password);
            if(!validPass){
                throw new Error("COntraseña no es la misma");
            }
            const token = await createJWT({
                username: usuario.username,
                password : usuario.password,
                idioma: usuario.idioma,
                id: usuario._id.toString(),
                fechaCreacion: usuario.fechaCreacion
            },
                Deno.env.get("JWT_SECRET")!
            );
            return token;
                }catch(e){
            throw new Error(e);
        }
        

    }
    
}