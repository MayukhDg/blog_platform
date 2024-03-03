import BlogCard from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { fetchUserBlogs } from '@/lib/actions/blog.actions';
import { fetchUser } from '@/lib/actions/user.actions';




 async function Page({params}){
  
  const user = await fetchUser(params.id)
  
  if(!user) return;  
  
  const posts = await fetchUserBlogs();
  
  const UserBlogs = posts.filter((post)=>{
    return (
     post.author === params.id
    )
  })  
    
 

    if(!posts){
      return <Loader/>
    }
    
  
    return (
    <>
    <section className='flex flex-wrap w-screen gap-3 p-3 m-auto'>
      { UserBlogs.map((post)=>(
        <BlogCard
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          author={post.author}
          comments={post.comments}
        />
      )) }
    </section>
    </>
  )
}

export default Page