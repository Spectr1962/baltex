import type { Metadata } from "next";
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
    title: "Блог и аналитика для бизнеса",
    description: "Экспертные статьи, разборы налогового законодательства, изменения в учете маркетплейсов, инфобизнеса и производства от аудиторов агентства Baltex.",
};

export default async function BlogPage() {
    // Предзагружаем и запрашиваем список всех статей с сервера через tRPC
    void api.blog.getAll.prefetch();
    const posts = await api.blog.getAll();

    // Отделяем первую, самую свежую статью для вывода в качестве Главного материала (Featured Post)
    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    return (
        <HydrateClient>
            <div className="min-h-screen bg-black text-white selection:bg-[#0070f3]/30 selection:text-white">
                <div className="container mx-auto px-6 py-20 max-w-5xl">

                    {/* Шапка блога */}
                    <div className="max-w-3xl mb-16">
                        <span className="text-xs font-bold text-[#0070f3] uppercase tracking-widest bg-[#0070f3]/5 px-4 py-2 rounded-full border border-[#0070f3]/10 inline-block mb-4">
                            База знаний Baltex
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
                            Аналитика, налоги и право
                        </h1>
                        <p className="text-base sm:text-lg text-white/50 leading-relaxed">
                            Пишем просто о сложных изменениях в законодательстве. Практические гайды по защите активов и легальной оптимизации налогов для собственников бизнеса.
                        </p>
                    </div>

                    {/* 1. ГЛАВНЫЙ МАТЕРИАЛ (Featured Post) — Крупная широкоформатная карточка */}
                    {featuredPost && (
                        <div className="mb-20">
                            <Link
                                href={`/blog/${featuredPost.categorySlug}/${featuredPost.slug}`}
                                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:border-white/10"
                            >
                                {/* Левая часть: Стильная темная плашка-заглушка вместо картинки */}
                                <div className="lg:col-span-6 h-[240px] sm:h-[320px] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,243,0.08)_0%,transparent_100%)]" />
                                    <span className="text-4xl font-black text-white/5 tracking-tighter select-none">BALTEX INSIGHTS</span>
                                </div>

                                {/* Правая часть: Описание и текст */}
                                <div className="lg:col-span-6 flex flex-col justify-between h-full py-2">
                                    <div>
                                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                                            <span className="text-[#0070f3]">{featuredPost.categoryName}</span>
                                            <span>•</span>
                                            <span>{featuredPost.date}</span>
                                        </div>

                                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4 group-hover:text-[#0070f3] transition-colors duration-200 leading-tight">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-6 line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>
                                    </div>

                                    <span className="text-sm font-bold text-white group-hover:text-[#0070f3] inline-flex items-center gap-2 transition-colors duration-200">
                                        Читать разбор эксперта <span className="transform group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Разделитель */}
                    <div className="border-b border-white/5 mb-16" />

                    {/* 2. СЕТКА ОСТАЛЬНЫХ СТАТЕЙ */}
                    <div>
                        <h3 className="text-lg font-bold text-white/40 uppercase tracking-widest mb-8">
                            Все публикации
                        </h3>

                        {remainingPosts.length === 0 ? (
                            <p className="text-sm text-white/30">Новые экспертные статьи уже готовятся к публикации.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {remainingPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.categorySlug}/${post.slug}`}
                                        className="group flex flex-col justify-between border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-6 rounded-2xl transition-all duration-300 hover:border-white/10"
                                    >
                                        <div>
                                            {/* Категория и дата */}
                                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-4">
                                                <span className="text-[#0070f3]">{post.categoryName}</span>
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>

                                            {/* Заголовок */}
                                            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#0070f3] transition-colors duration-200 leading-snug">
                                                {post.title}
                                            </h4>

                                            {/* Краткое описание (excerpt) */}
                                            <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        {/* Ссылка */}
                                        <span className="text-xs font-bold text-white/80 group-hover:text-[#0070f3] transition-colors duration-200 inline-flex items-center gap-1.5 mt-auto pt-4 border-t border-white/5 w-full">
                                            Открыть материал <span className="transform group-hover:translate-x-0.5 transition-transform duration-200">&rarr;</span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Траст-блок подписки внизу Блога */}
                    <div className="border border-white/5 bg-white/[0.01] p-8 sm:p-10 rounded-3xl text-center max-w-3xl mx-auto mt-24">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Хотите первыми узнавать о критических изменениях в законах?
                        </h3>
                        <p className="text-sm text-white/50 mb-6 max-w-xl mx-auto">
                            Раз в месяц мы отправляем короткую выжимку без спама: только новые законы, штрафы ФНС и проверенные методы налоговой оптимизации для ООО и ИП.
                        </p>
                        <Link
                            href="/contacts"
                            className="inline-block bg-white hover:bg-white/90 text-black font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md"
                        >
                            Подписаться на рассылку
                        </Link>
                    </div>

                </div>
            </div>
        </HydrateClient>
    );
}
