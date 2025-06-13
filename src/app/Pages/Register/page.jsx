"use client";

import React, { useState } from 'react';
import icon from '../../Images/icono_shop_2.webp';
import Image from 'next/image';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Para el App Router de Next.js 13+
// Si usas Pages Router (Next.js 12 o inferior), cambia a:
// import { useRouter } from 'next/router';

// Importa tu configuración de Firebase
import { auth } from "../../../Libs/firebase"

export default function Page() {
    // Estado para controlar la vista del formulario (true = Login, false = Register)
    const [viewForm, setViewForm] = useState(true);

    // Estados para los campos del formulario de Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Estados para los campos del formulario de Register
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    // const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    const router = useRouter(); // Inicializa el router de Next.js
    const firebaseAuth = getAuth(); // Obtiene la instancia de auth de Firebase

    const handleGoToRegister = () => {
        setViewForm(false);
        // Limpiar errores y campos al cambiar de vista
        setLoginError('');
        setRegisterError('');
        setLoginEmail('');
        setLoginPassword('');
        setRegisterEmail('');
        setRegisterPassword('');
        // setRegisterConfirmPassword('');
    };

    const handleGoToLogin = () => {
        setViewForm(true);
        // Limpiar errores y campos al cambiar de vista
        setLoginError('');
        setRegisterError('');
        setLoginEmail('');
        setLoginPassword('');
        setRegisterEmail('');
        setRegisterPassword('');
        // setRegisterConfirmPassword('');
    };

    // Función para manejar el registro de nuevos usuarios
    const handleRegister = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setRegisterError(''); // Limpia cualquier error previo

        // if (registerPassword !== registerConfirmPassword) {
        //     setRegisterError('Las contraseñas no coinciden.');
        //     return;
        // }

        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, registerEmail, registerPassword);
            const user = userCredential.user;
            console.log('Usuario registrado:', user);

            // Dado que las cuentas de usuario normales no tienen Custom Claims de admin,
            // se les redirigirá directamente a la página principal.
            router.push('/'); 

        } catch (error) {
            console.error('Error al registrar usuario:', error.code, error.message);
            // Mapea errores de Firebase a mensajes amigables para el usuario
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setRegisterError('Este correo electrónico ya está en uso.');
                    break;
                case 'auth/weak-password':
                    setRegisterError('La contraseña debe tener al menos 6 caracteres.');
                    break;
                case 'auth/invalid-email':
                    setRegisterError('El formato del correo electrónico no es válido.');
                    break;
                default:
                    setRegisterError('Error al registrar la cuenta. Por favor, inténtalo de nuevo.');
            }
        }
    };

    // Función para manejar el inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setLoginError(''); // Limpia cualquier error previo

        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, loginEmail, loginPassword);
            const user = userCredential.user;

            // Obtener el ID token para acceder a los custom claims
            const idTokenResult = await user.getIdTokenResult();
            const isAdmin = idTokenResult.claims.admin;

            if (isAdmin) {
                router.push('/admin/dashboard'); // Redirigir al dashboard de admin
            } else {
                router.push('/'); // Redirigir a la página principal del usuario
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error.code, error.message);
            // Mapea errores de Firebase a mensajes amigables para el usuario
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    setLoginError('Correo electrónico o contraseña incorrectos.');
                    break;
                case 'auth/invalid-email':
                    setLoginError('El formato del correo electrónico no es válido.');
                    break;
                default:
                    setLoginError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        }
    };


    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div>
                {/* Formulario de Inicio de Sesión */}
                <div className={`flex items-center justify-center gap-2 w-screen ${viewForm ? "block" : "hidden"}`}>
                    <form onSubmit={handleLogin} className='flex py-6 flex-col justify-center items-center bg-gray-800 rounded-lg shadow-lg w-2/4'>

                        {/* logo de formulario */}
                        <div className='flex items-center justify-center gap-2 w-full mb-6'>
                            <Image 
                                width={100}
                                height={100}
                                src={icon} 
                                className='mx-4' 
                                alt='user_logo'
                                priority
                            />
                            <div className="">
                                <p className="m-0 text-2xl md:text-3xl tracking-widest uppercase font-semibold text-white">
                                    Bienvenido
                                </p>
                                <p className="m-0 text-4xl md:text-5xl tracking-wider uppercase font-semibold text-white">
                                    De vuelta!
                                </p>
                            </div>
                        </div>

                        {/* Campos del formulario de inicio de sesión */}
                        <div className='flex flex-col w-full items-center justify-center gap-4 p-4'>
                            <label htmlFor="loginEmail" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Correo Electrónico</label>
                            <input 
                                id="loginEmail"
                                type="email" 
                                placeholder="Correo Electrónico" 
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className='w-2/3 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                required
                            />

                            <label htmlFor="loginPassword" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Contraseña</label>
                            <input 
                                id="loginPassword"
                                type="password" 
                                placeholder="Contraseña" 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className='w-2/3 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                required
                            />

                            {loginError && <p className="text-red-400 text-sm mt-2">{loginError}</p>}

                            <button 
                                type="submit" 
                                className='bg-blue-500 tracking-wider font-semibold text-lg mt-8 w-1/3 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300'
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>

                {/* Formulario de Registro de Usuario */}
                <div className={`flex items-center justify-center gap-2 w-screen ${viewForm ? "hidden" : "block"}`}>
                    <form onSubmit={handleRegister} className='flex py-6 flex-col justify-center items-center bg-gray-800 rounded-lg shadow-lg w-2/4'>

                        {/* logo de formulario */}
                        <div className='flex items-center justify-center gap-2 w-full mb-6'>
                            <Image 
                                width={100}
                                height={100}
                                src={icon} 
                                className='mx-4' 
                                alt='user_logo'
                                priority
                            />
                            <div className="">
                                <p className="m-0 text-2xl md:text-3xl tracking-widest uppercase font-semibold text-white">
                                    Bienvenido
                                </p>
                                <p className="m-0 text-4xl md:text-5xl tracking-wider uppercase font-semibold text-white">
                                    Al Registro!
                                </p>
                            </div>
                        </div>

                        {/* Campos del formulario de registro de cuenta */}
                        <div className='flex flex-col w-full items-center justify-center gap-4 p-4'>
                            <label htmlFor="registerEmail" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Correo Electrónico</label>
                            <input 
                                id="registerEmail"
                                type="email" 
                                placeholder="Correo Electrónico" 
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                className='w-2/3 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                required
                            />

                            <label htmlFor="registerPassword" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Contraseña</label>
                            <input 
                                id="registerPassword"
                                type="password" 
                                placeholder="Contraseña" 
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                className='w-2/3 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                required
                            />

                            {/* <label htmlFor="registerConfirmPassword" className='font-semibold tracking-wide text-center mx-auto text-white text-2xl'>Confirmar Contraseña</label>
                            <input 
                                id="registerConfirmPassword"
                                type="password" 
                                placeholder="Confirmar Contraseña" 
                                value={registerConfirmPassword}
                                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                className='w-2/3 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                required
                            /> */}

                            {registerError && <p className="text-red-400 text-sm mt-2">{registerError}</p>}

                            <button 
                                type="submit" 
                                className='bg-blue-500 tracking-wider font-semibold text-lg mt-8 w-1/3 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300'
                            >
                                Registrar Cuenta
                            </button>
                        </div>
                    </form>
                </div>

                {/* Botones para cambiar entre Login y Register */}
                <div className="flex items-center justify-center mt-6">
                    <button 
                        className={`bg-red-500 rounded-lg py-2 px-4 ${viewForm ? "block" : "hidden"} text-white text-lg font-semibold hover:cursor-pointer transition-all duration-300 hover:bg-red-600`} 
                        onClick={handleGoToRegister}
                    >
                        ¿No tienes cuenta? Regístrate
                    </button>
                    <button 
                        className={`bg-green-500 rounded-lg py-2 px-4 ${viewForm ? "hidden" : "block"} text-white text-lg font-semibold hover:cursor-pointer transition-all duration-300 hover:bg-green-600`} 
                        onClick={handleGoToLogin}
                    >
                        ¿Ya tienes cuenta? Inicia Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}