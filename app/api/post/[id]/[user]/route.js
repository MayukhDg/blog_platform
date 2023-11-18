import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function DELETE (request, {params}){
  
  const { pathname } = await request.json();

    try {
    await connectToDB();
    await Blog.findByIdAndDelete(params.id);
    
    await User.findByIdAndUpdate(params.user,{
        $pull:{posts:params.id}
    })

    revalidatePath(pathname);
    return NextResponse.json("post has been successfully deleted", {status:200})

   } catch (error) {
    throw new error;
   }
}