// src/lib/mongodb.js
import { MongoClient } from "mongodb"; // 

const uri = process.env.MONGODB_URI; // put your MongoDB connection string in .env.local
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable so it doesn't create a new client every time
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In prod, create a new client every time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
