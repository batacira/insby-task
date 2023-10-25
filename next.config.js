/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["files.insby.tech", "images.unsplash.com"],
    },
    reactStrictMode: true,
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
