import React from 'react';
import Posts from '@/components/Posts';


const Home = () => {
  return (
    <section id="home" className=' h-screen relative  w-screen overflow-hidden'>
    <div className='w-full bg-bg-image-1  min-h-full bg-cover bg-no-repeat -z-30 absolute inset-0' />
    <Posts/>
    </section>
  )
}

export default Home