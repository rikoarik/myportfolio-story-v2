"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function FontEditor() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [config, setConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadConfig() {
            try {
                const res = await fetch('/api/cms/font');
                if (!res.ok && res.status === 401) {
                    router.push('/cms/login');
                    return;
                }
                const data = await res.json();
                setConfig(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load config:', error);
            }
        }
        loadConfig();
    }, [router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/cms/font', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });

            if (res.ok) {
                alert('Font settings saved successfully!');
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
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">Font Configuration</h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Font Family
                            </label>
                            <input
                                type="text"
                                value={config?.fontFamily || ''}
                                onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Inter, system-ui, sans-serif"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    H1 Size
                                </label>
                                <input
                                    type="text"
                                    value={config?.h1Size || ''}
                                    onChange={(e) => setConfig({ ...config, h1Size: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 6rem"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    H2 Size
                                </label>
                                <input
                                    type="text"
                                    value={config?.h2Size || ''}
                                    onChange={(e) => setConfig({ ...config, h2Size: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 3.75rem"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    H3 Size
                                </label>
                                <input
                                    type="text"
                                    value={config?.h3Size || ''}
                                    onChange={(e) => setConfig({ ...config, h3Size: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 1.875rem"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Body Size
                                </label>
                                <input
                                    type="text"
                                    value={config?.bodySize || ''}
                                    onChange={(e) => setConfig({ ...config, bodySize: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 1rem"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Font Weight
                            </label>
                            <select
                                value={config?.weight || ''}
                                onChange={(e) => setConfig({ ...config, weight: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="300">Light (300)</option>
                                <option value="400">Regular (400)</option>
                                <option value="500">Medium (500)</option>
                                <option value="600">Semibold (600)</option>
                                <option value="700">Bold (700)</option>
                                <option value="900">Black (900)</option>
                            </select>
                        </div>

                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Preview</h3>
                            <div style={{ fontFamily: config?.fontFamily }}>
                                <h1 style={{ fontSize: config?.h1Size }} className="font-black mb-2">
                                    Heading 1 Preview
                                </h1>
                                <h2 style={{ fontSize: config?.h2Size }} className="font-bold mb-2">
                                    Heading 2 Preview
                                </h2>
                                <h3 style={{ fontSize: config?.h3Size }} className="font-semibold mb-2">
                                    Heading 3 Preview
                                </h3>
                                <p style={{ fontSize: config?.bodySize }}>
                                    This is body text preview with the selected font family and size.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
