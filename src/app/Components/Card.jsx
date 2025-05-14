import React from 'react'

export default function Card({titulo, precio}) {
    return (
        <div className='group h-full'>
            <div className='group-hover:scale-110 group-hover:duration-300 animate-zoom-in flex relative flex-col gap-y-4 justify-center h-full bg-white rounded-lg shadow-lg p-4 pb-10 w-full'>
                <div className='h-32 w-32 bg-red-200 rounded-xl shadow-2xl mx-auto'></div>
                <p className='uppercase tracking-wide font-semibold text-xl'>{titulo}</p>
                <p className='text-center tracking-widest absolute bottom-2 font-semibold text-xl'>${precio}</p>
            </div>
        </div>
  )
}
