"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const page = ({params}) => {
  
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    
    useEffect(()=>{
      const fetchPostDetails = async()=>{
        const response = await fetch(`/api/post/${params.id}`);
        const data = await response.json();
        setTitle(data.title)
        setContent(data.content);
      }
    
      fetchPostDetails();

    },[params.id])


    const handleSubmit = async(e)=>{
      e.preventDefault();

      try {
        setSubmitting(true)
        const response = await fetch(`/api/post/${params.id}`,{
            method:"PATCH",
            body:JSON.stringify({
                title,
                content
             })

        })

        if(response.ok){
            setSubmitting(false);
            router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(submitting){
        return <Loader/>
    }
  
    return (
        <section className='h-screen w-screen flex items-center justify-center  form__wrapper' >
        <form  className='bg-slate-800 p-5 flex flex-col items-center justify-start' onSubmit={handleSubmit} >
         <input className='outline-none rounded-sm p-1 mt-2' value={title}  onChange={e=>setTitle(e.target.value)} />
          <textarea rows={10} cols={20} className='outline-none rounded-sm p-3 mt-2' value={content} onChange={e=>setContent(e.target.value)} />
          <button className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold mt-2  ' type="submit" >Submit</button>
        </form>
       
       </section>
  )
}

export default page