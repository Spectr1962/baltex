import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Отключает PWA в режиме разработки
  // 🌟 Защита для Safari: перенесли настройки управления воркером в работу Workbox
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\/_next\/data\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'next-data',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 часа
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone", // Необходимо для работы в Docker
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default withPWA(config);
