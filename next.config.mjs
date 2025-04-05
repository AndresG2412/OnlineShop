/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'cdn-icons-png.flaticon.com',
          'firebasestorage.googleapis.com', // Para imágenes de Firebase Storage
          'example.com', // Otro dominio que uses
        ],
    },
}

export default nextConfig;
