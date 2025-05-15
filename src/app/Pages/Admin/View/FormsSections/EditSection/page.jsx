"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/Libs/firebase'; // Asegúrate que esta ruta sea correcta para tu configuración de Firebase
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm();

    const onSubmit = () => {
        alert("alerta de prueba")
    }

    const handleLogout = () => {
        router.push("/pages/Admin/View")
    }

    // racha

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <button 
                onClick={handleLogout}
                className='text-white fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                VOLVER ATRAS
            </button>

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12'
            >
                <p className='uppercase font-bold text-3xl text-center mb-8'>Edicion de secciones</p>

                {/* Seleccionar la sección */}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Seccion ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Seleccione la sección</label>
                    {/* Mostrar el array y poder seleccionar uno */}
                </div>

                {/* Nombre del nuevo producto */}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Producto ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Nuevo nombre</label>
                    <input
                        {...register("Producto", { required: "El nombre del producto es requerido!" })}
                        type="text" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Nuevo nombre de seccion!'
                        autoComplete='off'
                    />
                    {errors.Producto && (
                        <span className='text-red-500'>{errors.Producto.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full uppercase font-semibold tracking-wider bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Añadir producto
                    {/* racha */}
                </button>
            </form>
        </div>
    )
}
