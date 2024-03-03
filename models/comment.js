import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
   
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    
    
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
   
    comment: {
    type:String, 
    required:true,
   }
})


const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;