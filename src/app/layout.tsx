import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
// ИМПОРТЫ: Импортируем без фигурных скобок, так как компоненты используют export default
import Header from "~/app/_components/Header";
import Footer from "~/app/_components/Footer";
import "~/styles/globals.css"; // Подключение глобальных стилей Tailwind v4

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
});

// ГЛОБАЛЬНЫЕ МЕТАДАННЫЕ: Сохраняем настройки вашего домена
export const metadata: Metadata = {
  metadataBase: new URL("https://baltexx.ru"),
  title: {
    template: "%s | Baltex",
    default: "Baltex — Профессиональный бухгалтерский учет и налоговая безопасность",
  },
  description: "Аутсорсинг бухгалтерии для бизнеса, маркетплейсов (Wildberries, Ozon) и инфобизнеса. Защита от доначислений ФНС.",
  manifest: "/manifest.json", // Подключение паспорта PWA
};

// ГЛАВНАЯ ФУНКЦИЯ: Корневой макет всего вашего веб-приложения
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geist.variable}`}>
      {/* 
        flex flex-col и min-h-screen гарантируют, 
        что Footer всегда будет прижат к самому низу страницы 
      */}
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <TRPCReactProvider>
          {/* Сквозная шапка сайта */}
          <Header />

          {/* 
            Основной контент страниц (page.tsx). 
            flex-1 растягивает блок на всю свободную высоту.
            pt-20 делает отступ сверху, чтобы фиксированный Header не перекрывал текст.
          */}
          <main className="flex-1 pt-20">
            {children}
          </main>

          {/* Сквозной подвал сайта */}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
