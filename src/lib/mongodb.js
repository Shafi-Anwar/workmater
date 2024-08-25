import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const options = { 
};

let cachedClient = null;
let cachedDb = null;

export default async function connectToDatabase() {
  if (cachedDb) {
    return { db: cachedDb, client: cachedClient };
  }

  try {
    const client = await mongoose.connect(uri, options);
    cachedClient = client;
    cachedDb = client.connection.db;
    return { db: cachedDb, client: client.connection };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
