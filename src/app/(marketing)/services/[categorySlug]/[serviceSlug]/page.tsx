import React from 'react';

export default function SingleServicePage({ params }: { params: { serviceSlug: string } }) {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Услуга: {params.serviceSlug}</h1>
        </div>
    );
}
