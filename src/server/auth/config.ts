import { type DefaultSession, type NextAuthConfig } from "next-auth";

/**
 * Временное расширение типов для сессий NextAuth, 
 * чтобы не ломать типы в других компонентах проекта.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Облегченная конфигурация NextAuth без провайдеров и адаптеров БД.
 * Идеально для этапа, когда авторизация на сайте временно не используется.
 */
export const authConfig = {
  providers: [], // Пустой массив убирает ошибки отсутствия AUTH_DISCORD_ID
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: {
        ...session.user,
        id: "", // Временный пустой ID для прохождения тестов сборки
      },
    }),
  },
} satisfies NextAuthConfig;
