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
      <input className='outline-none rounded-sm p-1 mt-2' value={title}  onChange={e=>setTitle(e.target.value)} />
       <textarea rows={20} cols={20} className='outline-none rounded-sm p-3 mt-2 w-[80%]' value={content} onChange={e=>setContent(e.target.value)} />
       <input className='mt-2 outline-none' onChange={(e) => handleChangeImage(e)}  type="file" accept='image/*' />
       <button className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold  ' type="submit" >Submit</button>
     </form>
    
    </section>
  )
}

export default createPost