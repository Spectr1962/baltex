import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "~/app/_components/Header"; // Импортируем наше новое меню
import { Footer } from "~/app/_components/Footer"; // Импортируем наш новый подвал

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://baltexx.ru"), // ИСПРАВЛЕНО: Указан ваш актуальный боевой домен
  title: {
    template: "%s | Baltex",
    default: "Baltex — Профессиональный бухгалтерский учет и налоговая безопасность",
  },
  description: "Экспертное бухгалтерское сопровождение и легальная налоговая оптимизация для маркетплейсов, производства, инфобизнеса и стартапов от компании Baltex. 100% финансовая ответственность по договору.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: "./",
  },

  // === ФИЧИ ДЛЯ НАВТИВНОЙ УСТАНОВКИ НА IOS (IPHONE / IPAD) ===
  appleWebApp: {
    capable: true, // Позволяет сайту запускаться во весь экран без элементов браузера Safari
    title: "Baltex", // Короткое имя приложения под иконкой на домашнем экране
    statusBarStyle: "black-translucent", // Делает верхний статус-бар телефона (время, батарея) стильным и прозрачным
  },

  openGraph: {
    title: "Baltex — Налоговая безопасность и учет для бизнеса",
    description: "Комплексные бизнес-решения, защита от доначислений ФНС, отраслевые тарифы, база знаний и контакты компании Baltex.",
    url: "https://baltexx.ru", // ИСПРАВЛЕНО: Актуальный домен для шеринга в соцсетях
    siteName: "Baltex",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geist.variable}`}>
      <body style={{ margin: 0, padding: 0, fontFamily: "var(--font-geist-sans), sans-serif", backgroundColor: "#000", color: "#fff" }}>
        <TRPCReactProvider>

          {/* РАЗБИТО НА КОМПОНЕНТЫ: Современное меню */}
          <Header />

          {/* Основной контент страниц */}
          <main style={{ minHeight: "calc(100vh - 4rem)" }}>
            {children}
          </main>

          {/* РАЗБИТО НА КОМПОНЕНТЫ: Аккуратный подвал */}
          <Footer />

        </TRPCReactProvider>
      </body>
    </html>
  );
}
