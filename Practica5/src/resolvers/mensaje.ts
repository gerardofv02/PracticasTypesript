import { mensajeSchema } from "../db/schemas.ts";

export const Mensaje = {
    id: (parent: mensajeSchema): string => parent._id.toString(),
}