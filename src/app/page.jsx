"use client";

import { useEffect, useState } from "react";
import { doc, getDocs, getCollections, collection } from "firebase/firestore";
import { db } from "../Libs/firebase";

import Busqueda from "./Components/Specifics/Busqueda";
import ProductsView from "./Components/ProductsView";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      // ⚠ CORRECTO:
      const docRef = doc(db, "Tienda", "Productos");
      const subcollections = await getCollections(docRef);

      let productosTemp = [];

      for (let sub of subcollections) {
        const subcolRef = collection(db, "Tienda", "Productos", sub.id);
        const docsSnap = await getDocs(subcolRef);

        docsSnap.forEach((doc) => {
          const data = doc.data();
          productosTemp.push({
            nombre: sub.id,
            titulo: doc.id,
            precio: data.precio ?? "Sin precio",
          });
        });
      }

      setProductos(productosTemp);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-24 w-screen h-auto">
      <Busqueda />
      {productos.map((item, index) => (
        <ProductsView
          key={index}
          nombre={item.nombre}
          titulo={item.titulo}
          precio={item.precio}
        />
      ))}
    </div>
  );
}
