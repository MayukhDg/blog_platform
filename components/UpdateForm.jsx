import { updatePost } from '@/lib/actions/blog.actions';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Loader from './Loader';

const UpdateForm = ({title, content, blogId}) => {

const [blogTitle, setBlogTitle] = useState(title);
const [blogContent, setBlogContent] = useState(content);
const [submitting, setSubmitting] = useState(false);
const router = useRouter();

const handleSubmit = async(e)=>{
  e.preventDefault();
  setSubmitting(true)
  await updatePost({
   blogTitle, blogContent, blogId
})

setSubmitting(false);
setBlogTitle("");
setBlogContent("");
 router.push("/")
}

if(submitting){
  return <Loader/>
}

  return (
    <form  className='bg-slate-800 p-5 flex flex-col items-center justify-start' onSubmit={handleSubmit} >
    <input className='outline-none rounded-sm p-1 mt-2' value={blogTitle}  onChange={e=>setBlogTitle(e.target.value)} />
     <textarea rows={10} cols={20} className='outline-none rounded-sm p-3 mt-2' value={blogContent} onChange={e=>setBlogContent(e.target.value)} />
     <button className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold mt-2  ' type="submit" >Submit</button>
   </form>
  
  )
}

export default UpdateForm