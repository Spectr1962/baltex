import React from 'react';

type Props = {
    params: Promise<{ nicheSlug: string }>;
};

export default async function BlogNichePage({ params }: Props) {
    const { nicheSlug } = await params;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Статьи для ниши: {nicheSlug}</h1>
        </div>
    );
}
