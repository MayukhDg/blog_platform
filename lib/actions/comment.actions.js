"use server"


import Comment from "@/models/comment"
import { connectToDB } from "../dbConnect";
import Blog from "@/models/blog";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export const deleteComment = async({commentId, blogId, pathname})=>{
   try {
    await connectToDB(); 
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    await Blog.findByIdAndUpdate(blogId, {
        $pull:{comments: deletedComment._id}
    } )
    revalidatePath(pathname);
   } catch (error) {
    throw new error;
   }
}


export const fetchComment = async(commentId)=>{
  try {
    await connectToDB();
    const comment = await Comment.findById(commentId).populate({
      path:"author",
      model:User
    })

    return JSON.parse(JSON.stringify(comment), {status:200});

  } catch (error) {
    console.log(error);
  }
}