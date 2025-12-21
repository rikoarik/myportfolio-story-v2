"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function AnimationEditor() {
    const router = useRouter();
    const [config, setConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadConfig() {
            try {
                const res = await fetch('/api/cms/animation');
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
            const res = await fetch('/api/cms/animation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });

            if (res.ok) {
                alert('Animation settings saved successfully!');
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
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">Animation Settings</h1>
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
                                Animation Type
                            </label>
                            <select
                                value={config?.type || ''}
                                onChange={(e) => setConfig({ ...config, type: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="fade">Fade</option>
                                <option value="slide">Slide</option>
                                <option value="scale">Scale</option>
                                <option value="blur">Blur</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Duration (seconds)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={config?.duration || 0}
                                    onChange={(e) => setConfig({ ...config, duration: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Delay (seconds)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={config?.delay || 0}
                                    onChange={(e) => setConfig({ ...config, delay: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Easing Function
                            </label>
                            <select
                                value={config?.easing || ''}
                                onChange={(e) => setConfig({ ...config, easing: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="ease">Ease</option>
                                <option value="linear">Linear</option>
                                <option value="ease-in">Ease In</option>
                                <option value="ease-out">Ease Out</option>
                                <option value="ease-in-out">Ease In-Out</option>
                                <option value="cubic-bezier(0.22, 1, 0.36, 1)">Custom Cubic (0.22, 1, 0.36, 1)</option>
                            </select>
                        </div>

                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Preview</h3>
                            <div className="p-8 bg-slate-50 rounded-lg flex items-center justify-center">
                                <div
                                    className="w-32 h-32 bg-blue-500 rounded-xl"
                                    style={{
                                        animation: `demo-${config?.type} ${config?.duration || 0.6}s ${config?.easing} infinite alternate`,
                                    }}
                                />
                            </div>
                            <style jsx>{`
                @keyframes demo-fade {
                  from { opacity: 0.3; }
                  to { opacity: 1; }
                }
                @keyframes demo-slide {
                  from { transform: translateX(-20px); }
                  to { transform: translateX(20px); }
                }
                @keyframes demo-scale {
                  from { transform: scale(0.8); }
                  to { transform: scale(1); }
                }
                @keyframes demo-blur {
                  from { filter: blur(4px); }
                  to { filter: blur(0px); }
                }
              `}</style>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
