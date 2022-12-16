import{ObjectId} from "mongo";
export type Coche = {
    id: string,
    matricula: string,
    precio: number,
}
export type Vendedor = {
    id: string,
    coches: ObjectId[],
    nombre: string,
    dni: string,
}
export type Concesionario = {
    id: string,
    nombre: string,
    vendedores: ObjectId[],
    localidad: string,
}