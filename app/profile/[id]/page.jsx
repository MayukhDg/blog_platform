import BlogCard from '@/components/BlogCard';
import Loader from '@/components/Loader';
import { fetchUserBlogs } from '@/lib/actions/blog.actions';
import { fetchUser } from '@/lib/actions/user.actions';




 async function Page({params}){
  
  const user = await fetchUser(params.id)
  
  if(!user) return null;  
  
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
    <div className='flex flex-col px-3 py-6 relative' >
    <div className="h-screen w-screen bg-[url('/hero_2.jpg')] absolute top-0 bg-cover -z-30 blur-xl"  />
    <h1 className="md:text-4xl text-2xl bg-gradient-to-r text-amber-950 font-extrabold  ">{user?.name}'s profile</h1>
    <div className='flex flex-wrap w-screen gap-5 m-auto  mt-3'>
    { UserBlogs.map((post)=>(
        <BlogCard
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          author={params.id}
          comments={post.comments}
        />
      )) } 
    </div>
    </div>
    </>
  )
}

export default Page