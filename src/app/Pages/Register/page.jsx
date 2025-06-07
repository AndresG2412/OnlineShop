"use client";

import React, { useState } from 'react';

export default function Page() {
    // Es buena práctica usar booleanos para estados de visibilidad si solo hay dos opciones.
    // Inicializamos en 'true' para que el formulario de "Crear Cuenta" sea visible al inicio.
    const [viewForm, setViewForm] = useState(true);

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            {/* el contenedor del todo */}
            <div className='bg-white w-[45%] h-[35%] relative'>
                <div className={`absolute h-full w-[40%] bg-gradient-to-r from-blue-400 to-green-400 ${viewForm ? "z-1 right-0" : "z-1 left-0"}`}>

                </div>

                {/* Formulario Crear Cuenta */}
                <form className={`absolute top-4 left-5 flex flex-col gap-y-4 border-2 border-gray-900 p-4 rounded-lg shadow-lg w-96 ${viewForm ? "block" : "hidden"}`}>
                    <p className='text-center font-bold text-3xl tracking-wider'>Crear Cuenta</p>
                    <div className='flex justify-between items-center gap-x-4'>
                        <label htmlFor="email-create">Correo Electronico:</label>
                        <input type="email" id="email-create" placeholder='example@gmail.com' required className='border p-1 rounded'/>
                    </div>

                    <div className='flex justify-between items-center gap-x-4'>
                        <label htmlFor="password-create">Contraseña:</label>
                        <input type="password" id="password-create" placeholder='Example Password' required className='border p-1 rounded'/>
                    </div>

                    <button className='bg-blue-400 py-2 px-4 rounded-lg text-white font-bold hover:bg-blue-500 transition-colors'>Registrar</button>
                </form>

                {/* Formulario Iniciar Sesión */}
                <form className={`absolute top-4 right-5 flex flex-col gap-y-4 border-2 border-gray-900 p-4 rounded-lg shadow-lg w-96 ${!viewForm ? "block" : "hidden"}`}>
                    <p className='text-center font-bold text-3xl tracking-wider'>Iniciar Sesión</p>
                    <div className='flex justify-between items-center gap-x-4'>
                        <label htmlFor="email-login">Correo Electronico:</label>
                        <input type="email" id="email-login" placeholder='example@gmail.com' required className='border p-1 rounded'/>
                    </div>

                    <div className='flex justify-between items-center gap-x-4'>
                        <label htmlFor="password-login">Contraseña:</label>
                        <input type="password" id="password-login" placeholder='Example Password' required className='border p-1 rounded'/>
                    </div>

                    <button className='bg-green-400 py-2 px-4 rounded-lg text-white font-bold hover:bg-green-500 transition-colors'>Iniciar Sesión</button>
                </form>
            </div>

            {/* Botones para cambiar entre formularios */}
            
            {/* Enlace para cambiar a Iniciar Sesión (oculto si viewForm es true) */}
            <a className={`${viewForm ? "block" : "hidden"} z-2 text-white font-bold text-lg tracking-wider w-1/2 mx-auto hover:text-red-600 hover:cursor-pointer p-2 mt-4 rounded-lg text-center`} onClick={() => setViewForm(false)}>
                ¿Ya tienes cuenta? Iniciar Sesión
            </a>

            {/* Enlace para cambiar a Crear Cuenta (oculto si viewForm es false) */}
            <a className={`${!viewForm ? "block" : "hidden"} z-2 text-white font-bold text-lg tracking-wider w-1/2 mx-auto hover:text-red-600 hover:cursor-pointer p-2 mt-4 rounded-lg text-center`} onClick={() => setViewForm(true)}>
                ¿No tienes cuenta? Crear Cuenta
            </a>

            {/* racha */}
            {/* debo usar el formulario ya creado */}
        </div>
    )
}