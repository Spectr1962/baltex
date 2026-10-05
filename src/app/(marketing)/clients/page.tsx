import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "С кем работаем | Отраслевые решения",
    description: "Специализация бухгалтерского агентства Baltex. Сопровождаем продавцов на маркетплейсах, производственные компании, инфобизнес и стартапы.",
};

export default function ClientsPage() {
    const targetSegments = [
        {
            title: "Продавцы на маркетплейсах",
            subtitle: "Селлеры Ozon, Wildberries, Яндекс Маркет с оборотом от 1 млн/мес",
            description: "Ведем точный учет УСН/ОСНО со всей суммы продаж до вычета комиссий площадок. Помогаем легализовать остатки при переходе с «карго» на «белый» импорт, настраиваем интеграции с 1С по API и автоматизируем учет в системе «Честный ЗНАК».",
            link: "/services/marketplaces",
        },
        {
            title: "Производственные компании",
            subtitle: "Заводы, фабрики, промышленные цеха со штатом и оборотом",
            description: "Разрабатываем калькуляцию себестоимости готовой продукции с учетом аренды, коммунальных платежей и амортизации оборудования. Внедряем нормирование технологических потерь, ведем сложный кадровый учет при сменных графиках.",
            link: "/services/manufacturing",
        },
        {
            title: "Инфобизнес и онлайн-школы",
            subtitle: "Продюсеры, эксперты и блогеры с большими оборотами",
            description: "Обеспечиваем защиту от рисков дробления бизнеса и помогаем применить налоговую амнистию. Настраиваем сквозной учет массовых платежей (GetCourse, эквайринг, онлайн-кассы), легально разделяем доходы между партнерами.",
            link: "/services/infobusiness",
        },
        {
            title: "Стартапы и предприниматели",
            subtitle: "Проекты на этапе запуска и проверки бизнес-гипотез",
            description: "Помогаем составить реалистичный финансовый план до привлечения инвестиций. Настраиваем график платежей для защиты от кассовых разрывов, рассчитываем Burn Rate и корректно ставим на баланс созданное ПО и товарные знаки.",
            link: "/services/startups",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                    С кем мы работаем
                </h1>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                    Мы глубоко погружаемся в специфику каждой отрасли, знаем ключевые триггеры налоговых проверок и предлагаем готовые решения для защиты вашего бизнеса.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {targetSegments.map((segment, index) => (
                    <div
                        key={index}
                        className="border border-neutral-800 bg-neutral-900/20 p-8 rounded-3xl flex flex-col justify-between hover:border-neutral-700 transition duration-300"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">{segment.title}</h2>
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-4">
                                {segment.subtitle}
                            </span>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                                {segment.description}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-neutral-900">
                            <Link
                                href={segment.link}
                                className="inline-flex items-center text-sm font-bold text-blue-400 hover:text-blue-300 transition gap-2"
                            >
                                Подробнее о решениях отрасли &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Профессиональный блок призыва к действию внизу страницы */}
            <div className="mt-16 p-8 border border-neutral-800 bg-neutral-950 rounded-3xl text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Не нашли свой сегмент бизнеса?</h3>
                <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
                    Свяжитесь с нами. Мы проведем бесплатный аудит вашей структуры, оценим объемы документооборота и подберем индивидуальные условия сопровождения.
                </p>
                <Link
                    href="/contacts"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-blue-600/10"
                >
                    Обсудить вашу задачу
                </Link>
            </div>
        </div>
    );
}
