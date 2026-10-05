import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/post";
import { accountingRouter } from "./routers/accounting";
import { servicesRouter } from "./routers/services"; // ИСПРАВЛЕНО: Добавлен импорт роутера услуг
import { blogRouter } from "./routers/blog";

/**
 * Это главный роутер для вашего сервера.
 * Все роутеры, созданные в /api/routers, должны быть добавлены сюда.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  accounting: accountingRouter, // Наш роутер для услуг и блога бухгалтерского агентства
  services: servicesRouter,     // ИСПРАВЛЕНО: Роутер успешно подключен к tRPC
  blog: blogRouter,
});

// Экспорт типа API
export type AppRouter = typeof appRouter;

// ИСПРАВЛЕНО: Теперь функция createCallerFactory импортирована корректно вверху файла
export const createCaller = createCallerFactory(appRouter);
