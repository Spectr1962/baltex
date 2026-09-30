import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const accountingRouter = createTRPCRouter({
    // Получить все категории услуг вместе с их дочерними услугами
    getCategories: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.serviceCategory.findMany({
            include: {
                services: true
            },
            orderBy: {
                createdAt: "asc"
            },
        });
    }),

    // Получить конкретную категорию по её URL-слагу
    getCategoryBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.serviceCategory.findUnique({
                where: { slug: input.slug },
                include: { services: true },
            });
        }),

    // Получить статьи блога (с возможностью фильтрации по нише бизнеса)
    getPosts: publicProcedure
        .input(z.object({ nicheSlug: z.string().optional() }).optional())
        .query(async ({ ctx, input }) => {
            if (input?.nicheSlug) {
                return ctx.db.post.findMany({
                    where: {
                        niche: { slug: input.nicheSlug },
                        published: true
                    },
                    include: { niche: true },
                    orderBy: { createdAt: "desc" },
                });
            }
            return ctx.db.post.findMany({
                where: { published: true },
                include: { niche: true },
                orderBy: { createdAt: "desc" },
            });
        }),

    // Получить одну конкретную статью для чтения
    getPostBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.post.findUnique({
                where: { slug: input.slug },
                include: { niche: true },
            });
        }),
});
