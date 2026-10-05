import { notFound } from "next/navigation";
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

interface Props {
  params: Promise<{
    categorySlug: string;
  }>;
}

// 🏢 ПОЛНАЯ БАЗА ДАННЫХ ДЛЯ КАЖДОГО ОТРАСЛЕВОГО ЛЕНДИНГА
const STRATEGIC_CONTENT: Record<
  string,
  {
    title: string;
    subtitle: string;
    heroDesc: string;
    painTitle: string;
    pains: { title: string; desc: string }[];
    features: string[];
    resultTitle: string;
    resultDesc: string;
  }
> = {
  marketplaces: {
    title: "Бухгалтерия для Маркетплейсов",
    subtitle: "Селлеры Wildberries, Ozon, Яндекс Маркет",
    heroDesc: "Защищаем селлеров от скрытых штрафов площадок и доначислений ФНС. Настраиваем автоматическую интеграцию отчетов по API и берем на себя учет Честного ЗНАКа.",
    painTitle: "Критические проблемы селлеров, которые мы закрываем:",
    pains: [
      { title: "Занижение налоговой базы", desc: "Многие бухгалтеры ошибочно считают налог с суммы, пришедшей на карту, а не с финальной цены продажи до вычета комиссий WB/Ozon. Это гарантированный штраф и доначисление от ФНС. Мы считаем налоги строго по закону." },
      { title: "Хаос с возвратами и утерями", desc: "Площадки постоянно теряют, утилизируют или компенсируют товар. Мы корректно проводим эти операции в 1С, предотвращая кассовые разрывы и переплаты." },
      { title: "Белый импорт и Карго", desc: "Помогаем безболезненно легализовать остатки и перейти с серых схем доставки из Китая на официальные ГТД и валютный контроль." }
    ],
    features: ["Учет УСН/ОСНО со всей суммы продаж", "Авто-выгрузка отчетов о реализации по API", "Контроль лимитов выручки", "Работа с Честным ЗНАКом под ключ"],
    resultTitle: "Результат для селлера",
    resultDesc: "Ваш лимит УСН под строгим контролем, налоги рассчитаны копейка в копейку, а автоматизация экономит до 40 часов вашей команды в месяц."
  },
  manufacturing: {
    title: "Учет для Производственных Компаний",
    subtitle: "Заводы, фабрики, промышленные цеха",
    heroDesc: "Организуем прозрачный учет себестоимости, материалов и незавершенного производства. Защищаем от выездных проверок и блокировок счетов из-за разрывов НДС.",
    painTitle: "Сложные производственные вызовы, которые мы берем на себя:",
    pains: [
      { title: "Искажение себестоимости", desc: "Без точного распределения аренды цехов, амортизации станков и зарплат рабочих невозможно понять реальную маржинальность партий. Мы выстраиваем честную калькуляцию." },
      { title: "Технологические потери и брак", desc: "ФНС тщательно проверяет списание сырья. Если расходы превышают нормативы, налоговая признает это скрытой прибылью. Мы жестко контролируем документальное обоснование." },
      { title: "Встречные проверки поставщиков", desc: "Производство зависит от подрядчиков. Проверяем каждого контрагента, исключая риски «налоговых разрывов» по НДС." }
    ],
    features: ["Расчет реальной себестоимости единицы продукции", "Учет незавершенного производства (НЗП)", "Разработка норм списания сырья и брака", "Сложный кадровый учет и сменные графики"],
    resultTitle: "Результат для директора",
    resultDesc: "Вы видите точную управленческую себестоимость каждой детали, кадровые риски сведены к нулю, а любая камеральная проверка проходит без доначислений."
  },
  infobusiness: {
    title: "Сопровождение Онлайн-Школ и Инфобизнеса",
    subtitle: "Продюсеры, топ-эксперты и блогеры",
    heroDesc: "Легально защищаем крупные онлайн-школы от обвинений в дроблении бизнеса. Настраиваем автоматический учет тысяч транзакций, рассрочек и GetCourse.",
    painTitle: "Налоговые риски инфобизнеса, которые мы ликвидируем:",
    pains: [
      { title: "Опасность дробления (Кейсы Блиновской/Лерчек)", desc: "Использование сети родственных ИП для удержания лимитов УСН — главный триггер для ФНС. Мы выстраиваем безопасную холдинговую структуру и помогаем войти под налоговую амнистию." },
      { title: "Кассовый хаос с GetCourse", desc: "Массовые платежи, рассрочки, возвраты курсов и авто-чеки часто не бьются с 1С. Наш технический отдел автоматизирует связку эквайринга, касс и GetCourse." },
      { title: "Договоры между Продюсером и Экспертом", desc: "Разрабатываем соглашения, которые защищают ваши авторские права и легально распределяют миллионные доходы без вызова подозрений у финмониторинга." }
    ],
    features: ["Защита от обвинений в дроблении бизнеса", "Внедрение официальной налоговой амнистии", "Синхронизация GetCourse и эквайрингов с 1С", "Учет банковских и внутренних рассрочек"],
    resultTitle: "Результат для продюсера",
    resultDesc: "Ваша школа работает в абсолютно белом поле, автоматика пробивает 100% чеков без штрафов, а финансовые потоки между партнерами прозрачны и безопасны."
  },
  startups: {
    title: "Финансовый Учет для Стартапов и IT",
    subtitle: "Проекты на этапе запуска и масштабирования",
    heroDesc: "Помогаем защитить бизнес от кассовых разрывов до привлечения инвестиций. Корректно ставим программное обеспечение на баланс и ведем учет долей.",
    painTitle: "Проблемы роста стартапов, которые мы решаем:",
    pains: [
      { title: "Виртуальная прибыль и пустой счет", desc: "Без платежного календаря легко пропустить момент, когда расходы на маркетинг и команду превысят приток живых денег. Мы внедряем жесткое планирование и считаем Burn Rate." },
      { title: "Нематериальные активы (НМА)", desc: "Код, дизайн сайта, патенты и товарные знаки нужно правильно оценить и поставить на баланс компании, чтобы повысить капитализацию для инвесторов. Мы делаем это по стандартам РСБУ." },
      { title: "Инвестиционные займы и опционы", desc: "Оформляем сложные договоры конвертируемого займа, распределения долей между фаундерами и валютный контроль при работе с зарубежными клиентами." }
    ],
    features: ["Внедрение платежного календаря (анти-разрыв)", "Расчет юнит-экономики (CAC, LTV)", "Капитализация разработанного ПО в качестве НМА", "Оформление инвестиционных сделок и долей"],
    resultTitle: "Результат для основателя",
    resultDesc: "У вас на руках понятная финансовая модель для защиты перед инвесторами, НМА защищены авторским правом на балансе, а кассовые разрывы исключены на опережение."
  }
};

export async function generateMetadata({ params }: Props) {
  const { categorySlug } = await params;
  const content = STRATEGIC_CONTENT[categorySlug];
  if (!content) return { title: "Направление не найдено" };
  return {
    title: `${content.title} | Услуги Baltex`,
    description: content.heroDesc,
  };
}
export default async function ServiceCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const content = STRATEGIC_CONTENT[categorySlug];

  if (!content) notFound();

  // Подгружаем точечные тарифные блоки из бэкенда tRPC
  void api.services.getByCategory.prefetch({ categorySlug });
  const services = await api.services.getByCategory({ categorySlug });

  return (
    <HydrateClient>
      <div className="min-h-screen bg-black text-white selection:bg-[#0070f3]/30 py-16">
        <div className="container mx-auto px-6 max-w-5xl">

          {/* Хлебные крошки */}
          <nav className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-8">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            {" / "}
            <Link href="/services" className="hover:text-white transition-colors">Услуги</Link>
            {" / "}
            <span className="text-white/80">{content.title}</span>
          </nav>

          {/* 1. HERO ОТРАСЛИ */}
          <header className="mb-20 max-w-4xl">
            <span className="text-[10px] font-bold text-[#0070f3] uppercase tracking-widest bg-[#0070f3]/5 px-4 py-2 rounded-full border border-[#0070f3]/10 inline-block mb-4">
              {content.subtitle}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              {content.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-normal">
              {content.heroDesc}
            </p>
          </header>

          {/* 2. БЛОК СТРАТЕГИЧЕСКИХ БОЛЕЙ (Разбор рисков) */}
          <section className="border-t border-white/5 py-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-10">
              {content.painTitle}
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {content.pains.map((pain, pIndex) => (
                <div key={pIndex} className="border border-white/5 bg-white/[0.005] p-6 sm:p-8 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                    <span className="text-[#0070f3]">✕</span> {pain.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                    {pain.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {/* 3. КАТАЛОГ СЛУЖЕБНЫХ ПАКЕТОВ / ТАРИФОВ ИЗ БД */}
          <section className="border-t border-white/5 py-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              Варианты решений и модули учета
            </h2>
            <p className="text-sm text-white/40 mb-10">Выберите необходимый формат интеграции или закажите комплексное ведение</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service.id} className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-6 rounded-2xl flex flex-col justify-between transition-all duration-200">
                  <div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">{service.subCategory}</span>
                    <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed mb-6">{service.description}</p>
                  </div>
                  <Link
                    href={`/services/${service.categorySlug}/${service.slug}`}
                    className="w-full text-center bg-white/5 hover:bg-[#0070f3] text-white font-bold text-xs py-3 rounded-xl transition-all duration-200 mt-4 block"
                  >
                    Открыть полную спецификацию &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 4. ФИНАЛЬНЫЙ РЕЗУЛЬТАТ (Траст) */}
          <section className="border-t border-white/5 py-16 mb-10">
            <div className="bg-gradient-to-b from-white/[0.01] to-transparent border border-white/5 p-8 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-3">{content.resultTitle}</h2>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">{content.resultDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.features.map((feat, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3 text-xs font-semibold text-white/80">
                    <span className="text-[#0070f3] text-base">✓</span> {feat}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-center sm:text-left">
                <Link href="/contacts" className="inline-block bg-[#0070f3] hover:bg-[#0070f3]/90 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md">
                  Оставить заявку на бриф ниши
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </HydrateClient>
  );
}
