"use client"




import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/lib/uploadImage';
import Loader from '@/components/Loader';
import { addBlog } from '@/lib/actions/blog.actions';
import { usePathname } from 'next/navigation';

const createPost = () => {
  
  const [title, setTitle ] = useState("");
  const [content, setContent ] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data:session } = useSession();
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(()=>{
    if(!session?.user?.id){
      router.push("/")
    }
  },[session?.user?.id])
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setSubmitting(true)
    const imageUrl = await uploadImage(image);
     const newBlog = await addBlog({
      author: session?.user.id,
        title, 
          content,
          image:imageUrl.url,
          pathname
     })

     setSubmitting(false);
     setTitle("");
     setContent("");
      router.push(`/profile/${session?.user?.id}`)
    
    
  }
  

  const handleChangeImage = (e)=>{
    e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result;

            setImage(result)
        };
  }

  if(submitting){
    return <Loader/>
  } 
    
  
  return (
    <section className='h-screen w-screen flex items-center justify-center  form__wrapper' >
     <form  className='bg-slate-800 p-5 flex flex-col items-center justify-start mx-auto w-2/3 mt-4' onSubmit={handleSubmit} >
      <input placeholder='enter a title...' className='outline-none rounded-sm p-1 mt-2 w-[80%] font-bold uppercase' value={title}  onChange={e=>setTitle(e.target.value)} />
       <textarea placeholder='Type your content here...' rows={20} cols={20} className='outline-none rounded-sm p-3 mt-4 w-[80%]' value={content} onChange={e=>setContent(e.target.value)} />
       <input className='block mt-3 text-sm text-gray-500
      file:me-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white
      hover:file:bg-blue-700
      file:disabled:opacity-50 file:disabled:pointer-events-none
      dark:file:bg-blue-500
      dark:hover:file:bg-blue-400 text-center' onChange={(e) => handleChangeImage(e)}  type="file" accept='image/*' />
       <button className=' mt-3 outline-none px-4 py-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' type="submit" >Submit</button>
     </form>
    
    </section>
  )
}

export default createPost