"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    X, Box, Layers, Zap, Cloud, Cpu, Globe, Shield,
    Smartphone, Terminal, Sparkles, Github, Linkedin,
    Twitter, ArrowRight, FileText, Palette, Check
} from "lucide-react";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { useHorizontalScroll } from "./HorizontalScroll";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme, themeDisplayNames } from "@/context/ThemeContext";
import { themes, ThemeName } from "@/config/theme";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { label: "Foundation", id: "foundation", icon: Box },
    { label: "Structure", id: "architecture", icon: Layers },
    { label: "State & Flow", id: "state", icon: Zap },
    { label: "Offline-First", id: "offline", icon: Cloud },
    { label: "Hardware", id: "hardware", icon: Cpu },
    { label: "Scale", id: "multiapp", icon: Globe },
    { label: "Security", id: "security", icon: Shield },
    { label: "Cross-Platform", id: "crossplatform", icon: Smartphone },
    { label: "Production", id: "production", icon: Terminal },
    { label: "Refinement", id: "refinement", icon: Sparkles }
];

const SOCIALS = [
    { label: "GitHub", icon: Github, href: "#" },
    { label: "LinkedIn", icon: Linkedin, href: "#" },
    { label: "Twitter", icon: Twitter, href: "#" }
];

// Massive Animations Map
const ICON_VARIANTS = {
    foundation: { // Box
        hover: {
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 0.8, 1.1, 1],
            borderRadius: ["20%", "50%", "20%"],
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    },
    architecture: { // Layers
        hover: {
            // Simulate layers separating
            y: [0, -10, 0],
            rotateX: [0, 30, 0],
            scale: 1.1,
            filter: "drop-shadow(0px 10px 20px rgba(249, 115, 22, 0.4))",
            transition: { duration: 0.6 }
        }
    },
    state: { // Zap
        hover: {
            // Intense shaking / electric shock
            x: [0, -5, 5, -5, 5, 0],
            y: [0, -5, 5, -5, 5, 0],
            scale: [1, 1.2, 1],
            color: "#f59e0b", // Amber/Yellow
            filter: "drop-shadow(0 0 10px #f59e0b)",
            transition: { duration: 0.4, repeat: 1 }
        }
    },
    offline: { // Cloud
        hover: {
            // Floating/Drifting fast
            x: [0, 20, -20, 0],
            opacity: [1, 0.5, 1],
            scale: 1.1,
            transition: { duration: 1, ease: "easeInOut" }
        }
    },
    hardware: { // Cpu
        hover: {
            // Mechanical Pulse
            scale: [1, 1.15, 1, 1.15, 1],
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 }
        }
    },
    multiapp: { // Globe
        hover: {
            rotate: 360,
            scale: 1.2,
            transition: { duration: 1.5, ease: "linear", repeat: Infinity }
        }
    },
    security: { // Shield
        hover: {
            scale: [1, 0.9, 1.2, 1],
            transition: { type: "spring", stiffness: 300 }
        }
    },
    crossplatform: { // Smartphone
        hover: {
            rotate: [0, -90, 0],
            scale: 1.1,
            transition: { duration: 0.6 }
        }
    },
    production: { // Terminal
        hover: {
            backgroundColor: "#1e293b",
            color: "#4ade80",
            scale: 1.1,
            transition: { duration: 0.3 }
        }
    },
    refinement: { // Sparkles
        hover: {
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            filter: "brightness(1.5)",
            transition: { duration: 0.8 }
        }
    },
    default: {
        hover: { scale: 1.1, rotate: 10 }
    }
};

const INFINITE_ITEMS = [...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const { scrollToSection } = useHorizontalScroll();
    const { t, language, setLanguage } = useLanguage();
    const { themeName, setThemeName, availableThemes, theme } = useTheme(); // Destructure theme
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showThemeSelector, setShowThemeSelector] = useState(false);

    /* BODY LOCK */
    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        const prevTouchAction = document.body.style.touchAction;

        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        return () => {
            document.body.style.overflow = prevOverflow;
            document.body.style.touchAction = prevTouchAction;
        };
    }, [isOpen]);

    /* JUMP KE TENGAH (INFINITE ILLUSION) */
    useEffect(() => {
        if (!isOpen || !containerRef.current) return;
        requestAnimationFrame(() => {
            const el = containerRef.current!;
            el.scrollTop = el.scrollHeight / 3;
        });
    }, [isOpen]);

    /* PHYSICS-BASED INERTIA SCROLLING */
    useEffect(() => {
        const el = containerRef.current;
        if (!el || !isOpen) return;

        let velocity = 0;
        let currentScroll = el.scrollTop;
        let animationId: number | null = null;
        let lastTime = performance.now();
        let isWheeling = false;
        let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

        // Physics constants - TUNED FOR STRONG INERTIA
        const friction = 0.96; // Higher = longer slide (0.96 = very smooth, long momentum)
        const velocityMultiplier = 2.5; // Higher = more responsive input
        const minVelocity = 0.05; // Lower = smoother stop

        const animate = () => {
            const now = performance.now();
            const deltaTime = Math.min((now - lastTime) / 16.67, 2); // Normalize to ~60fps, cap at 2x
            lastTime = now;

            // Apply friction when not actively wheeling
            if (!isWheeling) {
                velocity *= Math.pow(friction, deltaTime);
            }

            // Update position
            currentScroll += velocity * deltaTime;

            // Clamp to bounds with elastic bounce-back
            const maxScroll = el.scrollHeight - el.clientHeight;
            if (currentScroll < 0) {
                currentScroll = 0;
                velocity = 0;
            } else if (currentScroll > maxScroll) {
                currentScroll = maxScroll;
                velocity = 0;
            }

            el.scrollTop = currentScroll;

            // Continue animation if velocity is significant
            if (Math.abs(velocity) > minVelocity) {
                animationId = requestAnimationFrame(animate);
            } else {
                velocity = 0;
                animationId = null;
            }
        };

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Reset wheeling state
            isWheeling = true;
            if (wheelTimeout) clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                isWheeling = false;
            }, 50);

            // Sync with current scroll position
            if (animationId === null) {
                currentScroll = el.scrollTop;
                lastTime = performance.now();
            }

            // Add velocity based on wheel delta
            velocity += e.deltaY * velocityMultiplier * 0.1;

            // Start animation if not already running
            if (animationId === null) {
                animationId = requestAnimationFrame(animate);
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            el.removeEventListener("wheel", onWheel);
            if (animationId) cancelAnimationFrame(animationId);
            if (wheelTimeout) clearTimeout(wheelTimeout);
        };
    }, [isOpen]);

    /* INFINITE RESET */
    const handleScroll = () => {
        const el = containerRef.current;
        if (!el) return;

        const oneSet = el.scrollHeight / 3;

        if (el.scrollTop >= oneSet * 2) {
            el.scrollTop -= oneSet;
        } else if (el.scrollTop <= 5) {
            el.scrollTop += oneSet;
        }
    };



    // ... (keep effects)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] h-screen flex flex-col backdrop-blur-xl"
                    style={{ backgroundColor: theme.bgPrimary + 'F2', color: theme.textPrimary }} // Use theme bg with opacity
                >
                    {/* HEADER */}
                    <div className="shrink-0 flex justify-between items-center p-6 md:p-8 border-b" style={{ borderColor: theme.border, backgroundColor: theme.bgSecondary + 'E6' }}>
                        <div>
                            <div className="text-xl font-bold">{t('header.menu')}</div>
                        </div>

                        {/* Language Toggle + Close */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                                className="font-mono text-sm font-bold tracking-widest hover:opacity-70 transition-opacity"
                                style={{ color: theme.accent }}
                            >
                                {language === 'en' ? 'ID' : 'EN'}
                            </button>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-full transition hover:opacity-80"
                                style={{ backgroundColor: theme.bgSecondary }}
                            >
                                <X className="w-8 h-8 transition-transform hover:rotate-90" style={{ color: theme.textPrimary }} />
                            </button>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">

                        {/* LEFT – MANUAL SCROLL */}
                        <div
                            className="flex-1 min-h-0 flex flex-col overflow-hidden"
                            style={{
                                maskImage:
                                    "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
                            }}
                        >
                            <div
                                ref={containerRef}
                                onScroll={handleScroll}
                                className="h-full overflow-y-auto pt-24 pb-24"
                                style={{
                                    touchAction: 'auto',
                                    overscrollBehavior: 'contain',
                                    WebkitOverflowScrolling: 'touch'
                                }}
                            >
                                <div className="max-w-4xl mx-auto px-8 flex flex-col gap-12 md:gap-32"> {/* Increased gap for better zigzag spacing */}
                                    {INFINITE_ITEMS.map((item, index) => {
                                        const originalIndex = index % MENU_ITEMS.length;
                                        const isLeft = originalIndex % 2 === 0;

                                        // @ts-expect-error - Dictionary access with string key
                                        const variant = ICON_VARIANTS[item.id] || ICON_VARIANTS.default;

                                        return (
                                            <div
                                                key={`${item.id}-${index}`}
                                                className={`flex w-full ${isLeft ? "justify-start md:justify-start" : "justify-end md:justify-end"}`} /* Force zigzag even on mobile if desired, or keep centered on mobile */
                                            >
                                                {/* Mobile: Centered, Desktop: Zigzag. Updating to keep zigzag responsive behavior */}
                                                <div className={`flex w-full justify-center md:${isLeft ? "justify-start" : "justify-end"}`}>
                                                    <motion.button
                                                        initial={{ opacity: 0, y: 40 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.4 }}
                                                        onClick={() => {
                                                            onClose();
                                                            setTimeout(() => {
                                                                if (window.innerWidth < 1024) {
                                                                    document
                                                                        .getElementById(item.id)
                                                                        ?.scrollIntoView({ behavior: "smooth" });
                                                                } else {
                                                                    scrollToSection(originalIndex);
                                                                }
                                                            }, 400);
                                                        }}
                                                        onMouseEnter={() => setActiveIndex(index)}
                                                        onMouseLeave={() => setActiveIndex(null)}
                                                        className="flex flex-col items-center gap-6 group"
                                                    >
                                                        {/* CARD ICON */}
                                                        <div className="relative">
                                                            {/* Glow Effect */}
                                                            <motion.div
                                                                className="absolute inset-0 bg-orange-400/20 blur-xl rounded-[2.5rem]"
                                                                style={{ backgroundColor: theme.accent + '33' }}
                                                                animate={{
                                                                    opacity: activeIndex === index ? 1 : 0,
                                                                    scale: activeIndex === index ? 1.2 : 0.8
                                                                }}
                                                            />

                                                            {/* Static(ish) Card Container */}
                                                            <motion.div
                                                                className={`
                                relative z-10 w-32 h-32 md:w-48 md:h-48  /* Smaller on mobile */
                                rounded-[2rem] md:rounded-[2.5rem]
                                flex items-center justify-center
                                shadow-lg transition-all duration-300
                              `}
                                                                style={{
                                                                    backgroundColor: activeIndex === index ? theme.bgPrimary : theme.bgSecondary,
                                                                    borderColor: activeIndex === index ? theme.accent : theme.border,
                                                                    borderWidth: activeIndex === index ? '2px' : '1px',
                                                                    color: activeIndex === index ? theme.accent : theme.textSecondary
                                                                }}
                                                                animate={{
                                                                    scale: activeIndex === index ? 1.05 : 1
                                                                }}
                                                            >
                                                                {/* Icon receives the MASSIVE animation */}
                                                                <motion.div
                                                                    variants={variant}
                                                                    animate={activeIndex === index ? "hover" : "initial"}
                                                                >
                                                                    <item.icon className="w-16 h-16 md:w-24 md:h-24" strokeWidth={1.2} />
                                                                </motion.div>
                                                            </motion.div>
                                                        </div>

                                                        {/* TYPOGRAPHY */}
                                                        <div className="text-center">
                                                            <div className="font-mono text-[10px] md:text-xs mb-2 tracking-widest uppercase transition-colors" style={{ color: theme.textSecondary }}>
                                                                CHAPTER 0{originalIndex + 1}
                                                            </div>
                                                            <div
                                                                className={`
                                text-xl md:text-xl font-medium tracking-tight font-serif italic
                                transition-colors duration-300
                              `}
                                                                style={{ color: activeIndex === index ? theme.textPrimary : theme.textSecondary }}
                                                            >
                                                                {t(`chapters.${item.id}`)}
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="hidden md:block w-full md:w-1/3 shrink-0 border-t md:border-t-0 md:border-l p-6 md:p-12 overflow-y-auto" style={{ borderColor: theme.border, backgroundColor: theme.bgSecondary + '80' }}>
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: theme.textSecondary }}>
                                        Work
                                    </h3>
                                    <a href="/projects" className="flex items-center gap-4 w-full p-4 rounded-xl border hover:shadow-md transition group" style={{ backgroundColor: theme.bgPrimary, borderColor: theme.border }}>
                                        <div className="p-2 rounded-lg transition-colors group-hover:text-white" style={{ backgroundColor: theme.accent + '20', color: theme.accent }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.accent; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.accent + '20'; }}>
                                            <Smartphone className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-sm" style={{ color: theme.textPrimary }}>Featured Projects</div>
                                            <div className="text-[10px] uppercase" style={{ color: theme.textSecondary }}>Case Studies & Demos</div>
                                        </div>
                                        <ArrowRight className="ml-auto w-4 h-4 transition-colors group-hover:translate-x-1" style={{ color: theme.textSecondary }} />
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: theme.textSecondary }}>
                                        {t('menu.connect')}
                                    </h3>
                                    <div className="space-y-4">
                                        {SOCIALS.map(s => (
                                            <a
                                                key={s.label}
                                                href={s.href}
                                                className="flex items-center gap-4 transition hover:opacity-80"
                                                style={{ color: theme.textSecondary }}
                                            >
                                                <s.icon className="w-5 h-5" />
                                                <span className="text-lg">{s.label}</span>
                                                <ArrowRight className="ml-auto w-4 h-4" />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: theme.textSecondary }}>
                                        {t('menu.resources')}
                                    </h3>
                                    <button className="flex items-center gap-4 w-full p-4 rounded-xl text-white transition shadow-lg" style={{ backgroundColor: theme.accent }}>
                                        <FileText className="w-6 h-6" />
                                        <div className="text-left">
                                            <div className="font-bold text-sm">{t('menu.download_cv')}</div>
                                            <div className="text-[10px] uppercase opacity-80">
                                                {t('menu.pdf_format')}
                                            </div>
                                        </div>
                                        <ArrowRight className="ml-auto w-5 h-5" />
                                    </button>
                                </div>

                                <div className="pt-8 border-t text-xs" style={{ borderColor: theme.border, color: theme.textSecondary }}>
                                    {t('menu.built_with')} <b>Next.js</b>, <b>Tailwind</b>, <b>Framer</b><br />
                                    {t('menu.designed_by')} Arik Riko
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
