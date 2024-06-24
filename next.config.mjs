/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_MISC_URL: process.env.API_MISC_URL,
    HOST_URL: process.env.HOST_URL,
  },
  images: {
    domains: ['nyc3.digitaloceanspaces.com'],
  },
  reactStrictMode: true,
}

export default nextConfig
