"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ROUTES } from '@/routes';

export default function Navbar() {
  
  return (
    <div className='h-16 w-full bg-[#111] shadow-1 fixed top-0 left-0 flex justify-between items-center border-b-[1px] border-[#fff] z-50 backdrop-blur-sm'>
      <Link href={ROUTES.ADMIN}>
        <Image 
        Width={40}
          height={40}
          src="https://cdn-icons-png.flaticon.com/128/18921/18921642.png" className='invert mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>
      </Link>

      <div className='flex mr-8 gap-x-8'>
        <div className='flex items-center gap-x-2 hover:duration-300 hover:scale-110 hover:transition-all'>
          <Link className='uppercase text-white font-bold text-2xl tracking-widest' href={ROUTES.HOME}>Productos</Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="invert transform scale-125 size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>
        </div>
        <div className='flex items-center gap-x-2 hover:duration-300 hover:scale-110 hover:transition-all'>
          <Link className='uppercase text-white font-bold text-2xl tracking-widest' href={ROUTES.CART}>Carrito</Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 invert transform scale-125">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
      </div>

    </div>
  )
}
