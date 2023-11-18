"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import BlogCard from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { usePathname } from 'next/navigation';




const page = ({params}) => {
  
    const [posts, setPosts] = useState([]);
    const { id } = params;
    const { data:session  } = useSession();
    const pathname = usePathname();
   
    
    useEffect(()=>{
      const fetchUserPosts = async ()=>{
        const response = await fetch(`/api/user/${id}/posts`)
        const user = await response.json();
        return user.posts;
      }
      
        fetchUserPosts().then(data=>setPosts(data));
    
    },[id])

    if(!posts){
      return <Loader/>
    }
    
  
    return (
    <>
    <section className='flex flex-wrap w-screen gap-3 p-3 m-auto'>
      { posts.map((post)=>(
        <BlogCard
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          author={post.author}
          pathname={pathname}
        />
      )) }
    </section>
    </>
  )
}

export default page