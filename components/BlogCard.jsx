"use client";

import Image from 'next/image'
import React,{ useState} from 'react'
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import CommentCard from './CommentCard';
import { usePathname } from 'next/navigation';
import { addCommentToBlog, deleteBlog } from '@/lib/actions/blog.actions';
import { useSession } from 'next-auth/react';

const BlogCard = ({id, title, content, image, author, comments}) => {
  
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { data:session  } = useSession();
  
  const handleDelete = async(e)=>{
   e.preventDefault();
   
   const confirmDelete = confirm("Are you sure you want to delete this post?")

   if(confirmDelete){
    await deleteBlog({
      blogId:id,
      userId:author,
      pathname
    })
   }

  } 

  const addComment = async()=>{
    if(comment==="") return;
    
    await addCommentToBlog({
      user:session?.user?.id, 
      blogId:id,
       comment,
       pathname
    })

    setComment("");

  }


  const onClose = ()=>{
    setOpenModal(false);
  }
  
  const handleEdit = ()=>{
    router.push(`/edit-post/${id}`)
  } 

  return (
    <>
    { session?.user?.id && <div  className='flex flex-col bg-slate-500 p-5 justify-center items-center cursor-pointer mt-3' >
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
     { session?.user?.id===author && <button onClick={handleDelete} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Delete Post</button>}
     { session?.user?.id===author && <button onClick={()=>handleEdit(id)} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Edit Post</button>}
     <button onClick={()=>addComment(id)} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Comment</button>
     <button onClick={()=>setOpenModal(true)} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >show full post</button>
     </div>
     <textarea className='mt-5 outline-none' row={300} cols={80} value={comment} onChange={e=>setComment(e.target.value)} />
      {comments.map((item, index)=>(
       <CommentCard
       blogId={item.blogId}
       comment={item.comment}
       pathname={pathname}
       author={item.author}
       key={item._id}
       id={item._id}
       />
     ))}
    </div>}
    <Modal onClose={onClose} openModal={openModal} setOpenModal = {setOpenModal} title={ title} content= {content} image={image} author={author}/>
    </>
  )
}

export default BlogCard