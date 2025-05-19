"use client";

import React, { useState, useEffect } from 'react'; // Añadido useState y useEffect
import { useForm } from 'react-hook-form';
import { db } from '@/Libs/firebase'; // Asegúrate que esta ruta sea correcta
// Importaciones necesarias de Firestore
import { 
    doc, 
    getDoc, 
    updateDoc, 
    collection, 
    getDocs, 
    writeBatch 
} from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

// Manteniendo el nombre 'page' como lo tienes
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
    } = useForm({
        defaultValues: {
            sectionToEdit: "", // Campo para el select
            newSectionName: ""  // Campo para el nuevo nombre de la sección
        }
    });

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

    // Lógica para manejar el envío del formulario de edición
    const handleEditSubmit = async (formData) => {
        const oldName = formData.sectionToEdit;
        const newName = formData.newSectionName.trim(); // Eliminar espacios extra

        // Validaciones básicas
        if (!oldName) {
            toast.error("Por favor, selecciona la sección que deseas editar.");
            return;
        }
        if (!newName) {
            toast.error("Por favor, ingresa el nuevo nombre para la sección.");
            return;
        }
        if (oldName === newName) {
            toast.info("El nuevo nombre es idéntico al actual. No se realizaron cambios.");
            return;
        }
        
        setIsLoading(true);

        try {
            // Validación: Verificar que el nuevo nombre no esté ya en uso por otra sección
            const tiendaProductosRefForCheck = doc(db, "Tienda", "Productos");
            const docSnapCheck = await getDoc(tiendaProductosRefForCheck);
            if (docSnapCheck.exists()) {
                const currentGlobalSecciones = docSnapCheck.data().Secciones || [];
                if (currentGlobalSecciones.filter(s => s !== oldName).includes(newName)) {
                    toast.error(`El nombre de sección "${newName}" ya está en uso. Por favor, elige otro.`);
                    setIsLoading(false);
                    return;
                }
            }

            // Paso 1: Mover documentos de la colección antigua a la nueva (simulando renombrar)
            const oldCollectionRef = collection(db, oldName);
            const oldCollectionDocsSnap = await getDocs(oldCollectionRef);

            // Límite de batch de Firestore es 500 operaciones. Cada producto son 2 ops (set + delete).
            if (oldCollectionDocsSnap.docs.length > 250) { 
                 toast.error("La sección contiene demasiados productos (>250) para renombrar automáticamente. Contacte a soporte.");
                 setIsLoading(false);
                 return;
            }

            const batch = writeBatch(db);
            oldCollectionDocsSnap.forEach(documentSnapshot => {
                const oldDocRef = doc(db, oldName, documentSnapshot.id);
                const newDocRef = doc(db, newName, documentSnapshot.id); // Mismo ID de producto
                batch.set(newDocRef, documentSnapshot.data()); // Copia a la nueva colección
                batch.delete(oldDocRef); // Elimina de la antigua colección
            });
            await batch.commit(); // Ejecuta todas las operaciones del lote

            // Paso 2: Actualizar el array 'Secciones' en el documento 'Tienda/Productos'
            const tiendaProductosRef = doc(db, "Tienda", "Productos");
            // Es buena práctica volver a leer el documento antes de actualizarlo si ha pasado tiempo
            // o si otras operaciones podrían haberlo modificado, pero para este flujo es probable que esté bien.
            const currentDocSnap = await getDoc(tiendaProductosRef); 
            if (currentDocSnap.exists()) {
                let seccionesArray = currentDocSnap.data().Secciones || [];
                // Eliminar el nombre antiguo del array
                seccionesArray = seccionesArray.filter(s => s !== oldName);
                // Añadir el nombre nuevo (si no está ya por alguna razón extraña)
                if (!seccionesArray.includes(newName)) {
                    seccionesArray.push(newName);
                }
                seccionesArray.sort(); // Mantener el orden alfabético
                await updateDoc(tiendaProductosRef, { Secciones: seccionesArray });

                // Actualizar el estado local para reflejar el cambio en el dropdown
                setSecciones(seccionesArray);
                // Resetear el formulario, opcionalmente seleccionando el nuevo nombre
                reset({ sectionToEdit: newName, newSectionName: newName }); 
            } else {
                // Este escenario es improbable si las secciones se cargaron inicialmente
                throw new Error("El documento 'Tienda/Productos' no se encontró para actualizar.");
            }

            toast.success(`Sección "${oldName}" renombrada a "${newName}" exitosamente.`);

        } catch (error) {
            console.error("Error detallado al editar la sección:", error);
            toast.error(`Error al editar sección: ${error.message}. Los datos podrían estar inconsistentes. Revise la consola.`);
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
                onSubmit={handleSubmit(handleEditSubmit)} // Cambiado al nuevo manejador
                className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12'
            >
                <p className='uppercase font-bold text-3xl text-center mb-8'>Edición de secciones</p>

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

                <div className={`mx-auto w-3/4 flex mb-4 flex-col gap-2 ${errors.newSectionName ? "mb-2" : "mb-4"}`}>
                    <label htmlFor="newSectionName" className="font-semibold text-xl text-gray-800">Nuevo nombre para la sección</label>
                    <input
                        id="newSectionName"
                        // Nombre del campo cambiado de "Producto" a "newSectionName"
                        {...register("newSectionName", { 
                            required: "El nuevo nombre de la sección es requerido!",
                            validate: value => value.trim() !== "" || "El nombre no puede consistir solo de espacios."
                        })}
                        type="text" 
                        className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                        placeholder='Escriba el nuevo nombre aquí'
                        autoComplete='off'
                        disabled={isLoading}
                    />
                    {errors.newSectionName && (
                        <span className='text-red-500'>{errors.newSectionName.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || isFetchingSecciones} // Deshabilitar si está cargando
                    // Texto del botón actualizado para reflejar la acción
                    className="mt-8 w-full uppercase font-semibold tracking-wider bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                    {isLoading ? "Actualizando..." : "Actualizar Sección"} 
                </button>
            </form>
        </div>
    )
}