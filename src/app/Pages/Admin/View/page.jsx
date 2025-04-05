"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'
import { auth } from "@/Libs/firebase"
import { db } from "@/Libs/firebase"
// Agrega estas importaciones
import { collection, getDocs, query, orderBy } from "firebase/firestore"

import OptionsAdmin from '@/app/Components/OptionsAdmin'
import icon_add from '@/app/Images/image.png'

export default function AdminView() {
    const router = useRouter()
    const [imagenes, setImagenes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const q = query(collection(db, "Imagenes"), orderBy("Orden"))
                const querySnapshot = await getDocs(q)
                
                const imagenesData = []
                querySnapshot.forEach((doc) => {
                    imagenesData.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                
                setImagenes(imagenesData)
            } catch (error) {
                console.error("Error al cargar imágenes:", error)
                toast.error("Error al cargar las imágenes")
            } finally {
                setLoading(false)
            }
        }

        fetchImagenes()
    }, [])

    const handleLogout = async () => {
        try {
            await auth.signOut()
            toast.success("Sesión cerrada correctamente", { duration: 2000 })
            router.push("/")
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
            toast.error("Ocurrió un error al cerrar sesión", { duration: 2000 })
        }
    }

    if (loading) {
        return (
            <div className='mt-24 flex justify-center items-center h-screen'>
                <p className='text-white'>Cargando imágenes...</p>
            </div>
        )
    }

    return (
        <div className='mt-24'>
            <button 
                onClick={handleLogout}
                className='fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                CERRAR SESIÓN
            </button>

            <div className="p-4">
                <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
            </div>

            <div className="flex flex-wrap gap-4 p-4">
                {/* Renderizamos las imágenes desde Firebase */}
                {imagenes.map((imagen) => (
                    <OptionsAdmin 
                        key={imagen.id}
                        src={imagen.Imagen}
                        titulo={imagen.Alt}
                        alt={imagen.Alt}
                    />
                ))}
                
            </div>
        </div>
    )
}