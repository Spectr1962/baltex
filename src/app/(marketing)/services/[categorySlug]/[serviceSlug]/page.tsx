import { notFound } from "next/navigation";
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

interface Props {
    params: Promise<{
        categorySlug: string;
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
    const { categorySlug, serviceSlug } = await params;

    // Инициируем prefetch на сервере
    void api.services.getBySlug.prefetch({ serviceSlug });
    const service = await api.services.getBySlug({ serviceSlug });

    if (!service) notFound();

    return (
        <HydrateClient>
            <div className="min-h-screen bg-black text-white selection:bg-[#0070f3]/30 py-16">
                <div className="container mx-auto px-6 max-w-4xl">

                    {/* Профессиональные хлебные крошки */}
                    <nav className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Главная</Link>
                        {" / "}
                        <Link href="/services" className="hover:text-white transition-colors">Услуги</Link>
                        {" / "}
                        <Link href={`/services/${categorySlug}`} className="hover:text-white transition-colors">
                            {service.categoryName}
                        </Link>
                        {" / "}
                        <span className="text-white/80">{service.title}</span>
                    </nav>

                    {/* Главный контейнер статьи-спецификации */}
                    <article className="border border-white/5 bg-white/[0.01] p-8 sm:p-12 rounded-3xl backdrop-blur-md relative overflow-hidden">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[#0070f3]/5 to-transparent blur-3xl rounded-3xl -z-10" />

                        <header className="mb-8 border-b border-white/5 pb-8">
                            <span className="text-[10px] font-bold text-[#0070f3] uppercase tracking-widest bg-[#0070f3]/5 px-3 py-1.5 rounded-full border border-[#0070f3]/10 inline-block mb-4">
                                {service.subCategory}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                                {service.title}
                            </h1>
                        </header>

                        {/* Экспертный текст разбора */}
                        <div className="text-base sm:text-lg text-white/70 space-y-6 leading-relaxed mb-10 font-normal">
                            <p className="font-semibold text-white italic border-l-2 border-[#0070f3] pl-4 bg-white/[0.01] p-4 rounded-r-xl border-y border-r border-white/5 text-sm sm:text-base">
                                {service.description}
                            </p>

                            <h3 className="text-xl font-bold text-white tracking-tight pt-4">Что мы делаем в рамках этого модуля:</h3>
                            <p className="text-sm sm:text-base text-white/50">
                                Наши сертифицированные бухгалтеры полностью забирают на себя рутину: от контроля корректности закрывающих документов до защиты ваших интересов в рамках камеральных проверок ФНС. Мы знаем, как автоматизировать процессы так, чтобы вы не переплачивали налоги.
                            </p>

                            {/* Профессиональные чек-боксы регламента */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-bold text-white/80 uppercase tracking-wider">
                                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[#0070f3] text-lg">✓</span> 100% Белый учет
                                </div>
                                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[#0070f3] text-lg">✓</span> Ежедневный мониторинг баз
                                </div>
                                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[#0070f3] text-lg">✓</span> Автоматизация API
                                </div>
                                <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                                    <span className="text-[#0070f3] text-lg">✓</span> Ответственность по договору
                                </div>
                            </div>
                        </div>

                        {/* Дорогой блок призыва к действию с глянцевой кнопкой */}
                        <div className="p-6 sm:p-8 bg-black border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
                            <div>
                                <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">
                                    Формат сотрудничества
                                </span>
                                <span className="text-lg sm:text-xl font-black text-white tracking-tight">
                                    Индивидуальный расчет стоимости
                                </span>
                            </div>
                            <Link
                                href="/contacts"
                                className="w-full sm:w-auto bg-gradient-to-b from-[#0070f3] to-[#0056b3] border border-[#0070f3] text-white text-xs font-bold px-8 py-4 rounded-xl text-center hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#0070f3]/25 uppercase tracking-wider"
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
