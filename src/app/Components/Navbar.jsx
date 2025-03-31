"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import user from '../Images/user.png'
import search from '../Images/search.webp'
import { useState, useEffect } from 'react'

export default function Navbar() {
  
  return (
    <div className='h-16 w-full bg-transparent shadow-1 fixed top-0 left-0 flex justify-between items-center border-b-[1px] border-[#fff] z-50 backdrop-blur-sm'>
      <Image src={user} className='h-10 w-10 mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>

      <div className='w-full flex justify-center'>
        <input 
          type="text" 
          className='border-white border-2 w-2/3 text-white rounded-lg tracking-wider pl-4 py-1'
          placeholder='Busca cualquier articulo!'
        />
      </div>

      <div className='flex gap-20 mr-12'>
        <Link className='uppercase text-white font-bold text-2xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="/">Productos</Link>
        <Link className='uppercase text-white font-bold text-2xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="../Pages/Carrito">Carrito</Link>
      </div>

    </div>
  )
}
