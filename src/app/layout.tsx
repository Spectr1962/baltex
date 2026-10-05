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
  metadataBase: new URL("https://baltex.ru"),
  title: {
    template: "%s | Baltex",
    default: "Baltex — Профессиональные услуги для бизнеса",
  },
  description: "Компания Baltex предоставляет комплексные услуги для бизнеса. Оптимальные цены, гарантия качества и индивидуальный подход.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Baltex — Услуги для бизнеса",
    description: "Комплексные бизнес-решения, кейсы, блог и контакты компании Baltex.",
    url: "https://baltex.ru",
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
