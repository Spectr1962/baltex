import { type MetadataRoute } from "next";
import { api } from "~/trpc/server";

// ИСПРАВЛЕНО: Инструктируем Next.js собирать эту страницу динамически, 
// что позволит tRPC безопасно считывать headers во время обращения робота
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://baltex.ru"; // ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ ДОМЕН

    // 1. Статические страницы сайта
    const staticPages: MetadataRoute.Sitemap = [
        { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
        { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
        { url: `${baseUrl}/clients`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/prices`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];

    // 2. Динамические страницы Услуг из tRPC-роутера
    let servicePages: MetadataRoute.Sitemap = [];
    try {
        const services = await api.services.getAll();
        servicePages = services.map((service) => ({
            url: `${baseUrl}/services/${service.categorySlug}/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        }));
    } catch (error) {
        console.error("Ошибка при получении услуг для sitemap:", error);
    }

    // 3. Динамические страницы Блога из tRPC-роутера
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const posts = await api.blog.getAll();
        blogPages = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.categorySlug}/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        }));
    } catch (error) {
        console.error("Ошибка при получении статей блога для sitemap:", error);
    }

    return [...staticPages, ...servicePages, ...blogPages];
}
