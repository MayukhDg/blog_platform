import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request){
   try {
    await connectToDB();
    const posts = await Blog.find({}).populate({
      path:"author",
      model:User
    }).sort({
      createdAt:"desc"
    })
    return NextResponse.json(posts, {status:200})
   } catch (error) {
     throw new error
   }
}