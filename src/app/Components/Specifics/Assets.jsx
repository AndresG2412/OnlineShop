import React from 'react'
import Busqueda from './Busqueda'

import Link from 'next/link'
import { ROUTES } from '@/routes';
import toast from 'react-hot-toast';

export default function Assets() {

    const aviso = () => {
        toast.error('Esta sección está en desarrollo, pronto estará disponible.', {
            duration: 3000,
            position: 'top-center',
            style: {
                background: '#111',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
            },
            iconTheme: {
                primary: '#ff0000',
                secondary: '#fff',
            },
        });
  }

    return (
        <div className='w-3/4 flex justify-center items-center gap-x-7 mb-8'>
            {/* <Link href={ROUTES.ADMIN}>
                <div className='group hover:scale-125 hover:cursor-pointer transition-all duration-300 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 invert scale-150">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                </div>
            </Link> */}
            <button onClick={aviso} className='relative'>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-45 z-10'/>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-135 z-10'/>
                <p className='group'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 size-6 z-1 invert scale-150">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                </p>
            </button>

            {/* <Link href={ROUTES.LIKE}>
                <button className='group hover:scale-125 hover:cursor-pointer transition-all duration-300 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 invert scale-150">
                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                    </svg>
                </button>
            </Link> */}
            <button onClick={aviso} className='relative'>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-45 z-10'/>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-135 z-10'/>
                <p className='group'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 size-6 invert scale-150">
                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                    </svg>
                </p>
            </button>
            
            <Busqueda />

            {/* <Link href={ROUTES.CAR}>
                <button className='group hover:scale-125 hover:cursor-pointer transition-all duration-300 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 invert scale-150">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                </button>
            </Link> */}
            <button onClick={aviso} className='relative'>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-45 z-10'/>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-135 z-10'/>
                <p className='group'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 size-6 invert scale-150">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                </p>
            </button>

            {/* <Link href={ROUTES.PROM}>
                <button className='group hover:scale-125 hover:cursor-pointer transition-all duration-300 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 invert scale-150">
                        <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                    </svg>
                </button>
            </Link> */}
            <button onClick={aviso} className='relative'>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-45 z-10'/>
                <hr className='absolute w-full border-2 border-white top-[45%] rotate-135 z-10'/>
                <p className='group'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300 size-6 invert scale-150">
                        <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                    </svg>
                </p>
            </button>
        </div>
    )
}
