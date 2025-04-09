"use client";
import React from 'react'
import { useRouter } from "next/navigation"

export default function page() {
    const router = useRouter()

    const handleLogout = () => {
        router.push("/Pages/Admin/View")
    }

    return (
        <div className='mt-24 text-white'>
            <button 
                onClick={handleLogout}
                className='text-white fixed bottom-10 right-10 pointer border-1 border-white bg-red-500 py-2 px-4 rounded-lg tracking-wide font-semibold hover:bg-red-600 transition-colors duration-200'
            >
                VOLVER ATRAS
            </button>
            <p>Form Edit</p>
        </div>
    )
}
