"use client";

import { useEffect, useState } from "react";
import { db } from "../Libs/firebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

import Busqueda from "./components/Specifics/Busqueda";
import Card from "./components/Card"; // producto unitario, recibe parametros de "titulo" y "precio"
import Section from "./components/Sections"; // titulo de la seccion de un producto especifico, recibe parametro de "nombre"

export default function Main() {
  const [secciones, setSecciones] = useState([]);
  const [productos, setProductos] = useState({}); // { Pantalones: [{titulo, precio}, ...], Remeras: [...] }

  useEffect(() => {
    const fetchData = async () => {
      // 1. Obtener las secciones desde Tienda > Productos > Secciones
      const tiendaDoc = doc(db, "Tienda", "Productos");
      const tiendaSnap = await getDoc(tiendaDoc);

      if (tiendaSnap.exists()) {
        const data = tiendaSnap.data();
        const seccionesArray = data.Secciones || [];
        setSecciones(seccionesArray);

        // 2. Por cada sección, obtener sus productos (documentos de la colección)
        const productosPorSeccion = {};

        for (const seccion of seccionesArray) {
          const seccionCol = collection(db, seccion);
          const seccionSnap = await getDocs(seccionCol);

          productosPorSeccion[seccion] = seccionSnap.docs.map((doc) => {
            const prodData = doc.data();
            return {
              id: doc.id,
              titulo: doc.id,          // ✅ Cambiado a ID del documento como titulo
              precio: prodData.Precio, // ✅ Mantienes el precio como campo
            };
          });
        }

        setProductos(productosPorSeccion);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center mt-24 no-seleccionable">
      <Busqueda />

      <div className="w-5/6 pb-12">
        {secciones.map((seccion) => (
          <div key={seccion} className="w-full">
            <Section nombre={seccion} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {productos[seccion]?.map((producto) => (
                <Card key={producto.id} titulo={producto.titulo} precio={producto.precio} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
