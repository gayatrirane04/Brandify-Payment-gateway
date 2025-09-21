import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    createdAt:{type:Date,default:Date.now},
    name:{type:String},
    email:{type:String},
    profileImage:{type:String},
    isSubscriber:{type:Boolean,default:false},
    subscriptionStart:{type:Date},
    subscriptionEnd:{type:Date},
});    

export default mongoose.models.User || mongoose.model("User",UserSchema);
