"use client";

import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
  
  const  { data: session } = useSession();
 

  return (
    <nav className='flex justify-between items-center px-5 py-3 border-b-orange-200 box-shadow '>
   <Link href={"/"}>
   <Image
     src={"/logo2.png"}
     height={50}
    width={50}
    alt="logo"
    className='rounded-r-xl'
      />
   </Link>
    { !session?.user?.email ?  
    <button onClick={()=>signIn("google")}className='outline-none px-4 py-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold '  >Sign In</button>: 
    
    <div className='flex gap-3 items-center flex-1 justify-end'>
    <Link href="/create-post" >
    <button className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Create Post</button>
  </Link>
    <button onClick={() => signOut()} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Sign Out</button>
    <Link href={`/profile/${session?.user?.id}`}>
    <Image
     src={session?.user?.image}
     alt="profileimage"
     height={80}
     width={45}
     className='rounded-3xl object-contain'
    />
    </Link>
    </div>
     }
      
      </nav>
  )
}

export default Navbar