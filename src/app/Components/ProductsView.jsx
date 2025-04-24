import React from 'react'
import Card from './Card'
import Section from './Sections'

export default function ProductsView({nombre, titulo, precio}) {
    return (
        <div>
            <Section nombre={nombre}/>
            <Card titulo={titulo} precio={precio}/>
        </div>
    )
}
