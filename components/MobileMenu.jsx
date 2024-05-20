import { useState } from 'react'
import { Menu } from '@headlessui/react'
import Image from 'next/image'
import { signOut } from "next-auth/react"
import Link from "next/link"



function MobileMenu({session}) {
  
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <Menu as="div" className="md:hidden block">
      { !menuOpen && <Menu.Button>
        <Image
         src="/menu.png"
         height={50}
         width={50}
         alt="menu"
         onClick={()=>setMenuOpen(true)}
         className='object-contain'
        />
      </Menu.Button>}

      { menuOpen && <Menu.Button>
        <Image
         src="/cross.svg"
         height={50}
         width={50}
         alt="menu"
         onClick={()=>setMenuOpen(false)}
         className='object-contain'
        />
      </Menu.Button>}

      <Menu.Items as="div" className=" rounded-lg z-30 flex items-center flex-col p-3 absolute right-7 gap-5 bg-gray-300">
      <Menu.Item>
      <Link href={`/profile/${session?.user?.id}`}>
    <Image
     src={session?.user?.image}
     alt="profileimage"
     height={80}
     width={45}
     className='rounded-3xl object-contain'
    />
    </Link>
      </Menu.Item>
      <Menu.Item>
      <Link href="/create-post" >
    <button className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Create Post</button>
  </Link>
      </Menu.Item>
      <Menu.Item>
      <button onClick={() => signOut()} className='outline-none p-2 bg-slate-900 text-[20px] rounded-2xl text-white font-bold ' >Sign Out</button>
      </Menu.Item>
     
      </Menu.Items>
    </Menu>
  )
}

export default MobileMenu;