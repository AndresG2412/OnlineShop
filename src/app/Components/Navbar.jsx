import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='h-16 w-screen bg-gray-200 shadow-2xl fixed border-b-[#222]'>
      <Link href="/">Productos</Link>
      <Link href="../Pages/Promociones">Promociones</Link>
      <Link href="../Pages/Carrito">Carrito</Link>
    </div>
  )
}
