import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function OptionsAdmin({ src, titulo, alt, ruta }) {
  const [imageSrc, setImageSrc] = React.useState(() => {
    try {
      new URL(src);
      return src;
    } catch {
      return '/placeholder-image.png';
    }
  });

  return (
    <div className='md:w-40'>
      <Link href={ruta || "/"}> 
        <div className='rounded-lg group bg-[#f2f2f2] px-6 py-2 flex flex-col items-center gap-y-2 justify-center'>
          <Image 
            src={imageSrc}
            alt={alt || titulo}
            width={80}
            height={80}
            className='rounded-lg group-hover:scale-110 group-hover:duration-300'
            onError={() => setImageSrc('/placeholder-image.png')}
          />
          <p className='text-center tracking-widest font-semibold uppercase group-hover:scale-110 group-hover:duration-300'>
            {titulo}
          </p>
        </div>
      </Link>
    </div>
  );
}