"use client"

import { useSession } from "next-auth/react"
import { fetchAllBlogs } from "@/lib/actions/blog.actions";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const fetchToken = async () => {
  try {
    const response = await fetch("/api/auth/token");
    return response.json();
  } catch (err) {
    throw err;
  }
};


const Home = () => {
  
 const { data:session } = useSession();
 const [blogs, setBlogs] = useState([])

 const fetchBlogPosts = async()=>{
   const data = await fetchAllBlogs();
   return data; 
 } 
 
 useEffect(()=>{
  fetchBlogPosts().then(data=>setBlogs(data))
 },[])

 


 return (
    <section id="home" className='relative'>
    { session?.accessToken ?
    <div className="flex flex-col px-4 w-full items-start  md:items-center py-3 overflow-x-hidden"  >
       <div className="h-screen w-screen bg-[url('/hero_2.jpg')] absolute top-0 bg-cover -z-30 blur-xl"  />
  <h1 className="md:text-4xl text-2xl bg-gradient-to-r text-amber-950 font-extrabold  " > Welcome {session?.user?.name}</h1>
  <h3 className="md:text-4xl text-2xl bg-gradient-to-br text-amber-950 font-extrabold" >Check Out the latest posts on Blogger</h3>
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
    <div className=" w-full justify-center flex ml-4 mt-4 h-full" >
    <div className="h-screen w-screen bg-[url('/hero_2.jpg')] absolute top-0 bg-cover -z-30 mix-blend-plus-lighter" />
    <div className="flex flex-col gap-3" >
    <h1 className="md:text-4xl text-2xl bg-gradient-to-r text-amber-950  " >Welcome to Blogger</h1>
    <h3 className="md:text-4xl text-2xl bg-gradient-to-br text-amber-950 " >Post about the latest trending topics here</h3>
     <Image
      src="/hero_1.jpg"
      height={650}
      width={300}
      priority
      className="mt-5 object-contain"
     />
    </div>
    </div>
    }
    </section>
  )
}

export default Home