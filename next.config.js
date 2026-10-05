/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone", // Критически важно для сборки внутри Docker
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default config; // ИСПОЛЬЗУЕМ СОВРЕМЕННЫЙ ЭКСПОРТ ВМЕСТО module.exports
