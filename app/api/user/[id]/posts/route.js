import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Comment from "@/models/comment";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET (request, {params}){
    try {
        await connectToDB();
        const userPosts = await User.findById(params.id).populate({
            path:"posts",
            model:Blog,
            populate:[
                {
                    path:"comments",
                    model:Comment
                }
            ]
        })

        return NextResponse.json(userPosts, {status:200})

    } catch (error) {
        throw new error;
    }
}