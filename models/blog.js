import mongoose from "mongoose";


const blogSchema = new mongoose.Schema ({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },

    title:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true
    },

    image:String,

    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})


const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;


