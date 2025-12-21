"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Type, Sparkles, Grid, LogOut } from 'lucide-react';

export default function CMSDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({ sections: 0, languages: 2 });

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch(`/api/cms/content?lang=en`);
                if (!res.ok && res.status === 401) {
                    router.push('/cms/login');
                    return;
                }
                const data = await res.json();
                setStats({ sections: data.length, languages: 2 });
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        }
        loadData();
    }, [router]);

    const cards = [
        {
            icon: FileText,
            title: 'Content Editor',
            description: 'Edit chapter content in both languages',
            href: '/cms/content',
            color: 'bg-blue-50 text-blue-600',
        },
        {
            icon: Grid,
            title: 'Layout Settings',
            description: 'Customize grid, spacing, and alignment',
            href: '/cms/layout',
            color: 'bg-purple-50 text-purple-600',
        },
        {
            icon: Type,
            title: 'Font Configuration',
            description: 'Manage typography and font sizes',
            href: '/cms/font',
            color: 'bg-green-50 text-green-600',
        },
        {
            icon: Sparkles,
            title: 'Animation Settings',
            description: 'Control animation timing and effects',
            href: '/cms/animation',
            color: 'bg-orange-50 text-orange-600',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">Portfolio CMS</h1>
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h2>
                    <p className="text-slate-600">Manage your portfolio content and settings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="text-4xl font-black text-slate-900">{stats.sections}</div>
                        <div className="text-slate-600 font-medium">Content Sections</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="text-4xl font-black text-slate-900">{stats.languages}</div>
                        <div className="text-slate-600 font-medium">Languages</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="text-4xl font-black text-green-600">●</div>
                        <div className="text-slate-600 font-medium">System Online</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                                <card.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-slate-600">{card.description}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
