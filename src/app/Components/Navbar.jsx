import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import user from '../Images/user.png'
import logo from '../Images/Logo2.webp'

export default function Navbar() {
  return (
    <div className='h-16 w-screen bg-transparent shadow-2xl fixed flex justify-center items-center border-b-4 border-[#222]'>
      <Image src={logo} className='hidden h-12 w-auto mx-4 hover:scale-110 hover:transition-all' alt="logo_main"/>

      <div className='flex gap-10 mr-12'>
        <Link className='uppercase text-white font-bold text-xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="/">Productos</Link>
        {/* <Link className='uppercase text-white font-bold text-xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="../Pages/Promociones">Promociones</Link> */}
        <Link className='uppercase text-white font-bold text-xl tracking-widest hover:duration-300 hover:scale-110 hover:transition-all' href="../Pages/Carrito">Carrito</Link>
      </div>

      <Image src={user} className='hidden h-10 w-10 mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>
    </div>
  )
}
