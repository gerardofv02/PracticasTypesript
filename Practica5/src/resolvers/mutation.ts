import{Usuario,Mensaje} from "../types.ts";
import{usuarioSchema,mensajeSchema} from "../db/schemas.ts";
import{UsuarioCollection, MensajesCollection} from "../db/mongo.ts";
import{ObjectId} from "mongo";
import * as bcrypt from "bcrypt";
import { createJWT,verifyJWT } from "../utils/jwt.ts";

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
                        mensajes:[]
                        
                        
                    });
                    return{
                        _id,
                        username,
                        password : hash,
                        idioma: ctx.toString(),
                        fechaCreacion,
                        mensajes:[]
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
                fechaCreacion: usuario.fechaCreacion,
                mensajes: []
            },
                Deno.env.get("JWT_SECRET")!
            );
            return token;
                }catch(e){
            throw new Error(e);
        }
        

    },
    deleteUser:async(_:unknown,ctx:{Auth?:string}): Promise<usuarioSchema>=>{
        try{
            if(ctx.Auth == null){
                throw new Error("Auth mal introducido");
            }
            
            const comprobar = await verifyJWT(
                ctx.Auth || "",
                Deno.env.get("JWT_SECRET")!,
            );

           
            const usuario = comprobar as Usuario;

            const find : usuarioSchema| undefined = await UsuarioCollection.findOne({
                _id : new ObjectId(usuario.id)
            });
            if(!find){
                throw new Error("Usuario no encontrado");
            }
            return{
                _id : find._id,
                username: find.username,
                fechaCreacion: find.fechaCreacion,
                password: find.password,
                idioma: find.idioma,
                mensajes: []
            }

        }catch(e){
            throw new Error(e);
        }


    },
    sendMessage:async(_:unknown,args: {destinatario: string, message: string}, ctx:{Auth?:string, idioma?: string}) : Promise<mensajeSchema> =>{
        try {
            if (ctx.Auth === null) {
              throw new Error("Error con el Auth");
            }
      
            if (ctx.idioma === null) {
              throw new Error("Error con el idioma");
            }
      
            const comprobar = await verifyJWT(
              ctx.Auth || "",
              Deno.env.get("JWT_SECRET")!,
            );
      
            const emisor: Usuario = comprobar as Usuario;
      
            const encontrarEmisor: usuarioSchema | undefined =
              await UsuarioCollection.findOne({
                _id: new ObjectId(emisor.id),
            });
      
            if (!encontrarEmisor) {
              throw new Error("Usuario no encontrado");
            }
      
            if (ctx.idioma !== encontrarEmisor.idioma) {
              throw new Error(
                "El idioma no es el mismo",
              );
            }
      
            const encontrarReceptor: usuarioSchema | undefined =
              await UsuarioCollection.findOne({
                username: args.destinatario,
              });
      
            if (!encontrarReceptor) {
              throw new Error("Usuario no encontrado");
            }
      
            const fechaCreacion = new Date();
      
            const _id = await MensajesCollection.insertOne({
              emisor: encontrarEmisor._id.toString(),
              destinatario: encontrarReceptor._id.toString(),
              idioma: ctx.idioma,
              fechaCreacion: fechaCreacion,
              mensaje: args.message,
            });
            const mensajes = encontrarEmisor.mensajes;
            mensajes.push(_id);
            const __id = await UsuarioCollection.updateOne(
              {_id : new ObjectId(encontrarEmisor._id)},
              {$set: {mensajes}}
            );
      
            return {
              _id: _id,
              emisor: encontrarEmisor._id.toString(),
              destinatario: encontrarReceptor._id.toString(),
              idioma: ctx.idioma,
              fechaCreacion: fechaCreacion,
              mensaje: args.message,
            };
          } catch (e) {
            throw new Error(e);
          }
    },
    
}