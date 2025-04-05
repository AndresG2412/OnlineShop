import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function OptionsAdmin({ src, titulo, alt }) {
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
      <Link href={"/"}>
        <div className='rounded-lg bg-[#f2f2f2] px-4 py-2 flex flex-col items-center gap-y-2 justify-center'>
          <Image 
            src={imageSrc}
            alt={alt || titulo}
            width={80}
            height={80}
            className='rounded-lg'
            onError={() => setImageSrc('/placeholder-image.png')}
          />
          <p className='text-center tracking-wide font-semibold uppercase hover:scale-110 hover:duration-300'>
            {titulo}
          </p>
        </div>
      </Link>
    </div>
  );
}