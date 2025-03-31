"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'

import { ROUTES } from '@/routes';
import { IMAGESNAV } from '../../../public/images';

export default function Navbar() {
  
  return (
    <div className='h-16 w-full bg-transparent shadow-1 fixed top-0 left-0 flex justify-between items-center border-b-[1px] border-[#fff] z-50 backdrop-blur-sm'>
      <Link href={ROUTES.ADMIN}>
        <Image 
          width={40}
          height={40}
          src={IMAGESNAV.USER} className='mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>
      </Link>

      <div className='flex mr-8 gap-x-8'>
        <div className='flex items-center gap-x-4 hover:duration-300 hover:scale-110 hover:transition-all'>
          <Link className='uppercase text-white font-bold text-2xl tracking-widest' href={ROUTES.HOME}>Productos</Link>
          <Image
            src={IMAGESNAV.MAIN}
            alt="Main_icon"
            width={30}
            height={30}
            className=""
          />
        </div>
        <div className='flex items-center gap-x-4 hover:duration-300 hover:scale-110 hover:transition-all'>
          <Link className='uppercase text-white font-bold text-2xl tracking-widest' href={ROUTES.CART}>Carrito</Link>
          <Image
            src={IMAGESNAV.CAR}
            alt="Car_icon"
            width={30}
            height={30}
            className=""
          />
        </div>
      </div>

    </div>
  )
}
