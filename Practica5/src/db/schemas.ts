import { ObjectId } from "mongo";
import { Usuario,Mensaje } from "../types.ts";

export type usuarioSchema = Omit<Usuario, "id"> & {
    _id:ObjectId,
}
export type mensajeSchema = Omit<Mensaje, "id"> & {
    _id:ObjectId,
}