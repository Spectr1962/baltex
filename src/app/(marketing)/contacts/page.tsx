import type { Metadata } from "next";
import { ContactForm } from "~/app/_components/ContactForm";

export const metadata: Metadata = {
    title: "Контакты и реквизиты компании",
    description: "Официальные контакты бухгалтерского агентства Baltex. Адрес головного офиса в Москве, телефоны коммерческого отдела, реквизиты ООО и форма обратной связи.",
};

export default function ContactsPage() {
    // Микроразметка Schema.org стандарта Organization для красивого сниппета в Яндексе и Google
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Baltex",
        "url": "https://baltex.ru",
        "logo": "https://baltex.ru",
        "sameAs": [
            "https://t.me",
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+7 (495) 123-45-67",
            "contactType": "sales",
            "areaServed": "RU",
            "availableLanguage": "Russian"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Пресненская набережная, д. 12, Башня Федерация",
            "addressLocality": "Москва",
            "postalCode": "123112",
            "addressCountry": "RU"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-black text-white selection:bg-[#0070f3]/30">
                <div className="container mx-auto px-6 py-20 max-w-6xl">

                    {/* Верхний заголовок страницы */}
                    <div className="max-w-3xl mb-20 text-center md:text-left">
                        <span className="text-xs font-bold text-[#0070f3] uppercase tracking-widest bg-[#0070f3]/5 px-4 py-2 rounded-full border border-[#0070f3]/10 inline-block mb-4">
                            Связь с экспертами
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
                            Контакты и реквизиты
                        </h1>
                        <p className="text-lg text-white/50 leading-relaxed">
                            Свяжитесь с нами напрямую или отправьте техническое задание через форму. Мы оперативно проведем экспресс-анализ вашей ситуации и подготовим коммерческое предложение.
                        </p>
                    </div>

                    {/* Главная асимметричная сетка */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">

                        {/* Левая колонка (5/12 ширины): Информационные блоки */}
                        <div className="lg:col-span-5 flex flex-col gap-10">

                            {/* Блок: Телефон */}
                            <div>
                                <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                                    Коммерческий отдел
                                </span>
                                <a
                                    href="tel:+74951234567"
                                    className="text-3xl sm:text-4xl font-black text-white tracking-tight hover:text-[#0070f3] transition-colors duration-200"
                                >
                                    +7 (495) 123-45-67
                                </a>
                                <p className="text-xs text-white/40 mt-2">
                                    Принимаем звонки и обращения с 09:00 до 19:00 (Пн — Пт)
                                </p>
                            </div>

                            {/* Блок: Почта */}
                            <div>
                                <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                                    Для документации и ТЗ
                                </span>
                                <a
                                    href="mailto:info@baltex.ru"
                                    className="text-lg font-semibold text-white/80 border-b border-white/10 hover:text-white hover:border-[#0070f3] transition-colors duration-200 pb-0.5"
                                >
                                    info@baltex.ru
                                </a>
                            </div>

                            {/* Блок: Telegram кнопка */}
                            <div>
                                <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                                    Быстрая связь
                                </span>
                                <a
                                    href="https://t.me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#0070f3]/5 border border-[#0070f3]/20 hover:bg-[#0070f3]/10 hover:border-[#0070f3] text-[#0070f3] text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200"
                                >
                                    Написать в Telegram
                                </a>
                            </div>

                            {/* Блок: Адрес */}
                            <div className="border-t border-white/5 pt-8">
                                <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                                    Головной офис
                                </span>
                                <p className="text-lg font-semibold text-white leading-relaxed tracking-tight">
                                    123112, г. Москва, Пресненская набережная, д. 12, Башня Федерация, офис 45
                                </p>
                            </div>

                            {/* Юридический блок (Важнейший коммерческий фактор для SEO) */}
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl text-xs text-white/40 leading-relaxed shadow-sm">
                                <span className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-4">
                                    Юридическая информация
                                </span>
                                <div className="space-y-1.5">
                                    <p><strong className="text-white/60 font-medium">Организация:</strong> ООО «БАЛЬТЕХ АВТОМАТИЗАЦИЯ»</p>
                                    <p><strong className="text-white/60 font-medium">ИНН / КПП:</strong> 7703456789 / 770301001</p>
                                    <p><strong className="text-white/60 font-medium">ОГРН:</strong> 1237700456789</p>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка (7/12 ширины): Премиальная бриф-форма */}
                        <div className="lg:col-span-7 relative">
                            {/* Мягкое фоновое свечение за формой */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#0070f3]/5 to-transparent blur-3xl rounded-3xl -z-10" />
                            <ContactForm />
                        </div>

                    </div>

                    {/* Интерактивная карта проезда во всю ширину */}
                    <div className="w-full h-[450px] border border-white/5 rounded-3xl overflow-hidden shadow-2xl filter grayscale contrast-125 invert opacity-75 hover:opacity-90 transition-all duration-300">
                        <iframe
                            src="https://yandex.ru"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen={true}
                            title="Офис компании Baltex на карте"
                            className="w-full h-full"
                        />
                    </div>

                </div>
            </div>
        </>
    );
}
