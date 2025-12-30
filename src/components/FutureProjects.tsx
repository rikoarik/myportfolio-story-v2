"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, ArrowLeft, Sparkles, Clock, Lightbulb, Rocket } from "lucide-react";
import SplitText from "@/components/bits/SplitText";
import DecryptedText from "@/components/bits/DecryptedText";

const statusIcons: Record<string, typeof Clock> = {
    "In Planning": Clock,
    "Dalam Perencanaan": Clock,
    "In Development": Rocket,
    "Dalam Pengembangan": Rocket,
    "Concept": Lightbulb,
    "Konsep": Lightbulb
};

// Status colors will be generated dynamically from theme

export default function FutureProjects() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    
    // Dynamic status colors based on theme
    const statusColors: Record<string, string> = {
        "In Planning": theme.textPrimary,
        "Dalam Perencanaan": theme.textPrimary,
        "In Development": theme.accent,
        "Dalam Pengembangan": theme.accent,
        "Concept": theme.bgSecondary,
        "Konsep": theme.bgSecondary
    };
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    const x = useMotionValue(0);
    const targetX = useRef(0);
    const currentX = useRef(0);
    
    const LERP_FACTOR = 0.1;
    const projects = (t('page.future.projects') as unknown as Array<{
        title: string;
        subtitle: string;
        status: string;
        desc: string;
        tags: string[];
    }>);

    // Measure content and container widths
    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.innerWidth < 1024;
            setIsMobile(isMobileDevice);
            
            if (contentRef.current && containerRef.current) {
                const content = contentRef.current;
                const container = containerRef.current;
                
                setContentWidth(content.scrollWidth);
                setContainerWidth(container.clientWidth);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        
        // Use ResizeObserver for more accurate measurements
        const resizeObserver = new ResizeObserver(handleResize);
        if (contentRef.current) resizeObserver.observe(contentRef.current);
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        
        // Delay to ensure DOM is ready
        setTimeout(handleResize, 100);

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
        };
    }, [projects.length]);

    // Animation loop
    useEffect(() => {
        if (isMobile) return;

        let animationId: number;

        const animate = () => {
            const diff = targetX.current - currentX.current;
            currentX.current += diff * LERP_FACTOR;
            
            // Clamp to bounds
            const maxScroll = Math.max(0, contentWidth - containerWidth);
            currentX.current = Math.max(-maxScroll, Math.min(0, currentX.current));
            targetX.current = Math.max(-maxScroll, Math.min(0, targetX.current));
            
            x.set(currentX.current);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [contentWidth, containerWidth, isMobile, x]);

    // Handle wheel events
    useEffect(() => {
        if (isMobile) return;

        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
            const maxScroll = Math.max(0, contentWidth - containerWidth);
            targetX.current = Math.max(-maxScroll, Math.min(0, targetX.current - delta * 0.3));
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [isMobile, contentWidth, containerWidth]);

    // Handle keyboard navigation
    useEffect(() => {
        if (isMobile) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const scrollAmount = 600;
            const maxScroll = Math.max(0, contentWidth - containerWidth);
            
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                targetX.current = Math.max(-maxScroll, targetX.current - scrollAmount);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                targetX.current = Math.min(0, targetX.current + scrollAmount);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobile, contentWidth, containerWidth]);

    // Handle touch events
    useEffect(() => {
        if (isMobile) return;

        const container = containerRef.current;
        if (!container) return;

        let touchStartX = 0;
        let isDragging = false;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            isDragging = true;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const touchX = e.touches[0].clientX;
            const deltaX = touchStartX - touchX;
            const maxScroll = Math.max(0, contentWidth - containerWidth);
            
            targetX.current = Math.max(-maxScroll, Math.min(0, targetX.current - deltaX));
            touchStartX = touchX;
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        container.addEventListener("touchend", handleTouchEnd);

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isMobile, contentWidth, containerWidth]);

    // Calculate progress (0-1)
    const progress = useTransform(
        x,
        [contentWidth > 0 ? -(contentWidth - containerWidth) : 0, 0],
        [1, 0]
    );

    const scrollLeft = useCallback(() => {
        const scrollAmount = 600;
        const maxScroll = Math.max(0, contentWidth - containerWidth);
        targetX.current = Math.min(0, targetX.current + scrollAmount);
    }, [contentWidth, containerWidth]);

    const scrollRight = useCallback(() => {
        const scrollAmount = 600;
        const maxScroll = Math.max(0, contentWidth - containerWidth);
        targetX.current = Math.max(-maxScroll, targetX.current - scrollAmount);
    }, [contentWidth, containerWidth]);

    const canScrollLeft = contentWidth > containerWidth && currentX.current < 0;
    const canScrollRight = contentWidth > containerWidth && currentX.current > -(contentWidth - containerWidth);

    if (isMobile) {
        return (
            <div className="w-full h-full flex flex-col p-8 md:p-12 pt-24">
                <div className="mb-12">
                    <span className="text-xs font-mono uppercase tracking-widest block mb-4" style={{ color: theme.accent }}>
                        {t('page.future.label')}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                        <DecryptedText text={t('page.future.title_1')} speed={80} animateOn="view" className="block" style={{ color: theme.textPrimary }} />
                        <DecryptedText text={t('page.future.title_2')} speed={80} animateOn="view" delay={0.2} className="block" style={{ color: theme.accent }} />
                    </h2>
                    <p className="text-lg max-w-2xl" style={{ color: theme.textSecondary }}>
                        {t('page.future.desc')}
                    </p>
                </div>

                <div className="flex flex-col gap-8 overflow-y-auto">
                    {projects.map((project, index) => {
                        const StatusIcon = statusIcons[project.status as keyof typeof statusIcons] || Sparkles;
                        const statusColorValue = statusColors[project.status as keyof typeof statusColors] || theme.textPrimary;
                        
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="rounded-2xl p-8 transition-colors"
                                style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border, borderWidth: '1px', borderStyle: 'solid' }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.border}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>{project.title}</h3>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border" style={{ backgroundColor: theme.bgPrimary, color: statusColorValue, borderColor: statusColorValue }}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <p className="font-mono text-sm mb-4" style={{ color: theme.textSecondary }}>{project.subtitle}</p>
                                    </div>
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: theme.accent + '20' }}>
                                        <StatusIcon size={24} style={{ color: statusColorValue }} />
                                    </div>
                                </div>
                                <p className="mb-6 leading-relaxed" style={{ color: theme.textSecondary }}>{project.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 rounded-full text-xs font-bold border" style={{ backgroundColor: theme.bgPrimary, color: theme.textSecondary, borderColor: theme.border }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col p-8 md:p-12 pt-24">
            {/* Header */}
            <div className="mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-4">
                    {t('page.future.label')}
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                    <DecryptedText text={t('page.future.title_1')} speed={80} animateOn="view" className="block text-[#ECDBBA]" />
                    <DecryptedText text={t('page.future.title_2')} speed={80} animateOn="view" delay={0.2} className="block text-[#C84B31]" />
                </h2>
                <p className="text-lg text-[#ECDBBA]/70 max-w-2xl">
                    {t('page.future.desc')}
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div 
                ref={containerRef}
                className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ touchAction: "none" }}
            >
                <motion.div
                    ref={contentRef}
                    style={{ x }}
                    className="flex gap-8 h-full will-change-transform"
                >
                    {projects.map((project, index) => {
                        const StatusIcon = statusIcons[project.status as keyof typeof statusIcons] || Sparkles;
                        const statusColorValue = statusColors[project.status as keyof typeof statusColors] || theme.textPrimary;
                        
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex-shrink-0 w-[600px] md:w-[700px] rounded-2xl p-8 transition-all duration-300 hover:shadow-lg flex flex-col"
                                style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border, borderWidth: '1px', borderStyle: 'solid' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = theme.accent;
                                    e.currentTarget.style.boxShadow = `0 10px 40px -10px ${theme.accent}33`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = theme.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>{project.title}</h3>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border" style={{ backgroundColor: theme.bgPrimary, color: statusColorValue, borderColor: statusColorValue }}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <p className="font-mono text-sm mb-4" style={{ color: theme.textSecondary }}>{project.subtitle}</p>
                                    </div>
                                    <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: theme.accent + '20' }}>
                                        <StatusIcon size={24} style={{ color: statusColorValue }} />
                                    </div>
                                </div>
                                <p className="mb-6 leading-relaxed flex-grow" style={{ color: theme.textSecondary }}>{project.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 rounded-full text-xs font-bold border" style={{ backgroundColor: theme.bgPrimary, color: theme.textSecondary, borderColor: theme.border }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Navigation Arrows */}
                {contentWidth > containerWidth && (
                    <>
                        <button
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-sm border transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
                            style={{ backgroundColor: theme.bgPrimary + 'CC', borderColor: theme.border, color: theme.textPrimary }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = theme.accent;
                                e.currentTarget.style.borderColor = theme.accent;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = theme.bgPrimary + 'CC';
                                e.currentTarget.style.borderColor = theme.border;
                            }}
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-sm border transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
                            style={{ backgroundColor: theme.bgPrimary + 'CC', borderColor: theme.border, color: theme.textPrimary }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = theme.accent;
                                e.currentTarget.style.borderColor = theme.accent;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = theme.bgPrimary + 'CC';
                                e.currentTarget.style.borderColor = theme.border;
                            }}
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </>
                )}

                {/* Progress Indicator */}
                {contentWidth > containerWidth && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 h-1.5 rounded-full overflow-hidden backdrop-blur-sm" style={{ backgroundColor: theme.bgSecondary + '80' }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{ 
                                scaleX: progress, 
                                transformOrigin: "left",
                                background: `linear-gradient(to right, ${theme.accent}, ${theme.textPrimary})`
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 30 }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

