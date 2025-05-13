import React from 'react'

export default function Section({nombre}) {
  return (
      <div className='w-full flex items-center justify-center mb-6'>
          <div className='border-2 border-white w-full'></div>
          <p className='mx-4 tracking-widest font-bold uppercase text-4xl text-white'>{nombre}</p>
          <div className='border-2 border-white w-full'></div>
      </div>
  )
}
