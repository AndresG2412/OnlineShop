import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import user from '../Images/user.png'
import logo from '../Images/Logo2.webp'

export default function Navbar() {
  return (
    <div className='h-16 w-full bg-transparent shadow-1 fixed top-0 left-0 flex justify-center items-center border-b-[1px] border-[#fff] z-50 backdrop-blur-sm'>
      <Image src={logo} className='hidden h-12 w-auto mx-4 hover:scale-110 hover:transition-all' alt="logo_main"/>

      <div className='flex gap-20 mr-12'>
        <Link className='uppercase text-white font-bold text-2xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="/">Productos</Link>
        {/* <Link className='uppercase text-white font-bold text-xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="../Pages/Promociones">Promociones</Link> */}
        <Link className='uppercase text-white font-bold text-2xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="../Pages/Carrito">Carrito</Link>
      </div>

      <Image src={user} className='hidden h-10 w-10 mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>
    </div>
  )
}
