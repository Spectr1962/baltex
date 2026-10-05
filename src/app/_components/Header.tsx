"use client";

import Link from "next/link";

export function Header() {
    // ИСПРАВЛЕНО: Теперь "Контакты" добавлены в общий массив ссылок меню
    const navLinks = [
        { name: "Главная", href: "/" },
        { name: "Услуги", href: "/services" },
        { name: "Блог", href: "/blog" },
        { name: "С кем работаем", href: "/clients" },
        { name: "Цены", href: "/prices" },
        { name: "Контакты", href: "/contacts" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

                {/* Логотип */}
                <Link
                    href="/"
                    className="text-xl font-black tracking-tighter text-white no-underline transition-opacity hover:opacity-90"
                >
                    BALTEX<span className="text-[#0070f3]">.</span>
                </Link>

                {/* Навигационные ссылки */}
                <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-white no-underline transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Правая кнопка действия (CTA) */}
                <div>
                    <Link
                        href="/contacts"
                        className="text-xs sm:text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full no-underline hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-sm"
                    >
                        Обсудить проект
                    </Link>
                </div>

            </div>
        </header>
    );
}
