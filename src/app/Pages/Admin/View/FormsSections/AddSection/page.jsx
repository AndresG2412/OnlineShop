"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/Libs/firebase'; // Asegúrate que esta ruta sea correcta para tu configuración de Firebase
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
// Importaciones de Firestore actualizadas
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'; 

export default function Page() {

    const router = useRouter();
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm();

    // Función 1: Crear el producto en su colección específica (nombreDeSeccion/nombreDeProducto)
    const createProductInSection = async (data) => {
        const seccion = data.Seccion.trim(); // Nombre de la colección
        const producto = data.Producto.trim(); // ID del documento

        if (!seccion || !producto) {
            toast.error("El nombre de la sección y del producto no pueden estar vacíos.");
            throw new Error("El nombre de la sección y del producto no pueden estar vacíos.");
        }

        const productoRef = doc(db, seccion, producto);
        await setDoc(productoRef, {
            Precio: Number(data.Precio),
            Imagen: data.Imagen?.[0]?.name || "Sin imagen" 
        });
    };

    // Función 2: Añadir el nombre de la sección al array "Secciones" en "Tienda/Productos"
    const addSectionToGlobalList = async (seccionName) => {
        const trimmedSeccionName = seccionName.trim();
        if (!trimmedSeccionName) {
            console.warn("Nombre de sección inválido para añadir a la lista global.");
            return; // No hacer nada si el nombre de la sección está vacío después de recortar espacios
        }

        const tiendaProductosRef = doc(db, "Tienda", "Productos"); // Ruta: /Tienda/Productos

        try {
            const docSnap = await getDoc(tiendaProductosRef);

            if (docSnap.exists()) {
                // El documento "Tienda/Productos" existe
                const currentData = docSnap.data();
                if (currentData && Array.isArray(currentData.Secciones)) {
                    // El campo "Secciones" existe y es un array, usamos arrayUnion
                    await updateDoc(tiendaProductosRef, {
                        Secciones: arrayUnion(trimmedSeccionName) // arrayUnion evita duplicados
                    });
                } else {
                    // El campo "Secciones" no existe o no es un array, lo creamos/reemplazamos
                    await updateDoc(tiendaProductosRef, { // O setDoc con { merge: true } si es preferible
                        Secciones: [trimmedSeccionName]
                    });
                    toast.warn(`Campo 'Secciones' en 'Tienda/Productos' inicializado/corregido con la nueva sección.`);
                }
            } else {
                // El documento "Tienda/Productos" no existe, lo creamos con el array "Secciones"
                await setDoc(tiendaProductosRef, {
                    Secciones: [trimmedSeccionName]
                });
                toast.info(`Documento 'Tienda/Productos' creado con la sección '${trimmedSeccionName}'.`);
            }
        } catch (error) {
            console.error("Error al actualizar la lista global de secciones:", error);
            // Re-lanzamos el error para que sea capturado por el manejador principal y muestre un toast de error.
            throw new Error("Error al actualizar la lista global de secciones."); 
        }
    };

    // Manejador principal del envío del formulario
    const funciones = async (data) => {
        let productCreatedSuccessfully = false;

        try {
            // Intenta crear el producto en su colección
            await createProductInSection(data);
            toast.success(`¡Producto "${data.Producto}" creado en la sección "${data.Seccion}" exitosamente!`);
            productCreatedSuccessfully = true;
        } catch (error) {
            console.error("Error en createProductInSection:", error.message);
            // El toast de error ya se maneja dentro de createProductInSection si es un error de campos vacíos,
            // o aquí si es otro tipo de error.
            if (error.message !== "El nombre de la sección y del producto no pueden estar vacíos.") {
                 toast.error(`Error al crear el producto: ${error.message}`);
            }
        }

        // Si el producto se creó (o al menos se intentó y el nombre de sección es válido),
        // intenta añadir la sección a la lista global.
        if (data.Seccion && data.Seccion.trim() !== "") {
            try {
                await addSectionToGlobalList(data.Seccion);
                toast.success(`Sección "${data.Seccion}" actualizada en la lista general 'Tienda/Productos'.`);
            } catch (error) {
                console.error("Error en addSectionToGlobalList:", error.message);
                toast.error(error.message || "Error al actualizar la lista de secciones.");
            }
        } else if (productCreatedSuccessfully) {
            // Si el producto se creó pero la sección estaba vacía para la lista global
            toast.warn("El nombre de la sección estaba vacío, no se añadió a la lista global.");
        }
        
        if (productCreatedSuccessfully) {
            reset(); // Resetea los campos del formulario si el producto principal se creó
        }
    };

    const handleLogout = () => {
        router.push("/pages/Admin/View"); 
    };
    
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <button 
                onClick={handleLogout}
                className='text-white fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                VOLVER ATRÁS
            </button>

            <Toaster />
            <form 
                onSubmit={handleSubmit(funciones)} 
                className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12'
            >
                <p className='uppercase font-bold text-3xl text-center mb-8'>Crear nueva sección</p>

                {/* Nombre de la sección */}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Seccion ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Nombre de la sección</label>
                    <input
                        {...register("Seccion", { required: "El nombre de la sección es requerido!" })}
                        type="text" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Nueva sección!'
                        autoComplete='off'
                    />
                    {errors.Seccion && (
                        <span className='text-red-500'>{errors.Seccion.message}</span>
                    )}
                </div>

                {/* Nombre del producto */}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Producto ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Nombre del producto</label>
                    <input
                        {...register("Producto", { required: "El nombre del producto es requerido!" })}
                        type="text" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Nuevo producto!'
                        autoComplete='off'
                    />
                    {errors.Producto && (
                        <span className='text-red-500'>{errors.Producto.message}</span>
                    )}
                </div>

                {/* Precio del producto */}
                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.Precio ? "mb-2" : "mb-4"}`}>
                    <label className="font-semibold text-xl text-gray-800">Precio</label>
                    <input
                        {...register("Precio", { 
                            required: "El precio es requerido!",
                            min: { value: 0, message: "El precio no puede ser negativo" }
                        })}
                        type="number" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Nuevo precio!'
                        autoComplete='off'
                        step="0.01"
                    />
                    {errors.Precio && (
                        <span className='text-red-500'>{errors.Precio.message}</span>
                    )}
                </div>

                {/* Imagen del producto (opcional) */}
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
                    Crear sección
                </button>
            </form>
        </div>
    );
}
