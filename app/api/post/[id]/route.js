import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try {
      await connectToDB();
      const post = await Blog.findById(params.id).populate({
        path:"comments",
        model:Comment
      });
      return NextResponse.json(post, {status:200});  
    } catch (error) {
        throw new error;
    }
}


export async function PATCH(request, {params}){
    
    const {title, content} = await request.json();

    try {
    await connectToDB();
    const existingBlog = await Blog.findById(params.id);
    existingBlog.title = title;
    existingBlog.content = content;
    await existingBlog.save();
    return NextResponse.json("blog updated", {status:200}) 
    } catch (error) {
        throw new error;
    }
}