"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { ROUTES } from '@/routes'
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/Libs/firebase"
import { toast } from 'react-hot-toast'
import { useState, useEffect } from "react"

import icon from '../../Images/icono_shop_2.webp'

export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)

    // Verificar si ya está autenticado
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/pages/Admin/View")
            }
            setAuthChecked(true)
        })

        return () => unsubscribe()
    }, [router])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm()

    // Manejador de inicio de sesión mejorado
    const onSubmit = async (data) => {
        // Validación adicional del formulario
        if (!data.Correo || !data.Contraseña) {
            toast.error('Por favor complete todos los campos')
            return
        }

        setLoading(true)
        
        try {
            // Limpieza de datos
            const email = data.Correo.trim()
            const password = data.Contraseña.trim()

            // Intento de autenticación
            await signInWithEmailAndPassword(auth, email, password)
            
            toast.success("¡Bienvenido de vuelta!", { 
                duration: 2000,
                position: 'top-center'
            })
            router.push("/pages/Admin/View")
            
        } catch (error) {
            // Log informativo (no error) para desarrollo
            if (process.env.NODE_ENV === 'development') {
                console.info('Intento de autenticación fallido:', {
                    email: data.Correo.trim(),
                    errorCode: error.code
                })
            }
            
            // Mapeo de errores amigables
            const errorMap = {
                'auth/invalid-credential': 'Credenciales incorrectas',
                'auth/user-not-found': 'Credenciales incorrectas',
                'auth/wrong-password': 'Credenciales incorrectas',
                'auth/invalid-email': 'Formato de email inválido',
                'auth/too-many-requests': 'Demasiados intentos. Intente más tarde',
                'auth/user-disabled': 'Cuenta deshabilitada',
                'auth/network-request-failed': 'Problema de conexión. Verifique su internet'
            }

            const friendlyMessage = errorMap[error.code] || 'Error al iniciar sesión'
            toast.error(friendlyMessage, { 
                duration: 2500,
                position: 'top-center'
            })
            
            // Limpiar campo de contraseña después del error
            setValue("Contraseña", "")
        } finally {
            setLoading(false)
        }
    }

    // Mostrar spinner de carga mientras verifica autenticación inicial
    if (!authChecked) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className='h-screen flex items-center'>
            <div className="mx-auto w-full md:w-1/2 px-4">
                <form
                    className="min-h-96 px-8 py-6 mt-4 text-left bg-gray-800 rounded-xl shadow-lg"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center items-center h-full select-none">
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <Image 
                                width={100}
                                height={100}
                                src={icon} 
                                className='mx-4' 
                                alt='user_logo'
                                priority
                            />

                            <div className=''>
                                <p className="m-0 text-3xl tracking-widest uppercase font-semibold dark:text-white">
                                    Bienvenido
                                </p>
                                <p className="m-0 text-5xl tracking-wider uppercase font-semibold dark:text-white">
                                    De vuelta
                                </p>
                            </div>
                        </div>
                        
                        {/* Campo de Email */}
                        <div className={`w-3/4 flex flex-col gap-2 ${errors.Correo ? "mb-2" : "mb-4"}`}>
                            <label className="font-semibold text-xl text-gray-400 text-center">Correo Electrónico</label>
                            <input
                                {...register("Correo", {
                                    required: "El correo es requerido!",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Correo inválido"
                                    }
                                })}
                                type="email" 
                                className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                                placeholder='Ingresa tu Correo Electrónico'
                                autoComplete='off'
                                disabled={loading}
                            />
                            
                            {errors.Correo && (
                                <span className='text-red-500'>{errors.Correo.message}</span>
                            )}
                        </div>

                        {/* Campo de Contraseña */}
                        <div className={`w-3/4 flex flex-col gap-2 mb-8`}>
                            <label className="font-semibold text-xl text-gray-400 text-center">Contraseña</label>
                            <input 
                                {...register("Contraseña", {
                                    required: "La contraseña es requerida!",
                                    minLength: {
                                        value: 6,
                                        message: "Mínimo 6 caracteres"
                                    }
                                })}
                                type="password" 
                                className='w-full h-8 bg-white rounded-lg pl-2 tracking-wider'
                                placeholder='Ingresa tu Contraseña'
                                autoComplete='current-password'
                                disabled={loading}
                            />
                            
                            {errors.Contraseña && (
                                <span className='text-red-500'>{errors.Contraseña.message}</span>
                            )}
                        </div>
                    </div>
                    
                    {/* Botón de Submit */}
                    <div className='flex flex-col w-full md:w-2/4 justify-center mx-auto'>
                        <button
                            disabled={loading}
                            className={`tracking-wider w-full py-1 mb-4 px-8 ${
                                loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-800'
                            } text-white transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none text-xl`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    Procesando...
                                </div>
                            ) : 'Ingresar'}
                        </button>
                    </div>

                </form>
                    {/* Enlace alternativo */}
                    <p className='hover:scale-110 hover:duration-300 text-red-500 tracking-wider text-lg text-center'>
                        <Link href={ROUTES.ADMIN}>¿No tienes una cuenta?</Link>
                    </p>
            </div>
        </div>
    )
}