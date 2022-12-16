import { cocheSchema } from "../db/schemas.ts";

export const coche = {
    id: (parent: cocheSchema): string => parent._id.toString(),
}