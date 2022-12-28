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
    emisor: string,
    destinatario: string,
    idioma: string,
    fechaCreacion: Date,
    mensaje: string
}