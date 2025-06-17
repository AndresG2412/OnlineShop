"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../Libs/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Image from "next/image";

import Link from "next/link";
import { ROUTES } from "@/routes";

export default function Producto() {
    const { productId } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducto = async () => {
            // 1. Obtener las secciones
            const tiendaDoc = doc(db, "Tienda", "Productos");
            const tiendaSnap = await getDoc(tiendaDoc);
            if (!tiendaSnap.exists()) {
                setLoading(false);
                return;
            }
            const data = tiendaSnap.data();
            const seccionesArray = data.Secciones || [];
            // 2. Buscar el producto en cada sección
            for (const seccion of seccionesArray) {
                const productoDoc = doc(db, seccion, productId);
                const productoSnap = await getDoc(productoDoc);
                if (productoSnap.exists()) {
                    setProducto({
                        id: productId,
                        titulo: productoSnap.data().Nombre,
                        precio: productoSnap.data().Precio,
                        tallaS: productoSnap.data().TallaS,
                        tallaM: productoSnap.data().TallaM,
                        tallaL: productoSnap.data().TallaL,
                        tallaXL: productoSnap.data().TallaXL,
                        unidades: productoSnap.data().Unidades,
                    });
                    setLoading(false);
                    return;
                }
            }
            setLoading(false);
        };
        fetchProducto();
    }, [productId]);

    if (loading) return <div>Cargando...</div>;
    if (!producto) return <div>Producto no encontrado</div>;

    return (
        <div className="text-black w-screen flex items-center justify-center mt-24">
            
            <div className="bg-white md:flex p-6 rounded-xs w-[90%] md:w-2/3 relative">

            <Link href={ROUTES.HOME} className="absolute top-2 left-2 w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center cursor-pointer hover:bg-gray-200 duration-300 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
            </Link>

                <Image
                    src={`https://res.cloudinary.com/duwosb0hu/image/upload/v1745037571/rata1_bblpf1.png`}
                    alt={producto.titulo}
                    width={500}
                    height={500}
                    className="md:w-1/2 h-auto rounded-md"
                />

                <div className="md:w-1/2 flex flex-col items-start gap-y-5 md:gap-y-12 justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{producto.titulo}</h1>
                    <p className="text-2xl font-semibold">Precio: ${producto.precio}</p>
                    <div className="">
                        <p className="text-xl md:text-[1.775rem]">Tallas Disponibles:</p>
                        <div className="mt-4 flex gap-x-5 items-center">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaS ? "bg-green-200" : "bg-red-200"}`}>S</div>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaM ? "bg-green-200" : "bg-red-200"}`}>M</div>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaL ? "bg-green-200" : "bg-red-200"}`}>L</div>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaXL ? "bg-green-200" : "bg-red-200"}`}>XL</div>
                        </div>

                    {/* poner carrito, like, unidades disponibles aun, tiempo limitado, por temporada, etc.

                    poner vista el celular */}

                    </div>

                    <div className="w-full flex gap-x-4 items-center justify-between">
                        {/* botones computador */}
                        <button className="hidden md:block group w-1/2 border-2 border-black py-2 font-semibold rounded-md bg-blue-400 hover:bg-blue-700">
                            <p className="flex gap-x-1 justify-center items-center group-hover:text-white group-hover:scale-125 duration-300">
                                Añadir a Carrito
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </p>
                        </button>
                        <button className="hidden md:block group w-1/2 border-2 border-black py-2 font-semibold rounded-md bg-red-400 hover:bg-red-700">
                            <p className="flex gap-x-1 justify-center items-center group-hover:text-white group-hover:scale-125 duration-300">
                                Añadir a Me Gusta
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </p>
                        </button>

                        {/* botones celular */}
                        <button className="md:hidden block group w-1/2 border-2 border-black py-2 font-semibold rounded-md bg-blue-400 hover:bg-blue-700">
                            <p className="flex gap-x-4 justify-center items-center group-hover:text-white group-hover:scale-125 duration-300">
                                Añadir  <br /> a Carrito
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="scale-150">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </p>
                        </button>
                        <button className="md:hidden block group w-1/2 border-2 border-black py-2 font-semibold rounded-md bg-red-400 hover:bg-red-700">
                            <p className="flex gap-x-4 justify-center items-center group-hover:text-white group-hover:scale-125 duration-300">
                                Añadir a <br /> Me Gusta
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="scale-150">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </p>
                        </button>
                    </div>

                    <a className="text-red-600 hover:cursor-pointer hover:scale-110 duration-300 font-semibold text-lg text-center w-full">¿ Tienes Preguntas ? Contactanos!</a>
                </div>
            </div>

        </div>
    );
}
