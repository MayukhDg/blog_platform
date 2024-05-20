"use client";

import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';


const Navbar = () => {
  
  const  { data: session } = useSession();
 

  return (
    <nav className='flex justify-between items-center px-5 pt-3 pb-5  shadow overflow-x-hidden '>
   <Link href={"/"}>
   <Image
     src={"/logo2.png"}
     height={50}
    width={50}
    alt="logo"
    className='rounded-e-3xl'
      />
   </Link>
    { !session?.user?.email ?  
    <button onClick={()=>signIn("google")}className='outline-none px-4 py-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold '  >Sign In</button>: 
    
    <div className='md:flex hidden gap-3 items-center flex-1 justify-end'>
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
 { session?.user?.email && <MobileMenu session={session}/>}
      
      </nav>
  )
}

export default Navbar