import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/post";
import { accountingRouter } from "./routers/accounting"; // Импортируем новый роутер

/**
 * Это главный роутер для вашего сервера.
 * Все роутеры, созданные в /api/routers, должны быть добавлены сюда.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  accounting: accountingRouter, // Подключаем роутер бухгалтерского агентства
});

// Экспорт типа API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
