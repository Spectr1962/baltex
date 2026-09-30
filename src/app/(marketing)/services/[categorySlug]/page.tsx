import React from 'react';

export default function ServiceCategoryPage({ params }: { params: { categorySlug: string } }) {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Категория: {params.categorySlug}</h1>
        </div>
    );
}
