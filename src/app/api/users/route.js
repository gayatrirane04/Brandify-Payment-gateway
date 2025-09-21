import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(){
    try{
        console.log("Starting API call...");
        const user = await currentUser();
        console.log("User from Clerk:", user ? "Found" : "Not found");
        if(!user){
          return new Response(JSON.stringify({error:"Not authenticated"}) , {status:401} );
        }
        const userId = user.id;
        console.log("Connecting to MongoDB...");
        const client = await clientPromise;
        console.log("MongoDB connected successfully");
        const db = client.db("brandify");
        const userCollection = db.collection("users");

        let dbUser = await userCollection.findOne({clerkId:userId});

        if(!dbUser){
            const newUser = {
                clerkId : userId,
                createdAt: new Date(),
            };
            const result = await userCollection.insertOne(newUser);
            dbUser = { ...newUser,_id:result.insertedId};
        }

        return new Response(JSON.stringify(dbUser),{status:200});

    } catch(error){
        console.error("API Error:", error);
        return new Response(JSON.stringify({error:error.message}),{status:500});
    }
}