"use client";

import React, { useState } from 'react';
import icon from '../../Images/icono_shop_2.webp'
import Image from 'next/image';

export default function Page() {
    
    // Estado para controlar la vista del formulario
    const [viewForm, setViewForm] = useState(true);

    const handleGoToRegister = () => {
        setViewForm(false);
    };

    const handleGoToLogin = () => {
        setViewForm(true);
    };

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div>
                <div className={`flex items-center justify-center gap-2 w-screen ${viewForm ? "block" : "hidden"}`}>

                    {/* contenedor de formulario de inicio de sesión */}
                    <form className='flex py-6 flex-col justify-center items-center bg-gray-800 rounded-lg shadow-lg w-2/4'>

                        {/* logo de formulario */}
                        <div className='flex items-center justify-center gap-2 w-full'>
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

                        {/* formulario de inicio de sesión */}
                        <div className='flex flex-col w-full items-center justify-center gap-4 p-4'>
                            <label htmlFor="" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Correo Electronico</label>
                            <input 
                                type="email" 
                                placeholder="Correo Electrónico" 
                                className='w-2/3 p-2 rounded-lg bg-gray-700 text-white' 
                            />

                            <label htmlFor="" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Contraseña" 
                                className='w-2/3 p-2 rounded-lg bg-gray-700 text-white' 
                            />

                            <button 
                                type="submit" 
                                className='bg-blue-500 tracking-wider font-semibold text-lg mt-8 w-1/3 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300'
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>

                 <div className={`flex items-center justify-center gap-2 w-screen ${viewForm ? "hidden" : "block"}`}>

                    {/* contenedor de formulario de registro de usuario */}
                    <form className='flex py-6 flex-col justify-center items-center bg-gray-800 rounded-lg shadow-lg w-2/4'>

                        {/* logo de formulario */}
                        <div className='flex items-center justify-center gap-2 w-full'>
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
                                    Al Registro!
                                </p>
                            </div>
                        </div>

                        {/* formulario de registro de cuenta */}
                        <div className='flex flex-col w-full items-center justify-center gap-4 p-4'>
                            <label htmlFor="" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Correo Electronico</label>
                                <input 
                                    type="email" 
                                    placeholder="Correo Electrónico" 
                                    className='w-2/3 p-2 rounded-lg bg-gray-700 text-white' 
                                />

                            <label htmlFor="" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Contraseña</label>
                                <input 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    className='w-2/3 p-2 rounded-lg bg-gray-700 text-white' 
                                />

                            {/* <label htmlFor="" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Contraseña</label>
                                <input 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    className='w-2/3 p-2 rounded-lg bg-gray-700 text-white' 
                                /> */}

                            <button 
                                type="submit" 
                                className='bg-blue-500 tracking-wider font-semibold text-lg mt-8 w-1/3 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300'
                            >
                                Registrar Cuenta
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center mt-6">
                    <button 
                        className={`bg-red-500 rounded-lg py-2 px-4 ${viewForm ? "block" : "hidden"} text-white text-lg font-semibold hover:cursor-pointer transition-all duration-300 hover:bg-red-600`} 
                        onClick={handleGoToRegister}
                    >
                        Ir al Registro
                    </button>
                    <button 
                        className={`bg-green-500 rounded-lg py-2 px-4 ${viewForm ? "hidden" : "block"} text-white text-xl font-semibold hover:cursor-pointer transition-all duration-300 hover:bg-green-600`} 
                        onClick={handleGoToLogin}
                    >
                        Ir a Iniciar Sesión
                    </button>
                </div>

            </div>
        </div>
    )
}