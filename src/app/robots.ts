import { type MetadataRoute } from "next";

// Важно: экспорт должен быть строго export default
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",          // Скрываем внутренние API маршруты tRPC
                "/_next/",         // Скрываем системные файлы сборки
            ],
        },
        sitemap: "https://baltex.ru", // Укажите ваш рабочий домен
    };
}
