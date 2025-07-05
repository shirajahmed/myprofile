/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
    NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
    NEXT_PUBLIC_GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  },
};

export default nextConfig;
