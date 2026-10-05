"use client";

import { useState } from "react";

interface FaqItem {
    question: string;
    answer: string;
}

export function FaqSection() {
    // База самых частых вопросов клиентов бухгалтерских агентств
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
            answer: "Стоимость не является фиксированной и зависит от вашей системы налогообложения (УСН, ОСНО, Патент), объема ежемесячного документооборота (количества операций) и наличия специфических процессов, таких как учет маркировки «Честный ЗНАК» или валютный контроль при импорте.",
        },
        {
            question: "Можете ли вы помочь, если нам грозит выездная налоговая проверка?",
            answer: "Да, налоговый консалтинг и защита при проверках — наше ключевое направление. Мы готовим ответы на требования ФНС, сопровождаем генерального директора на допросах в налоговой, проверяем ваших поставщиков на наличие «разрывов» по НДС и легально снижаем риски доначислений.",
        },
    ];

    // Храним индекс открытого вопроса
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Микроразметка Schema.org FAQPage для роботов Яндекса и Google
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <>
            {/* Внедряем SEO-скрипт разметки */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="border-t border-white/5 py-20">
                <div className="max-w-3xl mx-auto">

                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                            Часто задаваемые вопросы
                        </h2>
                        <p className="text-sm sm:text-base text-white/50">
                            Отвечаем на главные вопросы собственников бизнеса о налогах, учете и ответственности
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-300"
                                >
                                    {/* Кнопка вопроса */}
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between text-left p-6 font-bold text-white hover:bg-white/[0.02] transition-colors duration-200 focus:outline-none"
                                    >
                                        <span className="text-base sm:text-lg tracking-tight pr-4">
                                            {item.question}
                                        </span>

                                        {/* Стильная минималистичная стрелочка */}
                                        <svg
                                            className={`w-5 h-5 text-white/40 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-[#0070f3]" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Блок ответа с плавной анимацией высоты */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] border-t border-white/5" : "max-h-0"
                                            }`}
                                    >
                                        <div className="p-6 text-sm sm:text-base text-white/60 leading-relaxed bg-black/[0.1]">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>
        </>
    );
}
