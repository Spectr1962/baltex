import React from 'react';

type Props = {
    params: Promise<{ categorySlug: string }>;
};

export default async function ServiceCategoryPage({ params }: Props) {
    const { categorySlug } = await params;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Категория: {categorySlug}</h1>
        </div>
    );
}
