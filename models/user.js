import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true
    },

   image:String,

   posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
   }]
}) 

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;