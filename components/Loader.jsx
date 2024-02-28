import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className='w-full flex justify-center items-center'>
    <Image
      src='/loader.svg'
      width={50}
      height={50}
      alt='loader'
      className='object-contain'
    />
  </div>
  )
}

export default Loader