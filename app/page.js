"use client"

import { useSession } from "next-auth/react"
import { fetchAllBlogs } from "@/lib/actions/blog.actions";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { usePathname } from "next/navigation";

const Home = () => {
  
 const { data:session } = useSession();
 const [blogs, setBlogs] = useState([]);
const pathname = usePathname();

 const fetchBlogPosts = async()=>{
   const data = await fetchAllBlogs();
   setBlogs(data);
 } 
 
 useEffect(()=>{
  fetchBlogPosts()
 },[])
 

 return (
    <section id="home" className='relative'>
    <div className='inset-0 bg-bg-image-1 bg-cover bg-repeat -z-30 absolute' />
    { session?.user?.id ? 
    <div className="flex flex-col ml-4 w-full items-center py-3" >
      <h1 className="text-4xl text-white font-bold" > Welcome {session?.user?.name}</h1>
  <h3 className="text-4xl text-white font-bold mt-3" >Check Out the latest posts on blogger!</h3>
  <div className="flex items-center w-full p-3 flex-wrap gap-3" >
   {blogs.map((item)=>(
    <BlogCard
     key={item._id}
     id={item._id}
     content={item.content}
     title={item.title}
     image={item.image}
     author={session?.user?.id}
     comments={item.comments}
    />
   ))}
  </div>
    </div>
    :
    <div className="flex flex-col ml-4 mt-4" >
      <h1 className="text-4xl text-white font-bold" >Welcome to Blogger</h1>
    </div>
    }
    </section>
  )
}

export default Home