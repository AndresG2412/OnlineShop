"use client"

import React from 'react'
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'
import { auth } from "@/Libs/firebase"  // Importamos auth directamente

export default function AdminView() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await auth.signOut()  // Usamos auth directamente
            toast.success("Sesión cerrada correctamente", { duration: 2000 })
            router.push("/")
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
            toast.error("Ocurrió un error al cerrar sesión", { duration: 2000 })
        }
    }

    return (
        <div className='mt-24'>
            <button 
                onClick={handleLogout}
                className='fixed bottom-10 right-10 pointer border-1 border-white bg-red-400 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                CERRAR SESIÓN
            </button>

            <div className="p-4">
                <h1 className="text-2xl font-bold">Panel de Administración</h1>
                {/* Contenido del admin aquí */}
            </div>
        </div>
    )
}