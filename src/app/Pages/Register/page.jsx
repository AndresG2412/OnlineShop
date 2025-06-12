"use client";

import React, { useState } from 'react';
import icon from '../../Images/icono_shop_2.webp'
import Image from 'next/image';

export default function Page() {
    
    // Estado para controlar la vista del formulario
    const [viewForm, setViewForm] = useState(true);

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div>
                <div className={`flex items-center justify-center gap-2 mb-8 w-full ${viewForm ? "block" : "hidden"}`}>
                    <Image 
                        width={100}
                        height={100}
                        src={icon} 
                        className='mx-4' 
                        alt='user_logo'
                        priority
                    />

                    <div className="">
                        <p className="m-0 text-2xl md:text-3xl tracking-widest uppercase font-semibold dark:text-white">
                            Bienvenido
                        </p>
                        <p className="m-0 text-4xl md:text-5xl tracking-wider uppercase font-semibold dark:text-white">
                            De vuelta!
                        </p>
                    </div>
                </div>

                <div className={`flex items-center justify-center gap-2 mb-8 w-full ${viewForm ? "hidden" : "block"}`}>
                    <Image 
                        width={100}
                        height={100}
                        src={icon} 
                        className='mx-4' 
                        alt='user_logo'
                        priority
                    />

                    <div className="">
                        <p className="m-0 text-2xl md:text-3xl tracking-widest uppercase font-semibold dark:text-white">
                            Iniciando
                        </p>
                        <p className="m-0 text-4xl md:text-5xl tracking-wider uppercase font-semibold dark:text-white">
                            Tu registro!
                        </p>
                    </div>
                </div>

                <div>
                    <button className={`${viewForm ? "block" : "hidden"} text-white font-xl hover:cursor-pointer`} onClick={}>Ir al Registro</button>
                    <button className={`${viewForm ? "hidden" : "block"} text-white font-xl hover:cursor-pointer`} onClick={}>Ir a Iniciar Seccion</button>
                </div>

            </div>
        </div>
    )
}