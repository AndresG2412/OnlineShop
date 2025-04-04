"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { ROUTES } from '@/routes';
import { useRouter } from "next/navigation";

import icon from '../../Images/icono_shop_2.webp'
import Image from 'next/image'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/Libs/firebase";
import { toast } from 'react-hot-toast';
import { useState, useEffect } from "react";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [authChecked, setAuthChecked] = useState(false); // Nuevo estado para controlar la verificación inicial

    // Verificar si ya está autenticado
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/Pages/Admin/View");
            }
            setAuthChecked(true); // Marcar que la verificación ha terminado
        });

        return () => unsubscribe();
    }, [router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ================ inicio de sesión admin ==================
    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.Correo.trim(),
                data.Contraseña
            );

            toast.success("Bienvenido de vuelta!", { duration: 2500 });
            router.push("/Pages/Admin/View");
        } catch (error) {
            console.error("Error de autenticación:", error);
            toast.error(error.message.includes("invalid-credential") 
                ? "Credenciales incorrectas" 
                : "Error al iniciar sesión", 
                { duration: 2500 }
            );
        } finally {
            setLoading(false);
        }
    }

    // Mostrar spinner mientras se verifica el estado de autenticación
    if (!authChecked) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
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
                                priority // Para imágenes importantes
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
                        <div className={`w-3/4 flex flex-col gap-2 ${
                            errors.Correo ? "mb-2" : "mb-4"
                        }`}>
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
                                autoComplete='email'
                                disabled={loading}
                            />
                            
                            {errors.Correo && (
                                <span className='text-red-500'>{errors.Correo.message}</span>
                            )}
                        </div>

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

                    <p className='hover:scale-110 hover:duration-300 text-red-500 tracking-wider text-lg text-center'>
                        <Link href={ROUTES.ADMIN}>¿No tienes una cuenta?</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}