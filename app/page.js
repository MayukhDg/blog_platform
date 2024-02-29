"use client"

import { useSession } from "next-auth/react"
import Link from "next/link";


const Home = () => {
  
 const { data:session } = useSession();

 return (
    <section id="home" className=' h-screen relative  w-screen overflow-hidden'>
    <div className='w-full bg-bg-image-1  min-h-full bg-cover bg-no-repeat -z-30 absolute inset-0' />
    { session?.user?.id ? 
    <div className="flex flex-col ml-4 mt-4 w-full items-center" >
      <h1 className="text-4xl text-white font-bold" > Welcome {session?.user?.name}</h1>
      <Link href="/create-post" >
    <button className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl mt-3 text-white font-bold ' >Create Post</button>
  </Link>
    </div>
    :
    <div className="flex flex-col ml-4 mt-4" >
      <h1 className="text-4xl text-white font-bold" >Welcome to Blogger</h1>
    </div>
    }
    </section>
  )
}

export default Home