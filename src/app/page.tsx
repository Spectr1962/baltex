"use client";

import { useState } from "react";
import Link from "next/link";
import { HomeContactForm } from "~/app/_components/HomeContactForm";


interface FaqItem {
  question: string;
  answer: string;
}

export default function HomePage() {
  // === СОСТОЯНИЯ ДЛЯ ИНТЕРАКТИВНЫХ БЛОКОВ ===
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // === ДАННЫЕ ДЛЯ БЛОКА FAQ ===
  const faqData: FaqItem[] = [
    {
      question: "Какую финансовую ответственность вы несете в случае ошибок?",
      answer: "Полную материальную ответственность мы официально фиксируем в договоре сопровождения. Если по нашей вине налоговая служба выставит вам штраф или пени, наше агентство полностью компенсирует эти расходы за свой счет. Наша профессиональная деятельность застрахована.",
    },
    {
      question: "Как происходит процесс передачи документов от старого бухгалтера?",
      answer: "Максимально незаметно для вас. Мы сами связываемся с вашим предыдущим бухгалтером или аудитором, запрашиваем архив электронных баз 1С, первичную документацию и ключи отчетности. После этого наши эксперты проводят экспресс-аудит остатков и безболезненно принимают дела.",
    },
    {
      question: "Как рассчитывается стоимость бухгалтерского сопровождения?",
      answer: "Стоимость не является фиксированной и зависит от вашей системы налогообложения (УСН, ОСНО, Патент), объема документооборота (количества операций) и наличия специфических процессов, таких как учет маркировки «Честный ЗНАК» или валютный контроль.",
    },
    {
      question: "Можете ли вы помочь, если нам грозит выездная налоговая проверка?",
      answer: "Да, налоговый консалтинг и защита при проверках — наше ключевое направление. Мы готовим ответы на требования ФНС, сопровождаем генерального директора на допросах, проверяем ваших поставщиков на наличие «разрывов» по НДС и легально снижаем риски доначислений.",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 bg-black text-white antialiased selection:bg-[#0070f3]/30">

      {/* 1. HERO SECTION (ГЛАВНЫЙ ЭКРАН) */}
      <section className="py-24 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold text-[#0070f3] uppercase tracking-widest bg-[#0070f3]/5 px-4 py-2 rounded-full border border-[#0070f3]/10 inline-block mb-6">
          Агентство налоговой безопасности
        </span>
        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-white">
          Профессиональный учет и <span className="text-[#0070f3]">налоговая безопасность</span> вашего бизнеса
        </h1>
        <p className="text-base sm:text-xl text-white/50 mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
          Агентство Baltex берет на себя полную ответственность за вашу бухгалтерию. Защищаем от доначислений ФНС, легально оптимизируем налоги и настраиваем прозрачный финансовый учет под ключ.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/services" className="w-full sm:w-auto px-8 py-4 bg-[#0070f3] hover:bg-[#0070f3]/90 text-white font-bold text-sm rounded-full transition-all duration-200 text-center shadow-lg shadow-[#0070f3]/20">
            Отраслевые решения
          </Link>
          <Link href="/contacts" className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/20 text-white font-bold text-sm rounded-full transition-all duration-200 text-center bg-transparent">
            Рассчитать стоимость учета
          </Link>
        </div>
      </section>
      {/* 2. БЛОК ПРЕИМУЩЕСТВ (ТРАСТ-ФАКТОРЫ) */}
      <section className="py-12 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div className="text-4xl sm:text-5xl font-black text-[#0070f3] tracking-tight">100%</div>
            <p className="text-sm text-white/40 mt-2 font-medium leading-snug">Финансовая ответственность, прописанная в договоре</p>
          </div>
          <div className="p-4">
            <div className="text-4xl sm:text-5xl font-black text-[#0070f3] tracking-tight">40+</div>
            <p className="text-sm text-white/40 mt-2 font-medium leading-snug">Успешно пройденных выездных и камеральных проверок</p>
          </div>
          <div className="p-4">
            <div className="text-4xl sm:text-5xl font-black text-[#0070f3] tracking-tight">98%</div>
            <p className="text-sm text-white/40 mt-2 font-medium leading-snug">Наших клиентов проходят аудит ФНС без доначислений</p>
          </div>
        </div>
      </section>

      {/* 3. НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ (ОТРАСЛИ) */}
      <section className="py-20 border-t border-white/5">
        <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center tracking-tight">
          Основные направления деятельности
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Карта: Маркетплейсы */}
          <div className="border border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/30 border border-purple-900/50 px-2.5 py-1 rounded-full inline-block mb-4">E-commerce</span>
              <h3 className="text-xl font-bold mb-3 text-white">Для маркетплейсов</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Учет УСН со всей суммы продаж до вычета комиссий WB/Ozon. Контроль лимитов выручки, белый импорт и интеграция с системой «Честный ЗНАК».
              </p>
            </div>
            <Link href="/services/marketplaces" className="text-sm font-bold text-[#0070f3] hover:text-[#0070f3]/80 inline-flex items-center gap-1 mt-auto">
              Подробнее <span className="text-xs">&rarr;</span>
            </Link>
          </div>

          {/* Карта: Производство */}
          <div className="border border-white/5 bg-white/[0.01] hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/30 border border-amber-900/50 px-2.5 py-1 rounded-full inline-block mb-4">Промышленность</span>
              <h3 className="text-xl font-bold mb-3 text-white">Для производства</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Точная калькуляция себестоимости единицы продукции, учет брака и технологических потерь сырья. Защита от разрывов НДС по поставщикам.
              </p>
            </div>
            <Link href="/services/manufacturing" className="text-sm font-bold text-[#0070f3] hover:text-[#0070f3]/80 inline-flex items-center gap-1 mt-auto">
              Подробнее <span className="text-xs">&rarr;</span>
            </Link>
          </div>

          {/* Карта: Инфобизнес */}
          <div className="border border-white/5 bg-white/[0.01] hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(0,112,243,0.05)] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/30 border border-blue-900/50 px-2.5 py-1 rounded-full inline-block mb-4">Online-Школы</span>
              <h3 className="text-xl font-bold mb-3 text-white">Для инфобизнеса</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Исключение рисков дробления бизнеса, применение налоговой амнистии. Автоматизация чеков GetCourse, рассрочек и эквайрингов в 1С.
              </p>
            </div>
            <Link href="/services/infobusiness" className="text-sm font-bold text-[#0070f3] hover:text-[#0070f3]/80 inline-flex items-center gap-1 mt-auto">
              Подробнее <span className="text-xs">&rarr;</span>
            </Link>
          </div>

          {/* Карта: Стартапы */}
          <div className="border border-white/5 bg-white/[0.01] hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/30 border border-emerald-900/50 px-2.5 py-1 rounded-full inline-block mb-4">IT & Venture</span>
              <h3 className="text-xl font-bold mb-3 text-white">Для стартапов</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Защита от кассовых разрывов через платежные календари. Правильная постановка разработанного ПО и патентов на баланс в качестве НМА.
              </p>
            </div>
            <Link href="/services/startups" className="text-sm font-bold text-[#0070f3] hover:text-[#0070f3]/80 inline-flex items-center gap-1 mt-auto">
              Подробнее <span className="text-xs">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ЭТАПЫ СОТРУДНИЧЕСТВА */}
      <section className="py-20 border-t border-white/5 bg-white/[0.003] rounded-3xl my-6 px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-black mb-3 text-center tracking-tight">
          Комфортный переход на наш учет за 3 шага
        </h2>
        <p className="text-center text-white/50 mb-16 text-sm sm:text-base max-w-xl mx-auto">
          Полностью контролируем процесс и берем на себя все переговоры с вашим прошлым бухгалтером
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-2">
            <div className="text-sm font-black text-[#0070f3] uppercase tracking-wider mb-3">01 / Экспресс-аудит</div>
            <p className="text-sm text-white/60 leading-relaxed">
              Подключаемся к вашей 1С, находим скрытые налоговые риски, ошибки прошлых периодов и переплаты по налогам. Безболезненно для текущих процессов.
            </p>
          </div>
          <div className="p-2">
            <div className="text-sm font-black text-[#0070f3] uppercase tracking-wider mb-3">02 / Прием дел и баз</div>
            <p className="text-sm text-white/60 leading-relaxed">
              Сами запрашиваем архив документов и ключи у предыдущего бухгалтера. Закрепляем за вами профильного главбуха, знающего специфику вашей ниши.
            </p>
          </div>
          <div className="p-2">
            <div className="text-sm font-black text-[#0070f3] uppercase tracking-wider mb-3">03 / Регулярное ведение</div>
            <p className="text-sm text-white/60 leading-relaxed">
              Сдаем отчетность без задержек, контролируем лимиты, оптимизируем НДС, берем на себя требования ФНС и присылаем понятные отчеты о налогах.
            </p>
          </div>
        </div>
      </section>
      {/* 5. ОТЗЫВЫ КЛИЕНТОВ (ПОЛНОСТЬЮ НА TAILWIND) */}
      <section className="py-20 border-t border-white/5">
        <h2 className="text-3xl sm:text-4xl font-black mb-3 text-center tracking-tight">
          Что говорят о нас клиенты
        </h2>
        <p className="text-center text-white/50 mb-16 text-sm sm:text-base max-w-xl mx-auto">
          Истории реального бизнеса, защищенного от штрафов и доначислений
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl flex flex-col justify-between">
            <p className="text-sm text-white/70 leading-relaxed mb-6 italic">
              «Перешли в Baltex, когда оборот превысил 5 млн в месяц. Ребята из Baltex за 2 недели восстановили учет за весь год, настроили автоматическую выгрузку отчетов по API и спасли нас от доначислений».
            </p>
            <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#0070f3] flex items-center justify-center font-bold text-sm text-white">МК</div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Михаил Краснов</h4>
                <span className="text-[11px] text-white/40 block mt-0.5">Основатель бренда одежды, WB / Ozon</span>
              </div>
            </div>
          </div>
          <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl flex flex-col justify-between">
            <p className="text-sm text-white/70 leading-relaxed mb-6 italic">
              «Эксперты Baltex разработали для нас четкую, белую структуру группы компаний, провели аудит связок GetCourse с онлайн-кассами и помогли безболезненно войти под налоговую амнистию».
            </p>
            <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#0070f3] flex items-center justify-center font-bold text-sm text-white">ЕН</div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Елена Некрасова</h4>
                <span className="text-[11px] text-white/40 block mt-0.5">Сооснователь онлайн-школы</span>
              </div>
            </div>
          </div>
          <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl flex flex-col justify-between">
            <p className="text-sm text-white/70 leading-relaxed mb-6 italic">
              «Сотрудничаем более двух лет по полному ведению ОСНО. За это время прошли одну выездную проверку — благодаря юристам и аудиторам Baltex, ни единого замечания и разрыва по НДС».
            </p>
            <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#0070f3] flex items-center justify-center font-bold text-sm text-white">ВП</div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">Виктор Поляков</h4>
                <span className="text-[11px] text-white/40 block mt-0.5">Генеральный директор ООО «ПолиПром»</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ИНТЕРАКТИВНЫЙ БЛОК ВОПРОС-ОТВЕТ (FAQ) — ПОЛНОСТЬЮ НА TAILWIND */}
      <section className="py-20 border-t border-white/5 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black mb-3 text-center tracking-tight">
          Часто задаваемые вопросы
        </h2>
        <p className="text-center text-white/50 mb-12 text-sm sm:text-base">
          Отвечаем на главные вопросы собственников бизнеса о налогах, учете и ответственности
        </p>
        <div className="space-y-3">
          {faqData.map((item, index) => {
            // ИСПРАВЛЕНО: Строго проверяем индекс через правильное состояние openFaqIndex
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left p-5 font-bold text-white hover:bg-white/[0.02] transition-colors focus:outline-none"
                >
                  {/* Текст вопроса */}
                  <span className="text-sm sm:text-base tracking-tight pr-4 text-white">
                    {item.question}
                  </span>

                  {/* Исправленная иконка стрелочки: добавлены точные размеры в пикселях и flex-shrink-0 */}
                  <svg
                    className={`w-4 h-4 min-w-[16px] min-h-[16px] text-white/40 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180 text-[#0070f3]" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ width: "16px", height: "16px" }} // Жесткая страховка для Safari
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>


                {/* Анимация раскрытия ответа */}
                <div
                  className={`transition-all duration-200 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"
                    }`}
                >
                  <div className="p-5 text-xs sm:text-sm text-white/60 leading-relaxed bg-black/20">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 7. БЛОК СТАТЕЙ ИЗ БЛОГА */}
      <section className="py-20 border-t border-white/5">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Полезно знать: Блог компании</h2>
          <Link href="/blog" className="text-sm font-semibold text-[#0070f3] hover:text-[#0070f3]/80 no-underline transition-colors">
            Все статьи &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/blog/marketplaces/uchet-compensaciy-marketplaces" className="group flex flex-col no-underline text-white">
            <div className="aspect-video w-full bg-white/[0.02] border border-white/5 rounded-xl mb-4 transition-transform duration-200 group-hover:translate-y-[-2px]" />
            <span className="text-[10px] font-bold text-[#0070f3] uppercase tracking-wider mb-2 block">Маркетплейсы</span>
            <h3 className="text-lg font-bold mb-2 group-hover:text-[#0070f3] transition-colors leading-snug">Как учитывать компенсации маркетплейсов за утерянный товар</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed m-0 line-clamp-2">Разбираем правила налогообложения выплат от Ozon и Wildberries в 1С. Как не попасть на скрытые доначисления УСН.</p>
          </Link>

          <Link href="/blog/infobusiness/nalogovaya-amnistiya-infobiznes" className="group flex flex-col no-underline text-white">
            <div className="aspect-video w-full bg-white/[0.02] border border-white/5 rounded-xl mb-4 transition-transform duration-200 group-hover:translate-y-[-2px]" />
            <span className="text-[10px] font-bold text-[#0070f3] uppercase tracking-wider mb-2 block">Налоговые риски</span>
            <h3 className="text-lg font-bold mb-2 group-hover:text-[#0070f3] transition-colors leading-snug">Налоговая амнистия: как онлайн-школе уйти от рисков дробления</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed m-0 line-clamp-2">Критерии взаимозависимости родственных ИП. Как легально разделить доходы и зоны ответственности между продюсером и экспертом.</p>
          </Link>
        </div>
      </section>

      {/* 8. ПРЕМИАЛЬНАЯ ФОРМА ОБРАТНОЙ СВЯЗИ */}
      <HomeContactForm />

      {/* 9. БЛОК КОНТАКТОВ И РЕКВИЗИТОВ */}
      <section className="border-t border-white/5 py-20 mt-12 bg-black text-white antialiased">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Левая колонка: Прямая связь и каналы коммуникации */}
          <div className="flex flex-col gap-10">
            <div>
              <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                Коммерческий отдел
              </span>
              <a
                href="tel:+74951234567"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight hover:text-[#0070f3] transition-colors duration-200 no-underline"
              >
                +7 (495) 123-45-67
              </a>
              <p className="text-xs text-white/40 mt-2">
                Принимаем звонки и обращения с 09:00 до 19:00 (Пн — Пт)
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                Для документации и ТЗ
              </span>
              <a
                href="mailto:info@baltex.ru"
                className="text-base font-semibold text-white/80 border-b border-white/10 hover:text-white hover:border-[#0070f3] transition-colors duration-200 pb-0.5 no-underline"
              >
                info@baltex.ru
              </a>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                Быстрая связь
              </span>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0070f3]/5 border border-[#0070f3]/20 hover:bg-[#0070f3]/10 hover:border-[#0070f3] text-[#0070f3] text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-200 no-underline"
              >
                Написать в Telegram
              </a>
            </div>
          </div>

          {/* Правая колонка: Физический адрес и официальные реквизиты ООО (E-E-A-T факторы) */}
          <div className="flex flex-col gap-10">
            <div>
              <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                Головной офис
              </span>
              <p className="text-lg font-semibold text-white leading-relaxed tracking-tight">
                123112, г. Москва, Пресненская набережная, д. 12, Башня Федерация, офис 45
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-xl text-xs text-white/40 leading-relaxed shadow-sm">
              <span className="block text-[10px] font-bold text-white/70 uppercase tracking-wider mb-4">
                Юридическая информация
              </span>
              <div className="space-y-1">
                <p>
                  <strong className="text-white/60 font-medium">Организация:</strong> ООО «БАЛЬТЕХ АВТОМАТИЗАЦИЯ»
                </p>
                <p>
                  <strong className="text-white/60 font-medium">ИНН / КПП:</strong> 7703456789 / 770301001
                </p>
                <p>
                  <strong className="text-white/60 font-medium">ОГРН:</strong> 1237700456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div> // Закрывает корневой контейнер <div className="max-w-[1200px] ...">
  ); // Закрывает конструкцию return
}
