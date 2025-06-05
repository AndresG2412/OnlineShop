"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../images/CARO-SHOP1.webp'

import { ROUTES } from '@/routes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar principal */}
      <div className='h-16 w-full bg-[#111] shadow-1 fixed top-0 left-0 flex justify-between items-center border-b-[1px] border-[#fff] z-50 backdrop-blur-sm'>
        <Link href={ROUTES.ADMIN}>
          <Image 
            width={40}
            height={40}
            src="https://cdn-icons-png.flaticon.com/128/18921/18921642.png" 
            className='invert mx-4 hover:scale-110 hover:transition-all' 
            alt='user_logo'
          />
        </Link>

        <Link href={ROUTES.HOME}>
          <Image
            height={50}
            src={logo}
            className='hidden md:block'
            alt='logo'
          />
        </Link>

        {/* Botón hamburguesa*/}
        <button 
          onClick={toggleMenu}
          className='mr-4 p-2 focus:outline-none'
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            <span 
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`}
            />
            <span 
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span 
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1.5'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Overlay del menú móvil */}
      <div 
        className={`fixed inset-0 bg-opacity-50 z-40 transition-all duration-300 ease-in-out md:w-1/4 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      />

      {/* Menú móvil */}
      <div 
        className={`fixed top-0 right-0 h-full w-full bg-[#111] z-50 transform transition-all duration-500 ease-out md:w-1/4 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del menú móvil */}
        <div className="flex justify-between items-center h-16 px-4 border-b border-[#333]">
          <button 
            onClick={closeMenu}
            className="p-2 focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-white scale-150 absolute right-5 top-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del menú móvil */}
        <div className="flex flex-col items-center justify-center h-full space-y-12 pb-32">

          {/* Item Cuenta */}
          <div 
            className={`group flex flex-col items-center space-y-4 transform transition-all duration-700 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
          >
            <div className='flex items-center justify-center space-x-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="scale-125 text-white group-hover:text-purple-500 group-hover:duration-300 animate-bounce-alt">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <Link 
                className='uppercase text-white font-bold text-3xl tracking-widest group-hover:text-purple-500 group-hover:duration-300 transition-colors duration-300' 
                href={ROUTES.FORMS}
                onClick={closeMenu}
              >
                Cuenta
              </Link>
            </div>
          </div>

          {/* Item Productos */}
          <div 
            className={`group flex flex-col items-center space-y-4 transform transition-all duration-700 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
          >
            <div className='flex items-center justify-center space-x-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="scale-125 text-white group-hover:text-purple-500 group-hover:duration-300 animate-bounce-alt">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
              <Link 
                className='uppercase text-white font-bold text-3xl tracking-widest group-hover:text-purple-500 group-hover:duration-300 transition-colors duration-300' 
                href={ROUTES.HOME}
                onClick={closeMenu}
              >
                Productos
              </Link>
            </div>
          </div>

          {/* Item Favoritos */}
          <div 
            className={`group flex flex-col items-center space-y-4 transform transition-all duration-700 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
          >
            <div className='flex items-center justify-center space-x-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="scale-125 text-white group-hover:text-purple-500 group-hover:duration-300 animate-bounce-alt">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>

              <Link 
                className='uppercase text-white font-bold text-3xl tracking-widest group-hover:text-purple-500 group-hover:duration-300 transition-colors duration-300' 
                href={ROUTES.LIKE}
                onClick={closeMenu}
              >
                Favoritos
              </Link>
            </div>
          </div>

          {/* Item Carrito */}
          <div 
            className={`group flex flex-col items-center space-y-4 transform transition-all duration-700 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
          >
            <div className='flex items-center justify-center space-x-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="scale-125 text-white group-hover:text-purple-500 group-hover:duration-300 animate-bounce-alt">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <Link 
                className='uppercase text-white font-bold text-3xl tracking-widest group-hover:text-purple-500 group-hover:duration-300 transition-colors duration-300' 
                href={ROUTES.CAR}
                onClick={closeMenu}
              >
                Carrito
              </Link>
            </div>
          </div>

        {/* Item Ofertas */}
          <div 
            className={`group flex flex-col items-center space-y-4 transform transition-all duration-700 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
          >
            <div className='flex items-center justify-center space-x-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="scale-125 text-white group-hover:text-purple-500 group-hover:duration-300 animate-bounce-alt">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>

              <Link 
                className='uppercase text-white font-bold text-3xl tracking-widest group-hover:text-purple-500 group-hover:duration-300 transition-colors duration-300' 
                href={ROUTES.PROM}
                onClick={closeMenu}
              >
                Ofertas
              </Link>
            </div>
          </div>
        </div>

        {/* Footer del menú móvil */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-gray-400 text-sm">Toca la X para cerrar</p>
        </div>
      </div>
    </>
  )
}