import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/post";
import { accountingRouter } from "./routers/accounting";

/**
 * Это главный роутер для вашего сервера.
 * Все роутеры, созданные в /api/routers, должны быть добавлены сюда.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  accounting: accountingRouter, // Наш роутер для услуг и блога бухгалтерского агентства
});

// Экспорт типа API
export type AppRouter = typeof appRouter;

// ИСПРАВЛЕНО: Теперь функция createCallerFactory импортирована корректно вверху файла
export const createCaller = createCallerFactory(appRouter);
