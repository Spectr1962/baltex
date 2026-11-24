import { notFound } from "next/navigation";
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

interface Props {
  params: Promise<{
    directionSlug: string;
    serviceSlug: string;
  }>;
}

// Динамическая генерация уникальных и дорогих SEO-метаданных для каждой услуги
export async function generateMetadata({ params }: Props) {
  const { serviceSlug } = await params;
  const service = await api.services.getBySlug({ serviceSlug });

  if (!service) return { title: "Услуга не найдена" };

  return {
    title: `${service.title} | Экспертный учет Baltex`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { directionSlug, serviceSlug } = await params;

  // Инициируем prefetch на сервере
  void api.services.getBySlug.prefetch({ serviceSlug });
  const service = await api.services.getBySlug({ serviceSlug });

  if (!service) notFound();

  return (
    <HydrateClient>
      <div className="min-h-screen bg-black py-16 text-white selection:bg-[#0070f3]/30">
        <div className="container mx-auto max-w-4xl px-6">
          {/* Профессиональные хлебные крошки */}
          <nav className="mb-8 text-xs font-semibold tracking-wider text-white/30 uppercase">
            <Link href="/" className="transition-colors hover:text-white">
              Главная
            </Link>
            {" / "}
            <Link
              href="/services"
              className="transition-colors hover:text-white"
            >
              Услуги
            </Link>
            {" / "}
            <Link
              href={`/services/${directionSlug}`}
              className="transition-colors hover:text-white"
            >
              {service.categoryName}
            </Link>
            {" / "}
            <span className="text-white/80">{service.title}</span>
          </nav>

          {/* Главный контейнер статьи-спецификации */}
          <article className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md sm:p-12">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-[#0070f3]/5 to-transparent blur-3xl" />

            <header className="mb-8 border-b border-white/5 pb-8">
              <span className="mb-4 inline-block rounded-full border border-[#0070f3]/10 bg-[#0070f3]/5 px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#0070f3] uppercase">
                {service.subCategory}
              </span>
              <h1 className="text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl">
                {service.title}
              </h1>
            </header>

            {/* Экспертный текст разбора */}
            <div className="mb-10 space-y-6 text-base leading-relaxed font-normal text-white/70 sm:text-lg">
              <p className="rounded-r-xl border-y border-r border-l-2 border-[#0070f3] border-white/5 bg-white/[0.01] p-4 pl-4 text-sm font-semibold text-white italic sm:text-base">
                {service.description}
              </p>

              <h3 className="pt-4 text-xl font-bold tracking-tight text-white">
                Что мы делаем в рамках этого модуля:
              </h3>
              <p className="text-sm text-white/50 sm:text-base">
                Наши сертифицированные бухгалтеры полностью забирают на себя
                рутину: от контроля корректности закрывающих документов до
                защиты ваших интересов в рамках камеральных проверок ФНС. Мы
                знаем, как автоматизировать процессы так, чтобы вы не
                переплачивали налоги.
              </p>

              {/* Профессиональные чек-боксы регламента */}
              <div className="grid grid-cols-1 gap-4 pt-4 text-xs font-bold tracking-wider text-white/80 uppercase sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-4">
                  <span className="text-lg text-[#0070f3]">✓</span> 100% Белый
                  учет
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-4">
                  <span className="text-lg text-[#0070f3]">✓</span> Ежедневный
                  мониторинг баз
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-4">
                  <span className="text-lg text-[#0070f3]">✓</span>{" "}
                  Автоматизация API
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-4">
                  <span className="text-lg text-[#0070f3]">✓</span>{" "}
                  Ответственность по договору
                </div>
              </div>
            </div>

            {/* Дорогой блок призыва к действию с глянцевой кнопкой */}
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-black p-6 shadow-2xl sm:flex-row sm:items-center sm:p-8">
              <div>
                <span className="mb-1 block text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  Формат сотрудничества
                </span>
                <span className="text-lg font-black tracking-tight text-white sm:text-xl">
                  Индивидуальный расчет стоимости
                </span>
              </div>
              <Link
                href="/contacts"
                className="w-full rounded-xl border border-[#0070f3] bg-gradient-to-b from-[#0070f3] to-[#0056b3] px-8 py-4 text-center text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#0070f3]/25 transition-all hover:brightness-110 active:scale-[0.99] sm:w-auto"
              >
                Закрепить за собой главбуха
              </Link>
            </div>
          </article>
        </div>
      </div>
    </HydrateClient>
  );
}
