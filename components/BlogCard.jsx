"use client";

import Image from 'next/image'
import React,{ useState} from 'react'
import Modal from './Modal';
import { useRouter } from 'next/navigation';

const BlogCard = ({id, title, content, image, author, pathname}) => {
  
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  
  const handleDelete = async(e)=>{
   e.preventDefault();
   
   const confirmDelete = confirm("Are you sure you want to delete this post?")

   if(confirmDelete){
    try {
      const response = await fetch(`/api/post/${id}/${author}`, {
        method:"DELETE",
        body:JSON.stringify({
          pathname
        })
      })
     } catch (error) {
        console.log(error);
     }
   }

  } 

  const onClose = ()=>{
    setOpenModal(false);
  }
  
  const handleEdit = ()=>{
    router.push(`/edit-post/${id}`)
  } 

  return (
    <>
    <div onClick={()=>setOpenModal(true)} className='flex flex-col bg-slate-500 p-5 justify-center items-center cursor-pointer mt-3' >
     <h3 className='text-2xl font-bold' >{title}</h3>
     <Image
      src={image}
      alt="blogImage"
      height={200}
      width={350}
      className='object-contain mt-3'
     />
     <p className='text-2xl font-bold truncate'>{content.substring(0,60)}</p>
     <div className='flex justify-between items-center gap-2 w-full mt-2' >
     <button onClick={handleDelete} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Delete Post</button>
     <button onClick={()=>handleEdit(id)} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Edit Post</button>
     </div>
    </div>
    <Modal onClose={onClose} openModal={openModal} setOpenModal = {setOpenModal} title={ title} content= {content} image={image} author={author}/>
    </>
  )
}

export default BlogCard