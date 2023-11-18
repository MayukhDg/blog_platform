import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/blog";
import User from "@/models/user";

export async function POST (request){
  const { author, title, content, image } = await request.json();
 
  try {
    await connectToDB();
  const  newPost = await new Blog({
        author, title, content, image
    })
    await newPost.save();
    await User.findByIdAndUpdate(author, {
      $push: { posts: newPost._id },
    });
    return new Response(JSON.stringify(newPost), { status:200})
   
  } catch (error) {
   console.log(error);    
  }

  
}