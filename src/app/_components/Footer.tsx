"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background/50 text-muted-foreground backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                    {/* ЛОГОТИП И ПОДПИСЬ В ПОДВАЛЕ */}
                    <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-primary tracking-wider">
                            BALTEX
                        </span>
                        <span className="text-xs text-muted-foreground/40">|</span>
                        <span className="text-xs text-muted-foreground">
                            Налоговая безопасность и аутсорсинг
                        </span>
                    </div>

                    {/* КОПИРАЙТ */}
                    <p className="text-xs text-muted-foreground/60 order-last sm:order-none">
                        &copy; {currentYear} ООО «Балтекс». Все права защищены.
                    </p>

                    {/* ЮРИДИЧЕСКИЕ ССЫЛКИ */}
                    <div className="flex gap-6 text-xs">
                        <Link
                            href="/privacy"
                            prefetch={false}
                            className="no-underline text-muted-foreground/80 transition-colors hover:text-primary"
                        >
                            Политика конфиденциальности
                        </Link>
                        <Link
                            href="/terms"
                            prefetch={false}
                            className="no-underline text-muted-foreground/80 transition-colors hover:text-primary"
                        >
                            Условия использования
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
