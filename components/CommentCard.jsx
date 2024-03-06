"use client";

import React from 'react';
import { deleteComment, fetchComment } from '@/lib/actions/comment.actions';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const CommentCard = ({id, pathname, comment, author,  blogId,  userImage}) => {
  
  const {data:session} = useSession(); 
  
  const delComment = async(e)=>{
    e.preventDefault();  
    await deleteComment({
        commentId:id, blogId, pathname
      })
   }


  return (
   
      <div className='flex items-center justify-between p-3 bg-neutral-600 rounded-2xl' >
      <div className='flex items-center gap-4' >
      <Image
      src={userImage}
      alt="userImage"
      className='rounded-full'
      height={30}
      width={30}
      />
      <p>{comment}</p>
      </div>
      { session?.user?.id===author && <button onClick={delComment} >
        <Image
        src="/trash-icon.svg"
        alt="delete icon"
        height={20}
        width={20}
        />
       </button>}
      </div>
      
  )
}

export default CommentCard