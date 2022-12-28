import{ObjectId} from "mongo";

export type Usuario = {
    id: string,
    username: string,
    password: string,
    idioma: string,
    fechaCreacion: Date,
    mensajes: ObjectId[],
}
export type Mensaje = {
    id:string,
    destinatario: string,
    mensaje: string
}