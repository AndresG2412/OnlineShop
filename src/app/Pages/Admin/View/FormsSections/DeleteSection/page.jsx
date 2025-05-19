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
    const [secciones, setSecciones] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingSecciones, setIsFetchingSecciones] = useState(true);

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm({
        defaultValues: {
            sectionToEdit: "",
            newSectionName: "" // Aún presente pero no se usa
        }
    });

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
                toast.error("No se pudieron cargar las secciones.");
                setSecciones([]);
            } finally {
                setIsFetchingSecciones(false);
            }
        };
        fetchSeccionesList();
    }, []);

    const handleDeleteSubmit = async (formData) => {
        const sectionName = formData.sectionToEdit;

        if (!sectionName) {
            toast.error("Por favor, selecciona la sección que deseas eliminar.");
            return;
        }

        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar la sección "${sectionName}"? Esto eliminará todos sus productos.`);
        if (!confirmDelete) return;

        setIsLoading(true);

        try {
            // Eliminar todos los documentos de la colección
            const collectionRef = collection(db, sectionName);
            const docsSnap = await getDocs(collectionRef);

            const deletePromises = docsSnap.docs.map(docSnap =>
                deleteDoc(doc(db, sectionName, docSnap.id))
            );

            await Promise.all(deletePromises);

            // Eliminar el nombre de la sección del array 'Secciones'
            const tiendaProductosRef = doc(db, "Tienda", "Productos");
            const tiendaDocSnap = await getDoc(tiendaProductosRef);

            if (tiendaDocSnap.exists()) {
                let seccionesArray = tiendaDocSnap.data().Secciones || [];
                seccionesArray = seccionesArray.filter(s => s !== sectionName);

                await updateDoc(tiendaProductosRef, { Secciones: seccionesArray });

                setSecciones(seccionesArray);
                reset({ sectionToEdit: "" });

                toast.success(`Sección "${sectionName}" eliminada correctamente.`);
            } else {
                throw new Error("No se encontró el documento 'Tienda/Productos'");
            }

        } catch (error) {
            console.error("Error al eliminar sección:", error);
            toast.error(`Error al eliminar la sección: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        router.push("/pages/Admin/View"); // Ajusta esta ruta si es necesario
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
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
                <p className='uppercase font-bold text-3xl text-center mb-8'>Eliminación de secciones</p>

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
                            {...register("sectionToEdit", { required: "Debe seleccionar una sección." })}
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

                <button
                    type="submit"
                    disabled={isLoading || isFetchingSecciones} // Deshabilitar si está cargando
                    // Texto del botón actualizado para reflejar la acción
                    className="mt-8 w-full uppercase font-semibold tracking-wider bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                    {isLoading ? "Eliminano..." : "Eliminar Sección"} 
                </button>
            </form>
        </div>
    )
}