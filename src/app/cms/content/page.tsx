"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Globe } from 'lucide-react';

export default function ContentEditor() {
    const router = useRouter();
    const [language, setLanguage] = useState<'en' | 'id'>('en');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sections, setSections] = useState<any[]>([]);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadSections() {
            try {
                const res = await fetch(`/api/cms/content?lang=${language}`);
                if (!res.ok && res.status === 401) {
                    router.push('/cms/login');
                    return;
                }
                const data = await res.json();
                setSections(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load sections:', error);
            }
        }
        loadSections();
    }, [language, router]);

    const currentSection = sections.find(s => s.sectionKey === selectedSection);

    const handleSave = async () => {
        if (!selectedSection) return;

        setSaving(true);
        try {
            const res = await fetch('/api/cms/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sectionKey: selectedSection,
                    language,
                    label: currentSection?.label,
                    data: formData,
                }),
            });

            if (res.ok) {
                alert('Saved successfully!');
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

    useEffect(() => {
        if (currentSection) {
            setFormData(currentSection.data);
        }
    }, [currentSection]);

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
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">Content Editor</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 bg-slate-100 rounded-lg p-1">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-2 rounded font-semibold text-sm transition-all ${language === 'en' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('id')}
                                className={`px-4 py-2 rounded font-semibold text-sm transition-all ${language === 'id' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'
                                    }`}
                            >
                                ID
                            </button>
                        </div>
                        {selectedSection && (
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
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <h3 className="font-bold text-slate-900 mb-4">Sections</h3>
                        <div className="space-y-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setSelectedSection(section.sectionKey)}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${selectedSection === section.sectionKey
                                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                            : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {selectedSection && formData ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">{currentSection?.label}</h2>
                            <div className="space-y-6">
                                {Object.keys(formData).map((key) => {
                                    const value = formData[key];
                                    const isArray = Array.isArray(value);
                                    const isObject = typeof value === 'object' && !isArray;

                                    return (
                                        <div key={key}>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                {key.replace(/_/g, ' ').toUpperCase()}
                                            </label>
                                            {!isArray && !isObject && (
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            )}
                                            {isArray && (
                                                <textarea
                                                    value={JSON.stringify(value, null, 2)}
                                                    onChange={(e) => {
                                                        try {
                                                            setFormData({ ...formData, [key]: JSON.parse(e.target.value) });
                                                        } catch { }
                                                    }}
                                                    rows={6}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                                                />
                                            )}
                                            {isObject && (
                                                <textarea
                                                    value={JSON.stringify(value, null, 2)}
                                                    onChange={(e) => {
                                                        try {
                                                            setFormData({ ...formData, [key]: JSON.parse(e.target.value) });
                                                        } catch { }
                                                    }}
                                                    rows={4}
                                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                            <Globe className="mx-auto text-slate-300 mb-4" size={64} />
                            <p className="text-slate-600">Select a section to edit</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
