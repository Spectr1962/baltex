import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🧹 Очистка старых данных...");
    await prisma.post.deleteMany();
    await prisma.niche.deleteMany();
    await prisma.service.deleteMany();
    await prisma.serviceCategory.deleteMany();

    console.log("🌱 Создание категорий и услуг...");

    // Категория 1: ООО и ИП
    await prisma.serviceCategory.create({
        data: {
            title: "Бухгалтерский аутсорсинг",
            slug: "accounting-outsourcing",
            description: "Полное ведение учета и сдача отчетности под ключ.",
            services: {
                create: [
                    {
                        title: "Ведение учета для ООО",
                        slug: "accounting-ooo",
                        description: "Комплексное обслуживание организаций на ОСНО и УСН.",
                        basePrice: "от 15 000 ₽ / мес",
                        features: ["Расчет налогов", "Сдача деклараций", "Кадровый учет (до 3 сотр.)"],
                    },
                    {
                        title: "Ведение учета для ИП",
                        slug: "accounting-ip",
                        description: "Оптимальный пакет для индивидуальных предпринимателей.",
                        basePrice: "от 7 000 ₽ / мес",
                        features: ["Книга учета доходов", "Расчет взносов", "Квартальная отчетность"],
                    },
                ],
            },
        },
    });

    // Категория 2: Налоги
    await prisma.serviceCategory.create({
        data: {
            title: "Налоговый консалтинг",
            slug: "tax-consulting",
            description: "Оптимизация налогообложения и защита при проверках.",
            services: {
                create: [
                    {
                        title: "Оптимизация налоговой нагрузки",
                        slug: "tax-optimization",
                        description: "Законные способы снижения налогов для вашего бизнеса.",
                        basePrice: "Индивидуально",
                        features: ["Анализ рисков", "Подбор патентной системы", "Структурирование сделок"],
                    },
                ],
            },
        },
    });

    console.log("📦 Создание ниш и статей блога...");

    // Ниша 1: Маркетплейсы
    await prisma.niche.create({
        data: {
            name: "Маркетплейсы (E-commerce)",
            slug: "ecommerce",
            description: "Особенности учета для продавцов Wildberries, Ozon и Яндекс Маркет.",
            posts: {
                create: [
                    {
                        title: "Как правильно учитывать налоги при торговле на Wildberries в 2026 году",
                        slug: "wildberries-taxes-2026",
                        excerpt: "Разбор частых ошибок селлеров: почему нельзя платить налог только с суммы, пришедшей на карту.",
                        content: "Полный текст статьи про учет комиссий маркетплейса, возвратов и логистики при расчете УСН...",
                        published: true,
                    },
                ],
            },
        },
    });

    // Ниша 2: IT-сектор
    await prisma.niche.create({
        data: {
            name: "IT-компании",
            slug: "it-companies",
            description: "Налоговые льготы, аккредитация Минцифры и учет нематериальных активов.",
            posts: {
                create: [
                    {
                        title: "Льготы для IT-компаний: как не потерять право на пониженные тарифы",
                        slug: "it-benefits-guide",
                        excerpt: "Главные требования к выручке и профилю деятельности для сохранения налоговых преференций.",
                        content: "Подробный гид по соблюдению доли профильной IT-выручки в 2026 году для ИТ-агентств...",
                        published: true,
                    },
                ],
            },
        },
    });

    console.log("✅ База данных успешно заполнена тестовыми данными!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
