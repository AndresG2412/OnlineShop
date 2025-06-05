import React from 'react'
import sadbag from '../../images/notfound.webp'
import Image from 'next/image'

export default function Promociones() {
    return (
        <div className='w-full h-screen pt-16 flex items-center justify-center'>
            <Image alt='sadbag_image' className='w-[55%] h-96' src={sadbag}/>
        </div>
    )
}
