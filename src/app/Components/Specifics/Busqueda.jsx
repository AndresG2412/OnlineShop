"use client"

import React from 'react'
import { useState } from 'react';

export default function Busqueda() {

    const [palabra, setPalabra] = useState('');

    // Esta función solo actualiza el estado 'palabra' cuando el usuario escribe en el input
    const handleInputChange = (e) => {
        setPalabra(e.target.value);
    }

    // Esta función se ejecutará SÓLO cuando se haga clic en el botón
    const handleSearchClick = () => {
        if (palabra.trim() !== '') { // Opcional: Verifica que el campo no esté vacío
            // Aquí es donde colocarías la lógica de tu búsqueda real.
            // Por ejemplo:
            console.log("Realizando búsqueda con la palabra:", palabra);
            // Puedes llamar a una API, filtrar una lista, etc.
            // fetch(`/api/items?q=${encodeURIComponent(palabra)}`)
            // .then(response => response.json())
            // .then(data => {
            //     console.log("Resultados de la búsqueda:", data);
            //     // Aquí actualizarías el estado con los resultados para mostrarlos
            // });
        } else {
            console.log("El campo de búsqueda está vacío.");
        }
    }
    
    return (
        <div className='w-full relative'>
            <input 
                value={palabra}
                type="text" 
                placeholder='Search' 
                className='w-full bg-[#f5f5f5] rounded-md px-3 py-1'
                onChange={handleInputChange} // Aquí se vincula la función para actualizar el estado
            />

            <button 
                onClick={handleSearchClick} // Aquí se vincula la función de búsqueda al click del botón
                className='absolute top-1.5 right-1.5 hover:scale-[120%] transition-transform duration-300 hover:cursor-pointer'
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}