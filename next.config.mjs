
/** @type {import('next').NextConfig} */

const nextConfig = {
    images:{
        domains: ['res.cloudinary.com']
    },
    reactStrictMode: false,
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};



export default nextConfig;
