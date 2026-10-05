import type { Metadata } from "next";
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
    title: "Отраслевые бухгалтерские услуги",
    description: "Комплексное бухгалтерское сопровождение, оптимизация налогов и защита от доначислений ФНС для маркетплейсов, производства, инфобизнеса и стартапов.",
};

export default async function ServicesPage() {
    // Предзагружаем все услуги из базы данных / tRPC роутера
    void api.services.getAll.prefetch();
    const allServices = await api.services.getAll();

    // Конфигурация 4 премиальных сегментов с иконками и уникальными градиентами свечения
    const segments = [
        {
            slug: "marketplaces",
            name: "Для маркетплейсов",
            badge: "E-commerce & Селлеры",
            desc: "Учет УСН/ОСНО со всей суммы продаж до вычета комиссий Ozon и Wildberries. Контроль лимитов выручки, белый импорт и Честный ЗНАК.",
            glowColor: "group-hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
            badgeStyle: "bg-purple-950/50 text-purple-400 border-purple-900/50"
        },
        {
            slug: "manufacturing",
            name: "Для производства",
            badge: "Заводы, фабрики, цеха",
            desc: "Точная калькуляция себестоимости единицы продукции. Учет незавершенного производства, нормирование брака и защита от разрывов НДС.",
            glowColor: "group-hover:border-amber-500/30 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
            badgeStyle: "bg-amber-950/50 text-amber-400 border-amber-900/50"
        },
        {
            slug: "infobusiness",
            name: "Для инфобизнеса",
            badge: "Онлайн-школы & Продюсеры",
            desc: "Защита от рисков дробления бизнеса, применение налоговой амнистии. Автоматизация чеков GetCourse, рассрочек и интернет-эквайрингов.",
            glowColor: "group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(0,112,243,0.2)]",
            badgeStyle: "bg-blue-950/50 text-blue-400 border-blue-900/50"
        },
        {
            slug: "startups",
            name: "Для стартапов",
            badge: "Инвесторы & Основатели",
            desc: "Защита от кассовых разрывов через платежные календари. Постановка разработанного ПО и патентов на баланс в качестве НМА. Учет долей.",
            glowColor: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
            badgeStyle: "bg-emerald-950/50 text-emerald-400 border-emerald-900/50"
        }
    ];

    return (
        <HydrateClient>
            <div className="min-h-screen bg-black text-white selection:bg-[#0070f3]/30 selection:text-white">
                <div className="container mx-auto px-6 py-20 max-w-6xl">

                    {/* Дорогой заголовок с акцентом на отраслевые решения */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-xs font-bold text-[#0070f3] uppercase tracking-widest bg-[#0070f3]/5 px-4 py-2 rounded-full border border-[#0070f3]/10 inline-block mb-4">
                            Экспертный консалтинг
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-[1.1] text-white">
                            Отраслевые бухгалтерские решения
                        </h1>
                        <p className="text-lg sm:text-xl text-white/50 font-normal leading-relaxed">
                            Мы не ведем «абстрактный учет». Наше агентство глубоко специализируется на четырех сложнейших направлениях бизнеса, гарантируя абсолютную налоговую безопасность.
                        </p>
                    </div>

                    {/* Сетка широкоформатных интеллектуальных карточек */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {segments.map((segment) => {
                            // Фильтруем точечные услуги (боли), принадлежащие текущему сегменту
                            const segmentServices = allServices.filter(s => s.categorySlug === segment.slug);

                            return (
                                <div
                                    key={segment.slug}
                                    className={`group border border-white/5 bg-white/[0.01] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${segment.glowColor}`}
                                >
                                    <div>
                                        {/* Бейдж и категория */}
                                        <div className="flex items-center justify-between mb-6">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${segment.badgeStyle}`}>
                                                {segment.badge}
                                            </span>
                                            <svg className="w-5 h-5 text-white/20 group-hover:text-[#0070f3] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>

                                        <h2 className="text-2xl font-black tracking-tight text-white mb-3">
                                            {segment.name}
                                        </h2>

                                        <p className="text-sm text-white/50 leading-relaxed mb-8 border-b border-white/5 pb-6">
                                            {segment.desc}
                                        </p>

                                        {/* Вывод вложенных точечных услуг как интерактивного списка */}
                                        <div className="space-y-4 mb-8">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 block">
                                                Что включено в сопровождение:
                                            </span>
                                            {segmentServices.map((service) => (
                                                <Link
                                                    key={service.id}
                                                    href={`/services/${service.categorySlug}/${service.slug}`}
                                                    className="flex items-start gap-3 group/item text-sm text-white/70 hover:text-white transition-colors duration-150"
                                                >
                                                    <span className="text-[#0070f3] font-bold mt-0.5 group-hover/item:translate-x-0.5 transition-transform duration-150">➔</span>
                                                    <span className="underline decoration-white/10 hover:decoration-[#0070f3] transition-colors duration-150">
                                                        {service.title}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Ссылка на полную страницу направления */}
                                    <div className="pt-4 mt-auto">
                                        <Link
                                            href={`/services/${segment.slug}`}
                                            className="w-full block text-center bg-white/5 hover:bg-[#0070f3] text-white font-semibold text-sm py-3.5 rounded-xl border border-white/5 hover:border-[#0070f3] transition-all duration-200 shadow-sm"
                                        >
                                            Посмотреть тарифы направления
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Траст-блок внизу каталога услуг */}
                    <div className="border border-white/5 bg-gradient-to-r from-black via-[#0070f3]/5 to-black p-8 sm:p-10 rounded-3xl text-center max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Нужна индивидуальная конфигурация учета или бриф?
                        </h3>
                        <p className="text-sm text-white/50 mb-6 max-w-2xl mx-auto">
                            Оставьте заявку. Мы проведем встречу с ведущим аудитором вашей ниши, изучим структуру юридических лиц и сформируем персональную спецификацию под ваш оборот.
                        </p>
                        <Link
                            href="/contacts"
                            className="inline-block bg-[#0070f3] hover:bg-[#0070f3]/90 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#0070f3]/10"
                        >
                            Связаться с главбухом
                        </Link>
                    </div>

                </div>
            </div>
        </HydrateClient>
    );
}
