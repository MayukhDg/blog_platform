import mongoose from "mongoose";


const blogSchema = new mongoose.Schema ({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    title:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true
    },

    image:String
})


const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;


