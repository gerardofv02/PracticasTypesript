
import { MongoClient, Database } from "mongo";
//import { BookSchema, BookingSchema } from "./schemas.ts";

import { config } from "dotenv";

await config({ export: true, allowEmptyValues: true });

const connectMongoDB = async (): Promise<Database> => {
  const mongo_url = Deno.env.get("MONGO_URL");

  if (!mongo_url) {
    throw new Error(
      "Missing environment variables, check env.sample for creating .env file"
    );
  }

  const client = new MongoClient();
  await client.connect(mongo_url);
  const db = client.database();
  return db;
};

const db = await connectMongoDB();
console.info(`MongoDB ${db.name} connected`);
/*
export const carsCollection = db.collection<BookSchema>("cars");
export const bookingsCollection = db.collection<BookingSchema>("bookings");
*/