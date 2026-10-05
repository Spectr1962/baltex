import type { Metadata } from "next";
import Link from "next/link";

import { HomeContactForm } from "~/app/_components/HomeContactForm";
import { api, HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Бухгалтерское сопровождение бизнеса",
  description:
    "Бухгалтерский и налоговый учет для маркетплейсов, производства, онлайн-школ и стартапов. Помогаем снизить риски и выстроить прозрачный учет.",
};

const categoryDescriptions: Record<string, string> = {
  marketplaces:
    "Налоговый учет, контроль лимитов и сопровождение продавцов на Ozon, Wildberries и Яндекс Маркете.",
  manufacturing:
    "Калькуляция себестоимости, учет производства и поддержка при налоговых проверках.",
  infobusiness:
    "Учет онлайн-школ, автоматизация платежей и помощь с налоговыми рисками.",
  startups:
    "Финансовое планирование, учет инвестиций и сопровождение растущих компаний.",
};

export default async function HomePage() {
  void api.services.getCategories.prefetch();
  const categories = await api.services.getCategories();

  return (
    <HydrateClient>
      <div className="min-h-screen bg-black text-white selection:bg-[#0070f3]/30 selection:text-white">
        <section className="container mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-block rounded-full border border-[#0070f3]/20 bg-[#0070f3]/5 px-4 py-2 text-xs font-bold tracking-widest text-[#0070f3] uppercase">
              Бухгалтерия и финансовый консалтинг
            </span>
            <h1 className="mb-6 text-4xl leading-tight font-black tracking-tight sm:text-6xl">
              Помогаем бизнесу расти
              <span className="text-[#0070f3]"> без лишних рисков</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
              Выстраиваем понятный бухгалтерский и налоговый учет с учетом
              особенностей вашей отрасли — чтобы вы могли сосредоточиться на
              развитии компании.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contacts"
                className="rounded-full bg-[#0070f3] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0062d6]"
              >
                Обсудить задачу
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/5"
              >
                Посмотреть услуги
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5">
          <div className="container mx-auto max-w-6xl px-6 py-20">
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-[#0070f3] uppercase">
                Отраслевая экспертиза
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Решения для вашего бизнеса
              </h2>
              <p className="mt-4 leading-relaxed text-white/50">
                Учитываем специфику операций и помогаем организовать работу
                финансов и бухгалтерии в одной системе.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/services/${category.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#0070f3]/40 hover:bg-white/[0.04]"
                >
                  <h3 className="text-xl font-bold transition-colors group-hover:text-[#0070f3]">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {categoryDescriptions[category.slug] ??
                      "Бухгалтерское и финансовое сопровождение с учетом задач вашей компании."}
                  </p>
                  <span className="mt-6 inline-block text-sm font-semibold text-white/70 transition-colors group-hover:text-white">
                    Подробнее <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-6">
          <HomeContactForm />
        </div>
      </div>
    </HydrateClient>
  );
}
