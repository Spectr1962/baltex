import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const accountingRouter = createTRPCRouter({
    // Получить все категории услуг
    getCategories: publicProcedure.query(async ({ ctx }) => {
        // Используем принудительное приведение типа, чтобы обойти ошибку генерации клиента в Docker
        const db = ctx.db as any;
        return db.serviceCategory.findMany({
            include: { services: true },
            orderBy: { createdAt: "asc" },
        });
    }),

    // Получить конкретную категорию по slug
    getCategoryBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            const db = ctx.db as any;
            return db.serviceCategory.findUnique({
                where: { slug: input.slug },
                include: { services: true },
            });
        }),

    // Получить статьи блога (с опциональной фильтрацией по нише)
    getPosts: publicProcedure
        .input(z.object({ nicheSlug: z.string().optional() }).optional())
        .query(async ({ ctx, input }) => {
            const db = ctx.db as any;
            if (input?.nicheSlug) {
                return db.post.findMany({
                    where: { niche: { slug: input.nicheSlug }, published: true },
                    include: { niche: true },
                    orderBy: { createdAt: "desc" },
                });
            }
            return db.post.findMany({
                where: { published: true },
                include: { niche: true },
                orderBy: { createdAt: "desc" },
            });
        }),

    // Получить одну конкретную статью по slug
    getPostBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            const db = ctx.db as any;
            return db.post.findUnique({
                where: { slug: input.slug },
                include: { niche: true },
            });
        }),
});
