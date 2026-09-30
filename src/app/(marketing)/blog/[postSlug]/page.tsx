import React from 'react';

export default function BlogPostPage({ params }: { params: { postSlug: string } }) {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Статья: {params.postSlug}</h1>
        </div>
    );
}
