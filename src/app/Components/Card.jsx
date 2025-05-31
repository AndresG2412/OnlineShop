import React from 'react';
import Image from 'next/image';

export default function Card({ titulo, precio, imageLink }) {
    return (
        <div className='group h-full'>
            <div className='group-hover:scale-105 group-hover:duration-300 animate-zoom-in flex relative flex-col gap-y-4 justify-center h-full bg-white rounded-lg shadow-lg w-full py-4'>
                <div className='hover:animate-pulsing h-32 w-32 bg-red-200 rounded-xl shadow-2xl mx-auto'>
                    <Image
                        src={'https://res.cloudinary.com/duwosb0hu/image/upload/v1745037571/rata1_bblpf1.png'}
                        alt={titulo}
                        width={128}
                        height={128}
                        className='rounded-xl object-cover w-full h-full'/>
                </div>
                <p className='uppercase tracking-wide font-semibold text-xl px-6 overflow-hidden whitespace-nowrap text-ellipsis'>{titulo}</p>
                <hr className='mx-6 border-1 border-black'></hr>

                {/* celular */}
                <div className='md:hidden flex flex-col gap-y-3 items-center justify-between w-full px-6'>
                    <p className='tracking-wide md:tracking-widest font-semibold text-xl'>${precio}</p>
                    <div className='flex items-center gap-x-4'>
                        <button className='w-6 h-6 transform scale-125 flex items-center justify-center bg-[#53a7e7] rounded-sm hover:bg-[#00579b] hover:duration-200'>
                            <div className='hover:animate-tada w-full h-full flex items-center justify-center rounded-sm hover:invert hover:duration-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        </button>
                        <button className='w-6 h-6 transform scale-125 flex items-center justify-center bg-[#da2a2a] rounded-sm hover:bg-[#9b0000] hover:duration-200'>
                            <div className='hover:animate-tada w-full h-full flex items-center justify-center rounded-sm hover:invert hover:duration-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                {/* computador */}
                <div className='hidden md:flex items-center justify-between w-full px-6'>
                    <p className='tracking-wide md:tracking-widest font-semibold text-xl'>${precio}</p>
                    <div className='flex items-center gap-x-4'>
                        <button className='w-6 h-6 transform scale-125 flex items-center justify-center bg-[#53a7e7] rounded-sm hover:bg-[#00579b] hover:duration-200'>
                            <div className='hover:animate-tada w-full h-full flex items-center justify-center rounded-sm hover:invert hover:duration-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        </button>
                        <button className='w-6 h-6 transform scale-125 flex items-center justify-center bg-[#da2a2a] rounded-sm hover:bg-[#9b0000] hover:duration-200'>
                            <div className='hover:animate-tada w-full h-full flex items-center justify-center rounded-sm hover:invert hover:duration-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}