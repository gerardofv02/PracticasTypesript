
import{ObjectId} from "mongo";
import { UsuarioCollection } from "../db/mongo.ts";
import { usuarioSchema } from "../db/schemas.ts";

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

    }
    
}