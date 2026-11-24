"use client";

import React, { useState } from "react";
import Link from "next/link";

const menuItems = [
    { label: "Главная", href: "/" },
    { label: "Услуги", href: "/services" },
    { label: "Блог", href: "/blog" },
    { label: "Цены", href: "/prices" },
    { label: "Контакты", href: "/contacts" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* ЛОГОТИП */}
                    <Link href="/" className="flex items-center gap-2 no-underline group">
                        <span className="text-xl font-black text-primary tracking-wider transition group-hover:opacity-80">
                            BALTEX
                        </span>
                        <span className="hidden text-xs text-muted-foreground sm:inline-block border-l border-border pl-2">
                            Аутсорсинг & Безопасность
                        </span>
                    </Link>

                    {/* ДЕСКТОПНОЕ МЕНЮ (Компьютеры) */}
                    <nav className="hidden items-center gap-6 md:flex">
                        {menuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                prefetch={false} // Защита для стабильности в Safari
                                className="text-sm font-medium text-foreground/70 no-underline transition-colors duration-200 hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ПРАВАЯ ЧАСТЬ: Кнопка действия + Мобильный гамбургер */}
                    <div className="flex items-center gap-4">
                        {/* Кнопка "Обсудить проект" (Заглушка под shadcn/ui) */}
                        <button className="hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground no-underline shadow-sm transition hover:bg-primary/90 md:block">
                            Обсудить проект
                        </button>

                        {/* Кнопка Мобильного Меню (Гамбургер) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden hover:bg-muted transition"
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://w3.org"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* МОБИЛЬНОЕ МЕНЮ (Выпадает на смартфонах при клике) */}
            {isOpen && (
                <div className="border-b border-border bg-background px-4 pt-2 pb-4 shadow-lg md:hidden animate-fade-in">
                    <nav className="flex flex-col gap-2">
                        {menuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                prefetch={false}
                                onClick={() => setIsOpen(false)} // Закрывает меню при переходе
                                className="rounded-lg px-3 py-2 text-base font-medium text-foreground/80 no-underline hover:bg-muted hover:text-primary transition"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition">
                            Обсудить проект
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
