FROM node:18-alpine AS base

# 1. Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
# ДОБАВЛЕН ФЛАГ --ignore-scripts, ЧТОБЫ ИЗБЕЖАТЬ ОШИБКИ НА ЭТАПЕ УСТАНОВКИ:
RUN npm ci --ignore-scripts

# 2. Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем валидацию env на этапе компиляции
ENV SKIP_ENV_VALIDATION=true

# Теперь явно генерируем клиент Prisma, когда файлы схемы точно скопированы:
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
