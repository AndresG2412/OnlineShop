"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { db } from '@/Libs/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const [secciones, setSecciones] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const productosDocRef = doc(db, "Tienda", "Productos");
        const productosSnap = await getDoc(productosDocRef);

        if (productosSnap.exists()) {
          const data = productosSnap.data();
          const seccionesArray = data.Secciones || [];
          setSecciones(seccionesArray);
        } else {
          toast.error("No se encontró el documento Productos");
        }
      } catch (error) {
        console.error("Error obteniendo las secciones:", error);
        toast.error("No se pudieron cargar las secciones");
      }
    };

    fetchSecciones();
  }, []);

  const onSubmit = async (data) => {
    const { seccionActual, nuevoNombre } = data;

    if (!seccionActual || !nuevoNombre) {
      toast.error("Debes completar ambos campos");
      return;
    }

    if (seccionActual === nuevoNombre) {
      toast.error("Los nombres son iguales");
      return;
    }

    try {
      const productosDocRef = doc(db, "Tienda", "Productos");
      const productosSnap = await getDoc(productosDocRef);

      if (!productosSnap.exists()) {
        toast.error("No se encontró el documento Productos");
        return;
      }

      let seccionesArray = productosSnap.data().Secciones || [];

      if (!seccionesArray.includes(seccionActual)) {
        toast.error("La sección seleccionada no existe");
        return;
      }

      // Copiar los documentos de la subcolección antigua a la nueva
      const antiguaRef = collection(db, "Tienda", "Productos", seccionActual);
      const nuevaRef = collection(db, "Tienda", "Productos", nuevoNombre);

      const snapshot = await getDocs(antiguaRef);
      for (const docSnap of snapshot.docs) {
        await setDoc(doc(nuevaRef, docSnap.id), docSnap.data());
        await deleteDoc(doc(antiguaRef, docSnap.id)); // Eliminar documento original
      }

      // Actualizar el array de secciones
      seccionesArray = seccionesArray.map((s) =>
        s === seccionActual ? nuevoNombre : s
      );

      await setDoc(productosDocRef, { Secciones: seccionesArray }, { merge: true });

      toast.success(`Sección renombrada a "${nuevoNombre}"`);
      setSecciones(seccionesArray);
      reset();

    } catch (error) {
      console.error("Error al actualizar la sección:", error);
      toast.error("Ocurrió un error al actualizar");
    }
  };

  const handleLogout = () => {
    router.push("/Pages/Admin/View");
  };

  return (
    <div className='mt-24 text-white'>
      <button
        onClick={handleLogout}
        className='text-white fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
      >
        VOLVER ATRÁS
      </button>

      <Toaster />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-[#e7e7e7] w-2/4 mx-auto shadow-1 rounded-xl border-[1px] border-[#222] py-8 px-12 mt-8 text-black'
      >
        <p className='uppercase font-bold text-3xl text-center mb-8'>Actualizar nombre de sección</p>

        <div className='mx-auto w-3/4 flex mb-4 flex-col gap-2'>
          <label className="font-semibold text-xl text-gray-800">Selecciona una sección</label>
          <select
            {...register("seccionActual", { required: "Selecciona una sección" })}
            className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
          >
            <option value="">Selecciona una opción</option>
            {secciones.map((seccion) => (
              <option key={seccion} value={seccion}>
                {seccion}
              </option>
            ))}
          </select>
          {errors.seccionActual && (
            <span className='text-red-500'>{errors.seccionActual.message}</span>
          )}
        </div>

        <div className='mx-auto w-3/4 flex mb-4 flex-col gap-2'>
          <label className="font-semibold text-xl text-gray-800">Nuevo nombre</label>
          <input
            {...register("nuevoNombre", { required: "El nuevo nombre es requerido" })}
            type="text"
            placeholder='Escribe el nuevo nombre de la sección'
            className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
          />
          {errors.nuevoNombre && (
            <span className='text-red-500'>{errors.nuevoNombre.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 w-full uppercase font-semibold tracking-wider bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Actualizar Sección
        </button>
      </form>
    </div>
  );
}
