import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// База данных услуг, полностью переписанная под 4 сегмента аудитории из ТЗ
const SERVICES_DATA = [
    // СЕГМЕНТ 1: МАРКЕТПЛЕЙСЫ
    {
        id: "m1",
        categorySlug: "marketplaces",
        categoryName: "Продавцы на маркетплейсах",
        subCategory: "Налоговый учет и риски доначислений",
        title: "Налоговый учет и контроль лимитов для маркетплейсов",
        slug: "nalogovyi-uchet-marketplaces",
        description: "Расчет налогов УСН/ОСНО и НДС со всей суммы продаж до вычета комиссий площадок (Ozon, WB, Яндекс Маркет). Контроль общего лимита выручки, переход на ОСНО, учет компенсаций за утерянный товар и возвраты в 1С.",
    },
    {
        id: "m2",
        categorySlug: "marketplaces",
        categoryName: "Продавцы на маркетплейсах",
        subCategory: "Закупки, импорт и маркировка",
        title: "Официальный импорт и учет в «Честный ЗНАК»",
        slug: "import-i-chestnyi-znak",
        description: "Легализация остатков при переходе с «карго» на «белый» импорт. Таможенные декларации, валютный контроль при закупках в Китае, проведение платежей через агентов в СНГ и интеграция Честного ЗНАКа с маркетплейсами.",
    },

    // СЕГМЕНТ 2: ПРОИЗВОДСТВО
    {
        id: "p1",
        categorySlug: "manufacturing",
        categoryName: "Производственные компании",
        subCategory: "Калькуляция себестоимости",
        title: "Расчет и оптимизация себестоимости продукции",
        slug: "raschet-sebestoimosti-proizvodstva",
        description: "Распределение расходов цехов на единицу продукции. Учет незавершенного производства, нормирование технологических потерь и брака сырья. Разделение официальной себестоимости для ФНС и реальной прибыли.",
    },
    {
        id: "p2",
        categorySlug: "manufacturing",
        categoryName: "Производственные компании",
        subCategory: "Налогообложение и проверки",
        title: "Сопровождение налоговых проверок и аудит НДС",
        slug: "proverki-i-nds-proizvodstva",
        description: "Проверка поставщиков сырья для исключения разрывов по НДС. Оформление инвестиционного налогового вычета на станки. Защита интересов и подготовка документов при камеральных и выездных проверках ФНС.",
    },

    // СЕГМЕНТ 3: ИНФОБИЗНЕС
    {
        id: "i1",
        categorySlug: "infobusiness",
        categoryName: "Инфобизнес и онлайн-школы",
        subCategory: "Структурирование бизнеса",
        title: "Защита от рисков дробления бизнеса и налоговая амнистия",
        slug: "droblenie-biznesa-i-amnistiya",
        description: "Легальное разделение доходов/расходов между продюсером и экспертом. Применение налоговой амнистии при добровольном отказе от дробления групп родственных ИП/ООО. Контроль лимитов УСН.",
    },
    {
        id: "i2",
        categorySlug: "infobusiness",
        categoryName: "Инфобизнес и онлайн-школы",
        subCategory: "Учет массовых платежей",
        title: "Интеграция GetCourse, онлайн-касс и учет рассрочек",
        slug: "kassa-getcourse-rassrochki",
        description: "Синхронизация GetCourse, интернет-эквайрингов и онлайн-касс с 1С. Автоматические чеки по подпискам, защита от штрафов за непробитые чеки, учет банковских и внутренних рассрочек для учеников, оформление возвратов.",
    },

    // СЕГМЕНТ 4: СТАРТАПЫ
    {
        id: "s1",
        categorySlug: "startups",
        categoryName: "Стартапы и предприниматели",
        subCategory: "Расчет прибыльности",
        title: "Финансовое планирование и защита от кассовых разрывов",
        slug: "finplan-и-kassovye-razryvy",
        description: "Составление финплана до привлечения инвестиций. Расчет точки безубыточсти, юнит-экономики (CAC, LTV) и скорости расхода стартового капитала. График платежей для предотвращения нехватки живых денег.",
    },
    {
        id: "s2",
        categorySlug: "startups",
        categoryName: "Стартапы и предприниматели",
        subCategory: "Оформление документов",
        title: "Учет долей, инвестиционных займов и НМА",
        slug: "uchet-dolei-investiciy-nma",
        description: "Постановка на баланс разработанных программ, сайтов, патентов (НМА). Оформление договоров инвестиционных займов и распределения прибыли между партнерами. Валютный контроль при выручке от иностранных клиентов.",
    }
];

export const servicesRouter = createTRPCRouter({
    // Получить абсолютно все услуги
    getAll: publicProcedure.query(() => {
        return SERVICES_DATA;
    }),

    // Получить услуги, сгруппированные по уникальным категориям (для каталога)
    // Получить услуги, сгруппированные по уникальным категориям (для каталога)
    getCategories: publicProcedure.query(() => {
        // Типы для Map зафиксированы строго
        const categoriesMap = new Map<string, { slug: string; name: string }>();

        SERVICES_DATA.forEach((s) => {
            if (!categoriesMap.has(s.categorySlug)) {
                categoriesMap.set(s.categorySlug, { slug: s.categorySlug, name: s.categoryName });
            }
        });

        // ИСПРАВЛЕНО: Убрано избыточное выражение "as { slug: string; name: string }[]"
        return Array.from(categoriesMap.values());
    }),

    // Получить услуги конкретного сегмента
    getByCategory: publicProcedure
        .input(z.object({ categorySlug: z.string() }))
        .query(({ input }) => {
            return SERVICES_DATA.filter((s) => s.categorySlug === input.categorySlug);
        }),

    // Детальная страница конкретной точечной боли/услуги
    getBySlug: publicProcedure
        .input(z.object({ serviceSlug: z.string() }))
        .query(({ input }) => {
            const service = SERVICES_DATA.find((s) => s.slug === input.serviceSlug);
            return service ?? null;
        }),

    // Профессиональный метод формы контактов с полной валидацией данных на бэкенде
    submitContactForm: publicProcedure
        .input(
            z.object({
                name: z.string()
                    .min(2, { message: "Имя должно содержать не менее 2 символов" })
                    .max(50, { message: "Имя слишком длинное" }),
                email: z.string()
                    .email({ message: "Пожалуйста, введите корректный Email адрес" }),
                phone: z.string()
                    .min(10, { message: "Введите корректный номер телефона" })
                    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, { message: "Неверный формат телефона" }),
                company: z.string().optional(),
                message: z.string()
                    .min(10, { message: "Опишите вашу задачу подробнее (минимум 10 символов)" })
                    .max(1000, { message: "Сообщение не должно превышать 1000 символов" }),
            })
        )
        .mutation(async ({ input }) => {
            // Логгер отобразит входящие заявки клиентов прямо в консоли сервера сборки
            console.log("🔥 [Lead] Получена профессиональная заявка:", input);

            // Здесь в будущем можно подключить реальные модули (nodemailer, telegram-bot-api, crm-webhooks)

            return {
                success: true,
                message: "Ваша заявка успешно зарегистрирована. Ведущий специалист свяжется с вами в течение 15 минут.",
            };
        }),
});
