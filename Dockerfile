FROM node:18-alpine AS base

# 1. Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json* ./
# Устанавливаем ВСЕ пакеты (включая tsx), чтобы они были доступны при сборке
RUN npm ci

# 2. Сборка приложения и подготовка базы данных
FROM base AS builder
# Для работы генератора Prisma в Alpine Linux нужен openssl
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем валидацию env на этапе компиляции
ENV SKIP_ENV_VALIDATION=true

# ГЕНЕРИРУЕМ ТАБЛИЦЫ И ЗАСЕИВАЕМ ДАННЫЕ ПРЯМО НА ЭТАПЕ СБОРКИ ОБРАЗА:
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

# 3. Запуск Production-сервера
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
