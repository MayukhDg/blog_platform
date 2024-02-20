import Blog from "@/models/blog";
import { connectToDB } from "@/lib/dbConnect";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";



export async function POST(request){
   const { blogId, comment } = await request.json();
   
  try {
    await connectToDB();
    const newComment = await Comment.create({
        blogId, comment
    }) 
    await Blog.findByIdAndUpdate(blogId,{
        $push:{comments:newComment._id}
    })
    return NextResponse.json("comment added", {status:200});
  } catch (error) {
     console.log(error);
  }

  

}