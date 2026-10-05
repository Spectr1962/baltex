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
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 text-white antialiased backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-4 sm:px-6">
                {/* Логотип */}
                <Link
                    href="/"
                    className="text-xl font-black tracking-tighter text-white no-underline transition-colors hover:text-white/80"
                >
                    BALTEX<span className="text-[#0070f3]">.</span>
                </Link>

                {/* ДЕСКТОПНОЕ МЕНЮ (Отображается на компьютерах, скрывается на мобильных) */}
                <nav className="hidden items-center gap-8 md:flex">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="text-sm font-medium text-white/60 no-underline transition-colors duration-200 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Кнопка действия для ПК */}
                <div className="hidden md:block">
                    <Link
                        href="/contacts"
                        className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black no-underline transition-all duration-200 hover:bg-white/90"
                    >
                        Обсудить проект
                    </Link>
                </div>

                {/* КНОПКА-ГАМБУРГЕР ДЛЯ МОБИЛЬНЫХ (Отображается только на смартфонах) */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 focus:outline-none md:hidden"
                    aria-label="Переключить меню"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    <span
                        className={`h-0.5 w-6 origin-center bg-white transition-all duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45 bg-[#0070f3]" : ""}`}
                    />
                    <span
                        className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`h-0.5 w-6 origin-center bg-white transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45 bg-[#0070f3]" : ""}`}
                    />
                </button>
            </div>

            {isMobileMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="fixed inset-0 z-40 h-screen w-full bg-black p-6 md:hidden"
                >
                    <nav
                        aria-label="Мобильная навигация"
                        className="flex flex-col gap-6 p-6"
                    >
                        {menuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="border-b border-white/5 pb-3 text-xl font-bold text-white/80 no-underline transition-colors hover:text-[#0070f3]"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contacts"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mt-4 block w-full rounded-xl bg-[#0070f3] py-4 text-center text-sm font-bold text-white no-underline shadow-lg shadow-[#0070f3]/20 transition-all duration-200 hover:bg-[#0070f3]/90"
                        >
                            Обсудить проект
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
