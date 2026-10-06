import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  workboxOptions: {
    // Защита для Safari: не кэшировать внутренние роуты Next.js
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\/_next\/data\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'next-data',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone", // Сохраняем для сборки внутри Docker
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next", // Сохраняем разделение папок
};

export default withPWA(config); // Используем современный экспорт, как у вас