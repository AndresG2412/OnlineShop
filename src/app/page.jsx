"use client";

import { useEffect, useState } from "react";
import { db } from "../Libs/firebase.js"; // Asegúrate de que la ruta sea correcta
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";

// necesitamos devolver todo a antes del error
// primero verificamos que estamos en main con "git pull origin main" y llamamos too e la rama main e github a la local con "git pull origin main"

import Card from "../app/components/Card.jsx";
import Section from "../app/components/Sections.jsx"; // Nota la 'S' mayúscula
import Assets from "../app/components/Specifics/Assets.jsx";

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
              nombre: prodData.Nombre || "", // Asegúrate de que el campo sea exactamente "Nombre"
              titulo: doc.id,
              precio: prodData.Precio,
              imageLink: prodData.Imagen,
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
      <Assets />

      <div className="w-5/6 pb-12">
        {secciones.map((seccion) => (
          <div key={seccion} className="w-full">
            <Section nombre={seccion} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {productos[seccion]?.map((producto) => (
                <Link
                  key={producto.id}
                  href={`./pages/${producto.id}`}
                  passHref
                >
                  <Card 
                    titulo={producto.nombre} 
                    precio={producto.precio} 
                    imageLink={producto.imageLink}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
