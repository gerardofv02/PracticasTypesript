import { ObjectId } from "mongo";
import { Coche,Vendedor,Concesionario } from "../types.ts";

export type cocheSchema = Omit<Coche, "id"> & {
    _id:string,
}
export type vendedorSchema = Omit<Vendedor, "id"> & {
    _id:string,
}
export type concesionarioSchema = Omit<Concesionario, "id"> & {
    _id:string,
}