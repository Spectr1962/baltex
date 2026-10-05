"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
    // Состояние для открытия/закрытия мобильного меню
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { label: "Главная", href: "/" },
        { label: "Услуги", href: "/services" },
        { label: "Блог", href: "/blog" },
        { label: "С кем работаем", href: "/#clients" },
        { label: "Цены", href: "/prices" },
        { label: "Контакты", href: "/contacts" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md text-white antialiased">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

                {/* Логотип */}
                <Link href="/" className="text-xl font-black tracking-tighter text-white no-underline hover:text-white/80 transition-colors">
                    BALTEX<span className="text-[#0070f3]">.</span>
                </Link>

                {/* ДЕСКТОПНОЕ МЕНЮ (Отображается на компьютерах, скрывается на мобильных) */}
                <nav className="hidden md:flex items-center gap-8">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="text-sm font-medium text-white/60 hover:text-white no-underline transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Кнопка действия для ПК */}
                <div className="hidden md:block">
                    <Link href="/contacts" className="bg-white text-black hover:bg-white/90 font-bold text-xs px-5 py-2.5 rounded-full no-underline transition-all duration-200">
                        Обсудить проект
                    </Link>
                </div>

                {/* КНОПКА-ГАМБУРГЕР ДЛЯ МОБИЛЬНЫХ (Отображается только на смартфонах) */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none z-50"
                    aria-label="Переключить меню"
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-[#0070f3]" : ""}`} />
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#0070f3]" : ""}`} />
                </button>

            </div>

            {/* МОБИЛЬНАЯ ШТОРКА (Выезжает плавно при клике на гамбургер) */}
            <div
                className={`fixed inset-0 top-20 bg-black z-40 md:hidden transition-all duration-300 ease-in-out border-t border-white/5 ${isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                <nav className="flex flex-col p-6 gap-6">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)} // Закрываем меню при клике на ссылку
                            className="text-xl font-bold text-white/80 hover:text-[#0070f3] no-underline transition-colors border-b border-white/5 pb-3"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/contacts"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full text-center bg-[#0070f3] hover:bg-[#0070f3]/90 text-white font-bold text-sm py-4 rounded-xl no-underline transition-all duration-200 mt-4 block"
                    >
                        Обсудить проект
                    </Link>
                </nav>
            </div>
        </header>
    );
}
