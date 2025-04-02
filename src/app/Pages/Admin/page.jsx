"use client"

import React from 'react'
import { useForm } from 'react-hook-form'

import logo from '../../Images/Logo2.webp'
import Image from 'next/image'

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data)

    return (
        <div className='h-screen flex items-center'>
            <div className="mx-auto w-1/2">
                <form
                    className="min-h-96 px-8 py-6 mt-4 text-left bg-gray-800 rounded-xl shadow-lg"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex flex-col items-center justify-center gap-2 mb-8">
                            <Image 
                                width={120}
                                height={120}
                                src={logo} className='mx-4 hover:scale-110 hover:transition-all' alt='user_logo'/>
                                <p className="m-0 text-3xl font-semibold dark:text-white">
                                Bienvenido de vuelta
                                </p>
                        </div>
                            <div className={`w-full flex flex-col gap-2 ${
                                   errors.Correo ? "mb-2" : " mb-4"
                                }`}>
                                <label className="font-semibold text-xl text-gray-400">Correo Electronico</label>
                                <input
                                    {...register("Correo", {
                                        required: true
                                    })}
                                    type="email" 
                                    className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                                    placeholder='Ingresa tu Correo Electronico'
                                    autoComplete='off'/>
                                    
                                {errors.Correo?.type === "required" && (
                                    <span className='text-red-500'>El correo es requerido!</span>
                                )}
                            </div>
                    </div>
                        <div className={`w-full flex flex-col gap-2 ${
                                   errors.Correo ? "mb-4" : " mb-8"
                                }`}>
                            <label className="font-semibold text-xl text-gray-400">Contraseña</label>
                            <input 
                                {...register("Contraseña", {
                                    required: true
                                })}
                                type="password" 
                                className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                                placeholder='Ingresa tu Contraseña'/>
                                
                                {errors.Correo?.type === "required" && (
                                    <span className='text-red-500'>La contraseña es requerida!</span>
                                )}
                        </div>
                    <div>
                        <button
                            className="tracking-wider py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none text-xl"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
