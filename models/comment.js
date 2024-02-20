import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
   
    blogId:{
        type:String,
        required:true
    },
   
    comment: {
    type:String, 
    required:true,
   }
})


const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;