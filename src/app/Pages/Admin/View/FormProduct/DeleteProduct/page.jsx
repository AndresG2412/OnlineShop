"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/Libs/firebase';
import { 
    doc, 
    getDoc, 
    updateDoc, 
    collection, 
    getDocs, 
    deleteDoc 
} from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function page() {

    const router = useRouter();
    
    const [secciones, setSecciones] = useState([]); // Para la lista de secciones del dropdown
    const [productos, setProductos] = useState([]); // Para la lista de productos de la sección seleccionada
    const [isFetchingSecciones, setIsFetchingSecciones] = useState(true); // Para el estado de carga del select de secciones
    const [isFetchingProductos, setIsFetchingProductos] = useState(false); // Para el estado de carga del select de productos
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(''); // Estado para la sección actualmente seleccionada


    const { 
        register, 
        handleSubmit, 
        reset,
        watch,
        formState: { errors } 
    } = useForm({
        defaultValues: {
            section: ""
        }
    });

    // Observa el valor del campo 'sectionToAdd' del formulario
    const sectionToWatch = watch("sectionToAdd");

    // Cargar secciones para el dropdown al montar el componente
    useEffect(() => {
        const fetchSeccionesList = async () => {
            setIsFetchingSecciones(true);
            try {
                const tiendaProductosRef = doc(db, "Tienda", "Productos");
                const docSnap = await getDoc(tiendaProductosRef);
                if (docSnap.exists() && Array.isArray(docSnap.data().Secciones)) {
                    setSecciones(docSnap.data().Secciones.sort());
                } else {
                    setSecciones([]);
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

    // Nuevo useEffect para cargar productos cuando cambie la sección seleccionada
    useEffect(() => {}, []);

    const handleLogout = () => {
        router.push("/pages/Admin/View"); // Ajusta esta ruta si es necesario
    };

    const handleDeleteSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>

            {/* Delete product

            1. llamar las secciones de la tienda
            2. colocar las secciones en un array
            3. mostrar y poder seleccionar una seccion
            4. llamar los productos de la seccion seleccionada
            5. colocar los productos en un array
            6. mostrar y poder seleccionar un producto de dicha seccion
            7. eliminar el producto
            8. actualizar la seccion en la base de datos
            9. mostrar un mensaje de exito o error */}

            <Toaster position="top-center" /> {/* Toaster para notificaciones */}
            <button 
                onClick={handleLogout}
                className='text-white fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                VOLVER ATRAS
            </button>

            <form 
                onSubmit={handleSubmit(handleDeleteSubmit)} // Cambiado al nuevo manejador
                className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12'
            >
                <p className='uppercase font-bold text-3xl text-center mb-8'>Eliminación de productos</p>

                {/* Seleccionar la sección */}
                <div className={`mx-auto w-3/4 flex flex-col gap-2 mb-6 ${errors.sectionToAdd ? "mb-4" : "mb-6"}`}>
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
                            <option value="">-- Seleccione una sección --</option> {/* Opción por defecto */}
                            {secciones.map(seccion => (
                                <option key={seccion} value={seccion}>{seccion}</option>
                            ))}
                        </select>
                    )}
                    {errors.sectionToAdd && (
                        <span className='text-red-500'>{errors.sectionToAdd.message}</span>
                    )}
                </div>

                {/* Selector de productos de la seccion seleciconadda*/}

            </form>
        </div>
    )
}