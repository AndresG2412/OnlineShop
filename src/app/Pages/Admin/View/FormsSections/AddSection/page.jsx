"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/Libs/firebase'; // Asegúrate de importar tu instancia de Firebase
import { addDoc, collection } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

export default function page() {

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm();
  
    const formatName = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
            .trim();
    };
  
    const createCollection = async (data) => {
    const collectionName = formatName(data.Seccion);
      
        try {
            // Creamos un documento inicial en la nueva colección
            await addDoc(collection(db, collectionName), {
            });
  
            toast.success(`Colección "${collectionName}" creada exitosamente!`, {
            duration: 4000,
            position: 'top-center'
            });
            reset();
        } catch (error) {
            toast.error(`Error al crear colección: ${error.message}`, {
            duration: 5000,
            position: 'top-center'
            });
            console.error("Error en createCollection:", error);
        }
    };
  
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <form 
            onSubmit={handleSubmit(createCollection)}
                className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12'>

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
                            {...register("Precio", { required: "El precio es requerido!" })}
                            type="number" 
                            className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                            placeholder='Nuevo Precio!'
                            autoComplete='off'
                        />
                            
                        {errors.Precio && (
                            <span className='text-red-500'>{errors.Precio.message}</span>
                        )}
                    </div>

                    <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Imagen ? "mb-2" : "mb-4"}`}>
                        <label className="font-semibold text-xl text-gray-800">Imagen</label>
                        <input
                            {...register("Imagen", { required: "La imagen es requerida!" })}
                            type="image" 
                            className='w-full h-8 bg-white rounded-lg'
                        />
                            
                        {errors.Imagen && (
                            <span className='text-red-500'>{errors.Imagen.message}</span>
                        )}
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
};
