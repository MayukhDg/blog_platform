"use client";

import UpdateForm from "@/components/UpdateForm";
import { fetchBlog } from "@/lib/actions/blog.actions";

const page = async({params}) => {
   
  const blog = await fetchBlog(params.id);

  
    return (
        <section className='h-screen w-screen flex items-center justify-center  form__wrapper' >
         <UpdateForm title={blog.title} content={blog.content} blogId={blog._id} />
       </section>
  )
}

export default page