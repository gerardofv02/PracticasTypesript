export type Usuario = {
    id: string,
    username: string,
    password: string,
    idioma: string,
    fechaCreacion: Date,
}
export type Mensaje = {
    id:string,
    destinatario: string,
    mensaje: string
}