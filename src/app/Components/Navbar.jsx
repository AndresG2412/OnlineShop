"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import user from '../Images/user.png'
import search from '../Images/search.webp'
import { useState, useEffect } from 'react'

import main from '../Images/main.webp'
import car from '../Images/car.webp'

export default function Navbar() {
  
  return (
    <div className='h-16 w-full bg-transparent shadow-1 fixed top-0 left-0 flex justify-between items-center border-b-[1px] border-[#fff] z-50 backdrop-blur-sm'>
      <Image src={user} className='h-10 w-10 mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>

      <div className='flex mr-8 gap-x-8'>
        <div className='flex items-center gap-x-4 hover:duration-300 hover:scale-110 hover:transition-all'>
          <Link className='uppercase text-white font-bold text-2xl tracking-widest' href="/">Productos</Link>
          <Image
            src={main}
            alt="Main_icon"
            width={30}
            height={30}
            className=""
          />
        </div>
        <div className='flex items-center gap-x-4 hover:duration-300 hover:scale-110 hover:transition-all'>
          <Link className='uppercase text-white font-bold text-2xl tracking-widest' href="../Pages/Carrito">Carrito</Link>
          <Image
            src={car}
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
