import React from 'react';

type Props = {
    params: Promise<{ postSlug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
    const { postSlug } = await params; // Асинхронно достаем slug в Next.js 15

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Статья: {postSlug}</h1>
        </div>
    );
}
