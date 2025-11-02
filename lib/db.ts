import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb";

if(!process.env.DB_URL){
     throw new Error("Mongo URL is not found!")
}

const client = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName: string){
  try {
    await client.connect();
    console.log("--- :: Connected to Database :: ---");
    return client.db(dbName)
  } catch (err) {
    console.error(err);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("wesplit_db");
  if (db) return db.collection(collectionName);

  return null;
}