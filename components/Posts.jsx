"use client";

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { data:session }  = useSession();
  
  useEffect(()=>{
    const fetchPosts = async()=>{
     const response = await fetch("/api/post")
     const data = await response.json();
     return data;
    }

   if(session?.user?.id){
    fetchPosts().then(data=>setPosts(data));
   }
  },[session?.user?.id])  
  
  return (
    <div className='flex px-4 flex-wrap flex-1 overflow-x-hidden md:justify-start' >
    { posts.map((post)=>(
     <BlogCard
     key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          author={post.author}
          comments={post.comments}
     />
    )) }
    </div>
  )
}

export default Posts