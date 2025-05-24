"use client";

import React, { useState, useEffect } from 'react'; // Añadido useState y useEffect
import { useForm } from 'react-hook-form';
import { db } from '@/Libs/firebase';
// Importaciones necesarias de Firestore
import { 
    doc, 
    getDoc,
    setDoc,
    updateDoc, 
    collection, 
    getDocs, 
    writeBatch 
} from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function page() {


    const router = useRouter();
    const [secciones, setSecciones] = useState([]); // Para la lista del dropdown
    const [isLoading, setIsLoading] = useState(false); // Para el estado de carga del submit
    const [isFetchingSecciones, setIsFetchingSecciones] = useState(true); // Para el estado de carga del select
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm();

    // Cargar secciones para el dropdown al montar el componente
    useEffect(() => {
        const fetchSeccionesList = async () => {
            setIsFetchingSecciones(true);
            try {
                const tiendaProductosRef = doc(db, "Tienda", "Productos");
                const docSnap = await getDoc(tiendaProductosRef);
                if (docSnap.exists() && Array.isArray(docSnap.data().Secciones)) {
                    // Ordenar alfabéticamente para una mejor UX en el select
                    setSecciones(docSnap.data().Secciones.sort()); 
                } else {
                    setSecciones([]);
                    // Opcional: notificar si no se encuentra la estructura esperada
                    // toast.info("No hay secciones definidas o la estructura es incorrecta.");
                }
            } catch (error) {
                console.error("Error al cargar la lista de secciones:", error);
                toast.error("No se pudieron cargar las secciones para editar.");
                setSecciones([]);
            } finally {
                setIsFetchingSecciones(false);
            }
        };
        fetchSeccionesList();
    }, []);

    const handleLogout = () => {
        router.push("/pages/Admin/View"); // Ajusta esta ruta si es necesario
    };

    // Función 1: Agregar el producto en su colección específica
    const addProductInSection = async (data) => {
        const seccion = data.sectionToAdd.trim(); // Sección a la que se va a agregar el producto
        const producto = data.Producto.trim(); // ID del documento
        const precio = data.Precio.trim(); // Precio del producto

        if (!seccion || !precio || !producto) {
            toast.error("Los campos deben estar llenos.");
            throw new Error("Los campos no pueden estar vacíos.");
        }

        const productoRef = doc(db, seccion, producto);
        await setDoc(productoRef, {
            Precio: Number(data.Precio),
            Imagen: data.Imagen?.[0]?.name || "Sin imagen" 
        });
    };

    const handleEditSubmit = async (data) => {
        let productAddSuccessfully = false;
        
        try {
            // Intenta crear el producto en su colección
            await addProductInSection(data);
            toast.success(`¡Producto "${data.Producto}" creado en la sección "${data.sectionToAdd}" exitosamente!`);
            productAddSuccessfully = true;
        } catch (error) {
            console.error("Error en createProductInSection:", error.message);
            // El toast de error ya se maneja dentro de createProductInSection si es un error de campos vacíos,
            // o aquí si es otro tipo de error.
            if (error.message !== "El nombre de la sección y del producto no pueden estar vacíos.") {
                 toast.error(`Error al crear el producto: ${error.message}`);
            }
        }
        
        if (productAddSuccessfully) {
            reset(); // Resetea los campos del formulario si el producto principal se creó
        }
    }
        
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Toaster position="top-center" /> {/* Toaster para notificaciones */}
            <button 
                onClick={handleLogout}
                className='text-white fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                VOLVER ATRAS
            </button>

            {/* al dar click en el boton de agregar producto, se debe agregar a la base de datos, tanto a la coleccion como al array */}

            <form 
                onSubmit={handleSubmit(handleEditSubmit)} // Cambiado al nuevo manejador
                className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12'
            >

                <p className='uppercase font-bold text-3xl text-center mb-8'>Añadir un Producto</p>

                {/* Seleccionar la sección */}
                <div className={`mx-auto w-3/4 flex flex-col gap-2 mb-6 ${errors.sectionToEdit ? "mb-4" : "mb-6"}`}>
                    <label htmlFor="sectionToEdit" className="font-semibold text-xl text-gray-800">Seleccione la sección</label>
                    {isFetchingSecciones ? (
                        <p className="text-gray-600">Cargando secciones...</p>
                    ) : (
                        <select
                            id="sectionToEdit"
                            name="secciones"
                            className='bg-white'
                            {...register("sectionToAdd", { required: "Debe seleccionar una sección." })}
                        >
                            {secciones.map(seccion => (
                                <option key={seccion} value={seccion}>{seccion}</option>
                            ))}
                        </select>
                    )}
                    {errors.sectionToEdit && (
                        <span className='text-red-500'>{errors.sectionToEdit.message}</span>
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
                    Agregar Producto
                </button>
            </form>
        </div>
    )
}
