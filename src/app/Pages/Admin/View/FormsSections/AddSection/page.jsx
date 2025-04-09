"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/Libs/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm();

    const createCollection = async (data) => {
        try {
            // Crear la estructura en Firestore
            const productoRef = doc(
                collection(
                    doc(collection(db, "Tienda"), "Productos"), 
                    data.Seccion
                ), 
                data.Producto
            );
            
            await setDoc(productoRef, {
                Precio: Number(data.Precio),
                Imagen: data.Imagen?.[0]?.name || "Sin imagen" // Opcional
            });

            toast.success("Producto creado exitosamente!");
            reset();
        } catch (error) {
            console.error("Error al crear el producto:", error);
            toast.error("Error al crear el producto");
        }
    };

    const handleLogout = () => {
        router.push("/Pages/Admin/View")
    }
  
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <button 
                onClick={handleLogout}
                className='text-white fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                VOLVER ATRAS
            </button>

            <Toaster />
            <form 
                onSubmit={handleSubmit(createCollection)}
                className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12'
            >
                <p className='uppercase font-bold text-3xl text-center mb-8'>Crear nueva seccion</p>

                {/* Coleccion 1 */}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Seccion ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Nombre de la seccion</label>
                    <input
                        {...register("Seccion", { required: "El nombre de la seccion es requerido!" })}
                        type="text" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Nueva seccion!'
                        autoComplete='off'
                    />
                        
                    {errors.Seccion && (
                        <span className='text-red-500'>{errors.Seccion.message}</span>
                    )}
                </div>

                {/* Documento 1 */}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Producto ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Nombre del Producto</label>
                    <input
                        {...register("Producto", { required: "El nombre del Producto es requerido!" })}
                        type="text" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Nuevo Producto!'
                        autoComplete='off'
                    />
                        
                    {errors.Producto && (
                        <span className='text-red-500'>{errors.Producto.message}</span>
                    )}
                </div>

                {/* Caracteristicas Producto*/}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Precio ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Precio</label>
                    <input
                        {...register("Precio", { 
                            required: "El precio es requerido!",
                            min: { value: 0, message: "El precio no puede ser negativo" }
                        })}
                        type="number" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Nuevo Precio!'
                        autoComplete='off'
                        step="0.01"
                    />
                        
                    {errors.Precio && (
                        <span className='text-red-500'>{errors.Precio.message}</span>
                    )}
                </div>

                {/* Imagen (opcional) */}
                <div className='mx-auto w-3/4 flex mb-4 flex-col gap-2'>
                    <label className="font-semibold text-xl text-gray-800">Imagen (opcional)</label>
                    <input
                        {...register("Imagen")}
                        type="file" 
                        className='w-full h-8 bg-white rounded-lg'
                        accept="image/*"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-8 w-full uppercase font-semibold tracking-wider bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Crear Seccion
                </button>
            </form>
        </div>
    );
}