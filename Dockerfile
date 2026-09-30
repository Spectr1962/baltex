FROM node:22-alpine AS base

# 1. Установка dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# 2. Prisma CLI для одноразовых операций с базой
FROM deps AS dbtool
COPY . .
ENTRYPOINT ["./node_modules/.bin/prisma"]

# 3. Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем валидацию env на этапе компиляции
ENV SKIP_ENV_VALIDATION=true

# НА ЭТАПЕ СБОРКИ ГЕНЕРИРУЕМ КЛИЕНТ
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

# 4. Запуск Production-сервера
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

# ЧИСТЫЙ ЗАПУСК NEXT.JS БЕЗ ЛИШНИХ КОМАНД, КОТОРЫЕ ТОРМОЗЯТ ИЛИ СБИВАЮТ ДОКЕР
CMD ["node", "server.js"]
