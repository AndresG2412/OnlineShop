import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import user from '../Images/user.png'
import logo from '../Images/Logo2.webp'

export default function Navbar() {
  return (
    <div className='h-16 w-screen bg-gray-200 shadow-2xl fixed border-b-[#222] flex justify-between items-center'>
      <Image src={logo} className='h-12 w-auto mx-4 hover:scale-110 hover:transition-all' alt="logo_main"/>

      <div className='flex gap-10'>
        <Link className='uppercase font-semibold text-xl tracking-wide hover:scale-110 hover:transition-all' href="/">Productos</Link>
        <Link className='uppercase font-semibold text-xl tracking-wide hover:scale-110 hover:transition-all' href="../Pages/Promociones">Promociones</Link>
        <Link className='uppercase font-semibold text-xl tracking-wide hover:scale-110 hover:transition-all' href="../Pages/Carrito">Carrito</Link>
      </div>

      <Image src={user} className='h-12 w-12 mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>
    </div>
  )
}
