"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../Libs/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Image from "next/image";

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
        <div className="text-black  w-screen flex items-center justify-center mt-24">
            
            <div className="bg-white flex p-6 rounded-xs w-2/3">
                <Image
                    src={`https://res.cloudinary.com/duwosb0hu/image/upload/v1745037571/rata1_bblpf1.png`}
                    alt={producto.titulo}
                    width={500}
                    height={500}
                    className="w-1/2 h-auto rounded-md"
                />

                <div className="w-1/2 flex flex-col items-start gap-y-12 justify-center">
                    <h1 className="text-5xl font-bold mb-4">{producto.titulo}</h1>
                    <p className="text-2xl font-semibold">Precio: ${producto.precio}</p>
                    <div>
                        <p className="text-[1.775rem]">Tallas Disponibles:</p>
                        <div className="mt-4 flex gap-x-5 items-center">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaS ? "bg-green-200" : "bg-red-200"}`}>S</div>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaM ? "bg-green-200" : "bg-red-200"}`}>M</div>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaL ? "bg-green-200" : "bg-red-200"}`}>L</div>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-sm font-semibold border-dashed border-3 border-black ${producto.tallaXL ? "bg-green-200" : "bg-red-200"}`}>XL</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
