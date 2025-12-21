/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function LayoutEditor() {
    const router = useRouter();
    const [layouts, setLayouts] = useState<any[]>([]);
    const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadLayouts() {
            try {
                const res = await fetch('/api/cms/layout');
                if (!res.ok && res.status === 401) {
                    router.push('/cms/login');
                    return;
                }
                const data = await res.json();
                setLayouts(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load layouts:', error);
            }
        }
        loadLayouts();
    }, [router]);

    const currentLayout = layouts.find(l => l.sectionKey === selectedLayout);

    const handleSave = async () => {
        if (!currentLayout) return;

        setSaving(true);
        try {
            const res = await fetch('/api/cms/layout', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentLayout),
            });

            if (res.ok) {
                alert('Layout saved successfully!');
            } else {
                alert('Failed to save');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const updateLayout = (key: string, value: any) => {
        setLayouts(layouts.map(l =>
            l.sectionKey === selectedLayout ? { ...l, [key]: value } : l
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-xl text-slate-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/cms" className="text-slate-600 hover:text-slate-900">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">Layout Configuration</h1>
                    </div>
                    {selectedLayout && (
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    )}
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <h3 className="font-bold text-slate-900 mb-4">Sections</h3>
                        <div className="space-y-2">
                            {layouts.map((layout) => (
                                <button
                                    key={layout.id}
                                    onClick={() => setSelectedLayout(layout.sectionKey)}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${selectedLayout === layout.sectionKey
                                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                            : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {layout.sectionKey}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {currentLayout ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">{currentLayout.sectionKey}</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Grid Columns
                                        </label>
                                        <input
                                            type="number"
                                            value={currentLayout.gridCols}
                                            onChange={(e) => updateLayout('gridCols', parseInt(e.target.value))}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Gap (px)
                                        </label>
                                        <input
                                            type="number"
                                            value={currentLayout.gap}
                                            onChange={(e) => updateLayout('gap', parseInt(e.target.value))}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Padding (px)
                                        </label>
                                        <input
                                            type="number"
                                            value={currentLayout.padding}
                                            onChange={(e) => updateLayout('padding', parseInt(e.target.value))}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Alignment
                                    </label>
                                    <select
                                        value={currentLayout.alignment}
                                        onChange={(e) => updateLayout('alignment', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="start">Start</option>
                                        <option value="center">Center</option>
                                        <option value="end">End</option>
                                    </select>
                                </div>

                                <div className="pt-6 border-t border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Preview</h3>
                                    <div
                                        className="bg-slate-50 rounded-lg"
                                        style={{
                                            padding: `${currentLayout.padding}px`,
                                            display: 'grid',
                                            gridTemplateColumns: `repeat(${currentLayout.gridCols}, 1fr)`,
                                            gap: `${currentLayout.gap}px`,
                                            justifyItems: currentLayout.alignment,
                                        }}
                                    >
                                        {Array.from({ length: currentLayout.gridCols }).map((_, i) => (
                                            <div key={i} className="bg-blue-500 rounded h-16" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                            <p className="text-slate-600">Select a section to edit layout</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
