import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Baltex — Бухгалтерское Агентство",
        short_name: "Baltex",
        description: "Экспертный бухгалтерский учет и налоговая безопасность для бизнеса",
        start_url: "/",
        display: "standalone", // Запускает сайт как нативное приложение (без шапки браузера)
        background_color: "#000000", // Черный фон сплэш-скрина при загрузке
        theme_color: "#000000",      // Цвет статус-бара в телефоне
        orientation: "portrait",     // Фиксируем вертикальную ориентацию для смартфонов
        icons: [
            {
                src: "/icon.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable", // Для красивых скругленных иконок на Android
            },
        ],
    };
}
