
import{ObjectId} from "mongo";
import { MensajesCollection, UsuarioCollection } from "../db/mongo.ts";
import { mensajeSchema, usuarioSchema } from "../db/schemas.ts";

export const Query = {
    getUser : async(_:unknown ,args :{username:string}): Promise<usuarioSchema| undefined> => {
        try{
            const username = args.username;
            const find = await UsuarioCollection.findOne({username:username});
            return find;
           
        }catch(e){
            throw new Error(e);
            console.log(e);
        }

    },
    getMessages: async(_:unknown,args:{page: number, perPage:number}) : Promise<mensajeSchema[]|undefined> =>{
        try{
            const {page, perPage} = args;
            if(perPage <10){
                throw new Error("El limete esta entre 10 y 200");
            }
            if(perPage > 200){
                throw new Error("El limite tiene que estar entre 10 y 200");
            }
            if(page < 0 ){
                throw new Error("NO se pueden usar paginas engativas");
            }
            const messageDB: mensajeSchema[] = await MensajesCollection.find().skip(page*perPage).limit(perPage).toArray();

            return messageDB;

        }catch(e){
            throw new Error(e);
        }
    }
    
}