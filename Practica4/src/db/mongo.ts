import { MongoClient, Database, Collection } from "mongo";
//import { UserSchema } from "./schema.ts";

import { config } from "std/dotenv/mod.ts";

await config({ export: true, allowEmptyValues: true });

const connectMongoDB = async (): Promise<Database> => {
  const mongo_url = Deno.env.get("MONGO_URL");
  const db_name = Deno.env.get("DB_NAME");

  if (!mongo_url ) {
    throw new Error(
      "Missing environment variables, check env.sample for creating .env file"
    );
  }


  const client = new MongoClient();
  await client.connect(mongo_url);
  const db = client.database(db_name);
  return db;
};

const db = await connectMongoDB();
console.info(`MongoDB ${db.name} connected`);

