import React from 'react';

export default function Card({ titulo, precio }) {
    return (
        <div className='group h-full'>
            <div className='group-hover:scale-105 group-hover:duration-300 animate-zoom-in flex relative flex-col gap-y-4 justify-center h-full bg-white rounded-lg shadow-lg w-full py-4'>
                <div className='hover:animate-pulsing h-32 w-32 bg-red-200 rounded-xl shadow-2xl mx-auto'></div>
                <p className='uppercase tracking-wide font-semibold text-xl px-6 overflow-hidden whitespace-nowrap text-ellipsis'>{titulo}</p>
                <hr className='mx-6 border-1 border-black'></hr>
                <div className='flex items-center justify-between w-full px-6'>
                    <p className='tracking-widest font-semibold text-xl'>${precio}</p>
                    <button className='w-6 h-6 transform scale-125 flex items-center justify-center bg-[#53a7e7] rounded-sm hover:bg-[#00579b] hover:duration-200'>
                        <div className='hover:animate-tada w-full h-full flex items-center justify-center rounded-sm hover:invert hover:duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}