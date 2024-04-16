/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env :{
    API_BASE_URL : process.env.API_BASE_URL,
  }
};

export default nextConfig;
