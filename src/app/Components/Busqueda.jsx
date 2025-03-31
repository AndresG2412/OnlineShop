"use client"

import React from 'react'
import { useState } from 'react';

export default function Busqueda() {
    
    const [searchTerm, setSearchTerm] = useState("");
    
    return (
        <div className='w-full flex justify-center'>
            <div className="flex justify-center gap-2 mb-4 w-2/3">
                <input
                type="text"
                placeholder="Escribe lo que buscas!"
                className="border-2 border-white p-2 rounded text-white w-full focus:border-purple-500 focus:outline"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}