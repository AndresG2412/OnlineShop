import React from 'react'

export default function Products({nombre}) {
  return (
    <div>
        <div className='w-screen flex items-center justify-center px-12'>
            <div className='border-2 border-white w-full'></div>
            <p className='mx-4 tracking-widest font-semibold text-2xl text-white'>{nombre}</p>
            <div className='border-2 border-white w-full'></div>
        </div>
    </div>
  )
}
