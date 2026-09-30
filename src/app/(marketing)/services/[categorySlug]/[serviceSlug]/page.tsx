import React from 'react';

type Props = {
    params: Promise<{ categorySlug: string; serviceSlug: string }>;
};

export default async function SingleServicePage({ params }: Props) {
    const { serviceSlug } = await params;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Услуга: {serviceSlug}</h1>
        </div>
    );
}
