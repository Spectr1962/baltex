import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Тарифы и стоимость бухгалтерского сопровождения",
    description: "Прозрачная стоимость бухгалтерских услуг для маркетплейсов, производства, онлайн-школ и стартапов от компании Baltex. Финансовые гарантии по договору.",
};

export default function PricesPage() {
    // Профессиональная тарифная сетка, разделенная строго по вашим 4 сегментам из ТЗ
    const priceTiers = [
        {
            title: "Селлеры маркетплейсов",
            badge: "Ozon, WB, Я.Маркет",
            basePrice: "от 15 000 ₽ / мес",
            features: [
                "Учет выручки до вычета комиссий площадок",
                "Контроль лимитов УСН (до 450 млн руб.)",
                "Интеграция отчетов о продажах по API в 1С",
                "Учет компенсаций за утерянный/сгоревший товар",
                "Сопровождение маркировки «Честный ЗНАК»",
            ],
            cta: "Рассчитать под мой оборот",
            link: "/contacts",
            popular: true, // Подсветим этот блок
        },
        {
            title: "Производственные компании",
            badge: "Заводы, фабрики, цеха",
            basePrice: "от 35 000 ₽ / мес",
            features: [
                "Калькуляция себестоимости единицы продукции",
                "Учет незавершенного производства (НЗП)",
                "Списание брака и технологических потерь",
                "Аудит поставщиков и защита от разрывов НДС",
                "Сложный кадровый учет (сменные графики)",
            ],
            cta: "Запросить калькуляцию",
            link: "/contacts",
            popular: false,
        },
        {
            title: "Инфобизнес и онлайн-школы",
            badge: "Продюсеры & Эксперты",
            basePrice: "от 25 000 ₽ / мес",
            features: [
                "Аудит и защита от рисков дробления бизнеса",
                "Вхождение под налоговую амнистию",
                "Автоматизация чеков GetCourse и онлайн-касс",
                "Учет рассрочек (банковских и внутренних)",
                "Легальное разделение прибыли партнеров",
            ],
            cta: "Обсудить структуру",
            link: "/contacts",
            popular: false,
        },
        {
            title: "Стартапы и IT",
            badge: "Инвесторы & Основатели",
            basePrice: "от 20 000 ₽ / мес",
            features: [
                "Внедрение платежного календаря от кассовых разрывов",
                "Расчет Burn Rate и юнит-экономики",
                "Постановка на баланс разработанного ПО (НМА)",
                "Оформление долей и инвестиционных займов",
                "Валютный контроль при экспортной выручке",
            ],
            cta: "Заказать финмодель",
            link: "/contacts",
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#0070f3]/30">
            <div className="container mx-auto px-6 py-20 max-w-6xl">

                {/* Заголовок страницы */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-xs font-bold text-[#0070f3] uppercase tracking-widest bg-[#0070f3]/5 px-4 py-2 rounded-full border border-[#0070f3]/10 inline-block mb-4">
                        Прозрачное ценообразование
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
                        Стоимость обслуживания
                    </h1>
                    <p className="text-lg text-white/50 leading-relaxed">
                        Мы не берем плату «за количество документов». Стоимость обслуживания привязана к объему реальных операций и специфике вашей ниши. Вы платите только за то, что защищает ваш бизнес.
                    </p>
                </div>

                {/* Сетка тарифов */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
                    {priceTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 bg-white/[0.01] ${tier.popular
                                    ? "border-[#0070f3] shadow-[0_0_40px_rgba(0,112,243,0.1)] before:absolute before:inset-x-0 before:-top-3 before:mx-auto before:w-max before:bg-[#0070f3] before:text-white before:text-[10px] before:font-bold before:uppercase before:tracking-wider before:px-3 before:py-1 before:rounded-full before:content-['Самый_высокий_трафик']"
                                    : "border-white/5 hover:border-white/10"
                                }`}
                        >
                            <div>
                                {/* Категория */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-black tracking-tight text-white">{tier.title}</h3>
                                    <span className="text-[10px] font-medium text-white/40">{tier.badge}</span>
                                </div>

                                {/* Цена */}
                                <div className="my-6">
                                    <span className="text-2xl font-black text-white tracking-tight">{tier.basePrice}</span>
                                    <span className="block text-[10px] text-white/30 mt-1">Окончательный расчет после аудита баз</span>
                                </div>

                                {/* Список включенных опций */}
                                <ul className="space-y-3.5 border-t border-white/5 pt-6 mb-8">
                                    {tier.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-2.5 text-xs text-white/60 leading-normal">
                                            <span className="text-[#0070f3] font-bold flex-shrink-0">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Кнопка CTA */}
                            <Link
                                href={tier.link}
                                className={`w-full block text-center py-3 rounded-xl text-xs font-bold transition-all duration-200 ${tier.popular
                                        ? "bg-[#0070f3] text-white hover:bg-[#0070f3]/90 shadow-md shadow-[#0070f3]/10"
                                        : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Траст-блок финансовых гарантий (Важнейший коммерческий фактор) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border border-white/5 bg-white/[0.01] p-8 sm:p-10 rounded-3xl max-w-5xl mx-auto">
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Финансовые гарантии</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Официально фиксируем в договоре 100% материальную ответственность за любые налоговые риски, штрафы или пени, возникшие по нашей вине.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Бесплатный экспресс-аудит</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Перед расчетом итоговой стоимости мы бесплатно проводим экспресс-анализ вашей текущей базы 1С для поиска скрытых ошибок прошлых бухгалтеров.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Личный главный бухгалтер</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                            За вашим бизнесом закрепляется не просто оператор, а сертифицированный главбух, досконально знающий требования и тонкости именно вашей ниши.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
