"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Github, Linkedin, Twitter, FileText } from "lucide-react";
import { useEffect } from "react";
import { useHorizontalScroll } from "./HorizontalScroll";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const { scrollToSection } = useHorizontalScroll();

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const links = [
        { label: "Void", id: "void" },
        { label: "Origin", id: "origin" },
        { label: "Pressure", id: "pressure" },
        { label: "Control", id: "control" },
        { label: "Systems", id: "systems" },
        { label: "Scale", id: "scale" },
        { label: "Tools", id: "tools" },
        { label: "Now", id: "now" }
    ];

    const socials = [
        { label: "GitHub", icon: Github, href: "#" },
        { label: "LinkedIn", icon: Linkedin, href: "#" },
        { label: "Twitter", icon: Twitter, href: "#" }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-slate-50/95 backdrop-blur-xl text-slate-900 flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 md:p-8 flex justify-between items-center border-b border-slate-200">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-slate-900">MENU</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Navigation System</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors group"
                        >
                            <X className="w-8 h-8 text-slate-900 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col md:flex-row">
                        {/* Links Column */}
                        <div className="flex-1 p-6 md:p-12 flex flex-col justify-center gap-4">
                            {links.map((link, i) => (
                                <motion.button
                                    key={link.id}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => {
                                        // Scroll logic
                                        const isMobile = window.innerWidth < 1024;
                                        onClose();
                                        setTimeout(() => {
                                            if (isMobile) {
                                                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                scrollToSection(i);
                                            }
                                        }, 500); // Wait for menu close anim
                                    }}
                                    className="text-left group flex items-center gap-4"
                                >
                                    <span className="font-mono text-xs text-slate-400 group-hover:text-orange-500 transition-colors">0{i + 1}</span>
                                    <span className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-300 group-hover:text-slate-900 transition-colors group-hover:translate-x-4 duration-300 inline-block">
                                        {link.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Sidebar Column */}
                        <div className="w-full md:w-1/3 bg-slate-100/50 border-l border-slate-200 p-6 md:p-12 flex flex-col justify-between">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Connect</h3>
                                    <div className="flex flex-col gap-4">
                                        {socials.map(s => (
                                            <a key={s.label} href={s.href} className="flex items-center gap-4 text-slate-500 hover:text-orange-600 transition-colors group">
                                                <s.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                <span className="text-lg font-medium">{s.label}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Resources</h3>
                                    <button className="flex items-center gap-4 w-full p-4 bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors text-left group text-white shadow-lg shadow-orange-500/20">
                                        <FileText className="w-6 h-6" />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">Download CV</span>
                                            <span className="text-[10px] opacity-80 uppercase tracking-wider">PDF Format</span>
                                        </div>
                                        <ArrowRight className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 md:mt-0 pt-8 border-t border-slate-200 text-xs text-slate-400 leading-relaxed max-w-xs">
                                <p>
                                    Built with <span className="text-slate-600 font-semibold">Next.js 14</span>, <span className="text-slate-600 font-semibold">Tailwind CSS</span>, and <span className="text-slate-600 font-semibold">Framer Motion</span>.
                                    <br />
                                    Designed by Arik Riko.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
