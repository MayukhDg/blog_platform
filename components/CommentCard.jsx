"use client";

import React from 'react';
import { deleteComment, fetchComment } from '@/lib/actions/comment.actions';

const CommentCard = ({id, pathname, comment, author,  blogId}) => {
  
   const delComment = async(e)=>{
    e.preventDefault();  
    await deleteComment({
        commentId:id, blogId, pathname
      })
   }


  return (
    <div className='flex flex-col w-full p-3 gap-2' >
      <div className='flex items-center justify-between' >
       <p>{comment}</p>
       <button onClick={delComment} >Delete Comment</button>
      </div>
      </div>
  )
}

export default CommentCard