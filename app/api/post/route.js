import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(request){
   try {
    await connectToDB();
    const posts = await Blog.find({}).populate("author");
    return NextResponse.json(posts, {status:200})
   } catch (error) {
     throw new error
   }
}