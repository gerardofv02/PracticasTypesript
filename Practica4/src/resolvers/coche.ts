import { cocheSchema } from "../db/schemas.ts";

export const Coche = {
    id: (parent: cocheSchema): string => parent._id.toString(),
}