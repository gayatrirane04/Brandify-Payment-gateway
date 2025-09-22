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
                clerkId: userId,
                createdAt: new Date(),
                name: user.firstName + " " + user.lastName,
                email: user.emailAddresses[0]?.emailAddress,
                profileImage: user.imageUrl,
                isSubscriber: false,
                subscriptionStart: null,
                subscriptionEnd: null
            };
            const result = await userCollection.insertOne(newUser);
            dbUser = { ...newUser,_id:result.insertedId};
        }

        // Calculate if user has access (created less than 1 year ago)
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const hasAccess = new Date(dbUser.createdAt) > oneYearAgo;
        
        console.log("User createdAt:", dbUser.createdAt);
        console.log("One year ago:", oneYearAgo);
        console.log("Has access:", hasAccess);
        
        dbUser.hasAccess = hasAccess;

        return new Response(JSON.stringify(dbUser),{status:200});

    } catch(error){
        console.error("API Error:", error);
        return new Response(JSON.stringify({error:error.message}),{status:500});
    }
}