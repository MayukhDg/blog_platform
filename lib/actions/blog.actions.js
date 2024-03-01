"use server"

import Blog from "@/models/blog"
import { connectToDB } from "../dbConnect"
import User from "@/models/user"
import { revalidatePath } from "next/cache"
import Comment from "@/models/comment"

export const fetchUserBlogs = async()=>{
  try {
    await connectToDB();
    const allPosts = await Blog.find({}).populate("comments")
   return JSON.parse(JSON.stringify(allPosts), {status:200})
  } catch (error) {
    console.log(error);
  }
} 


export const deleteBlog = async({blogId, userId, pathname})=>{
   try {
    await connectToDB();
    await Blog.findByIdAndDelete(blogId)
    await User.findByIdAndUpdate(userId, {
        $pull:{posts:blogId}
    })
    revalidatePath(pathname);
   } catch (error) {
    console.log(error);
   }
}


export const addBlog = async({author, title, content, image, pathname})=>{
  try {
    const newBlog = await new Blog({
      author, 
      title, 
      content, 
      image
    })
    await newBlog.save();
    await User.findByIdAndUpdate(author, {
      $push:{posts:newBlog._id}
    })
    revalidatePath(pathname);
  } catch (error) {
    console.log(error);
  }
}



export const addCommentToBlog = async({blogId, comment, pathname})=>{
   try {
    const newComment = await new Comment({blogId, comment});
   await newComment.save();
   await Blog.findByIdAndUpdate(blogId, {
    $push:{comments:newComment._id}
   })
   revalidatePath(pathname);   
   } catch (error) {
    console.log(error);
   } 
}


export const updatePost = async({ blogTitle, blogContent, blogId})=>{
  try {
    await connectToDB();
    const existingBlog = await Blog.findById(blogId);
    existingBlog.title = blogTitle;
    existingBlog.content = blogContent;
    await existingBlog.save();
  } catch (error) {
    console.log(error);
  }
}


export const fetchBlog = async(blogId)=>{
   try {
    await connectToDB();
    const blog = await Blog.findById(blogId);
    return JSON.parse(JSON.stringify(blog), {status:200})
   } catch (error) {
     console.log(error);
   }
}  