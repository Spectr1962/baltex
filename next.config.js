/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    output: "standalone", // Критически важно для сборки внутри Docker
};

export default config; // ИСПОЛЬЗУЕМ СОВРЕМЕННЫЙ ЭКСПОРТ ВМЕСТО module.exports
