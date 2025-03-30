"use client"

import React from 'react'
import { useState } from 'react';

export default function Busqueda() {
    
    const [searchTerm, setSearchTerm] = useState("");
    
    return (
        <div>
            <div className="flex justify-center gap-2 mb-4">
                <input
                type="text"
                placeholder="Escribe lo que buscas!"
                className="border-2 border-white p-2 rounded text-white md:w-2/4 focus:border-purple-500 focus:outline"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}
