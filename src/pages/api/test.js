import clientPromise from "../../lib/mongodb";

export default async function handler(req,res){
    try{
       const client = await clientPromise;
       const db = client.db("brandify");
       const users = await db.collection("users").find({}).toArray();
       res.json(users);  
    }catch(e){
         console.error(e);
         res.status(500).json({error:"Internal Server Error"});
    }
}