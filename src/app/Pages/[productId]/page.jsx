"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../Libs/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

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
        <div className="text-white flex flex-col items-center mt-24">
            <h1 className="text-3xl font-bold mb-4">{producto.titulo}</h1>
            <p className="text-xl">Precio: ${producto.precio}</p>
        </div>
    );
}
