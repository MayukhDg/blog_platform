"use client";

import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
  
  const  { data: session } = useSession();
 

  return (
    <nav className='flex justify-between items-center p-3 '>
   <Link href={"/"}>
   <h3 className='text-2xl text-white' >Blogger</h3>
   </Link>
    { !session?.user?.email ?  
    <button onClick={()=>signIn("google")} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Sign In</button>: 
    
    <div className='flex gap-2 items-center flex-1 justify-end'>
    <Link href="/create-post" >
    <button className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Create Post</button>
  </Link>
    <button onClick={() => signOut()} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Sign Out</button>
    <Link href={`/profile/${session?.user?.id}`}>
    <Image
     src={session?.user?.image}
     alt="profileimage"
     height={50}
     width={30}
     className='rounded-3xl object-contain'
    />
    </Link>
    </div>
     }
      
      </nav>
  )
}

export default Navbar