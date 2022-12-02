import { Books } from "../types.ts";
import { ObjectId } from "mongo";

export type BookSchema = Omit<Books, "author"> & {
  _id: ObjectId;
  nombre: string;
};
/*
export type BookingSchema = Omit<Booking, "car"> & {
  _id: ObjectId;
  car: string; //plate
};
*/
