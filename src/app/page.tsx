"use client";

import { useState } from "react";
import CursorTracker from "../components/CursorTracker";
import BackgroundController from "../components/BackgroundController";
import HorizontalScroll from "../components/HorizontalScroll";
import BottomRuler from "../components/BottomRuler";
import Section from "../components/Section";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { ArrowUpRight, Layers, Shield, Box, Zap, Database, Lock, Terminal, Key, GitBranch, Smartphone, Globe, Cloud, Cpu, Server, Radio, Monitor, Tablet, ExternalLink, Play } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Lanyard from "@/components/bits/Lanyard";
import SplitText from "@/components/bits/SplitText";
import DecryptedText from "@/components/bits/DecryptedText";
import CountUp from "@/components/bits/CountUp";
import Magnetic from "@/components/Magnetic";
import Floating from "@/components/Floating";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import ScrollAnimatedCard from "@/components/ScrollAnimatedCard";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { useSectionThemes } from "@/hooks/useSectionTheme";

// Section-specific color palettes with time-based blending
// Each section has unique colors (75%) + time-based colors (25%)

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 50, rotateX: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
        }
    },
    hover: {
        scale: 1.02,
        y: -10,
        rotateX: 5,
        boxShadow: "0 20px 30px -4px rgba(0, 0, 0, 0.3)",
        transition: { type: "spring", stiffness: 300, damping: 15 }
    }
};

const nowVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { t } = useLanguage();
    const { theme } = useTheme();

    // Get all section themes with time-based blending
    const sectionThemes = useSectionThemes([
        'foundation',
        'architecture',
        'state',
        'offline',
        'hardware',
        'multiapp',
        'security',
        'crossplatform',
        'production',
        'refinement',
        'future'
    ]);

    return (
        <main
            className="cursor-none font-sans"
            style={{
                backgroundColor: "transparent",
                color: theme.textPrimary,
                transition: 'color 1s ease'
            }}
        >
            <CursorTracker />
            <Loader onLoadingComplete={() => setIsLoaded(true)} />
            <motion.div
                initial={{ y: "100vh" }}
                animate={{ y: isLoaded ? 0 : "100vh" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="relative lg:fixed inset-0 z-50 w-full min-h-screen lg:h-full"
                style={{ backgroundColor: "transparent" }}
            >
                <HorizontalScroll overlay={
                    <>
                        <BackgroundController sectionThemes={sectionThemes} />
                        <Header />
                        <BottomRuler />
                    </>
                }>

                    {/* CHAPTER 1: FOUNDATION - Deep Navy (ComPsych) */}
                    <Section id="foundation" style={{ backgroundColor: "transparent", color: sectionThemes.foundation.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="hidden lg:block absolute left-90 -top-20 w-3/4 h-[120%] z-10 pointer-events-none select-none mix-blend-difference">
                                <Lanyard />
                            </div>
                            <div className="lg:col-span-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r pr-0 lg:pr-12 pb-12 lg:pb-0 relative" style={{ borderColor: sectionThemes.foundation.border }}>
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="h-px w-12" style={{ backgroundColor: sectionThemes.foundation.accent }}></span>
                                        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: sectionThemes.foundation.accent }}>{t('page.foundation.label')}</span>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12">
                                        <SplitText text={t('page.foundation.title_1')} className="block" style={{ color: sectionThemes.foundation.textSecondary }} />
                                        <SplitText text={t('page.foundation.title_2')} className="block" style={{ color: sectionThemes.foundation.textPrimary }} delay={200} />
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 border-l-2" style={{ borderColor: sectionThemes.foundation.accent }}>
                                        <p className="text-lg font-bold mb-2" style={{ color: sectionThemes.foundation.textPrimary }}>{t('page.foundation.subtitle_1')}</p>
                                        <p style={{ color: sectionThemes.foundation.textSecondary }}>{t('page.foundation.desc_1')}</p>
                                    </div>
                                    <div className="p-6 border-l-2" style={{ borderColor: sectionThemes.foundation.accent }}>
                                        <p className="text-lg font-bold mb-2" style={{ color: sectionThemes.foundation.textPrimary }}>{t('page.foundation.subtitle_2')}</p>
                                        <p style={{ color: sectionThemes.foundation.textSecondary }}>{t('page.foundation.desc_2')}</p>
                                    </div>
                                </div>

                            </div>


                            <div className="lg:col-span-4 flex flex-col justify-end lg:justify-between pl-0 lg:pl-4 pt-12 lg:pt-0">
                                <div className="grid grid-rows-3 gap-px" style={{ backgroundColor: sectionThemes.foundation.bgSecondary }}>
                                    {(t('page.foundation.cards') as unknown as string[]).map((word, i) => (
                                        <div key={i} className="h-full w-full">
                                            <Magnetic>
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="p-8 flex items-center justify-center lg:justify-start group transition-colors h-full"
                                                    style={{ backgroundColor: sectionThemes.foundation.bgPrimary }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = sectionThemes.foundation.bgSecondary}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = sectionThemes.foundation.bgPrimary}
                                                >
                                                    <span
                                                        className="text-4xl md:text-5xl font-black tracking-tighter transition-colors uppercase"
                                                        style={{ color: sectionThemes.foundation.textSecondary }}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = sectionThemes.foundation.textPrimary}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = sectionThemes.foundation.textSecondary}
                                                    >{word}</span>
                                                </motion.div>
                                            </Magnetic>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>


                    </Section>

                    {/* CHAPTER 2: STRUCTURE - Teal/Cyan */}
                    <Section id="architecture" style={{ backgroundColor: "transparent", color: sectionThemes.architecture.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 p-8 md:p-12 pt-24 gap-8"
                        >
                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="mb-12">
                                    <span className="text-xs font-mono uppercase tracking-widest block mb-4" style={{ color: sectionThemes.architecture.accent }}>{t('page.structure.label')}</span>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                                        <DecryptedText text={t('page.structure.title_1')} speed={100} animateOn="view" className="block" style={{ color: sectionThemes.architecture.textPrimary }} />
                                        <DecryptedText text={t('page.structure.title_2')} speed={100} animateOn="view" delay={0.2} className="block" style={{ color: sectionThemes.architecture.bgSecondary }} />
                                    </h2>
                                    <p className="text-xl leading-relaxed max-w-sm" style={{ color: sectionThemes.architecture.textSecondary }}>
                                        {t('page.structure.desc')}
                                    </p>
                                </div>
                                <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                    <p className="font-mono text-xs mb-2" style={{ color: theme.textSecondary }}>{t('page.structure.contract_label')}</p>
                                    <p className="text-lg font-bold" style={{ color: theme.textPrimary }}>{t('page.structure.contract_title')}</p>
                                    <p style={{ color: theme.textSecondary }}>{t('page.structure.contract_desc')}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-2 gap-4 auto-rows-fr">
                                <ScrollAnimatedCard className="col-span-2 md:col-span-1 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow rounded-lg" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                    <Layers className="mb-4" size={32} style={{ color: theme.accent }} />
                                    <div>
                                        <h3 className="font-bold text-xl mb-1" style={{ color: theme.textPrimary }}>{t('page.structure.presentation.title')}</h3>
                                        <p className="text-sm" style={{ color: theme.textSecondary }}>{t('page.structure.presentation.desc')}</p>
                                    </div>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.1} className="col-span-2 md:col-span-1 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow rounded-lg" style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                    <Database className="mb-4" size={32} style={{ color: theme.accent }} />
                                    <div>
                                        <h3 className="font-bold text-xl mb-1" style={{ color: theme.textPrimary }}>{t('page.structure.data.title')}</h3>
                                        <p className="text-sm" style={{ color: theme.textSecondary }}>{t('page.structure.data.desc')}</p>
                                    </div>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.2} className="col-span-2 p-8 flex flex-col md:flex-row items-center justify-between gap-8 h-full rounded-lg" style={{ backgroundColor: theme.accent, color: theme.textPrimary }}>
                                    <div className="flex items-center gap-4">
                                        <Box size={32} style={{ color: theme.textPrimary }} />
                                        <div>
                                            <h3 className="font-bold text-xl">{t('page.structure.domain.title')}</h3>
                                            <p className="text-sm" style={{ color: theme.textSecondary }}>{t('page.structure.domain.desc')}</p>
                                        </div>
                                    </div>
                                    <div className="h-px w-full md:w-24" style={{ backgroundColor: theme.textPrimary + '30' }}></div>
                                    <span className="font-mono text-xs" style={{ color: theme.textPrimary }}>PURE LOGIC</span>
                                </ScrollAnimatedCard>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 3: STATE & FLOW */}
                    <Section id="state" style={{ backgroundColor: "transparent", color: sectionThemes.state.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col p-8 md:p-12 pt-24"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b pb-8" style={{ borderColor: sectionThemes.state.textPrimary + '20' }}>
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: sectionThemes.state.accent }}>{t('page.state.label')}</span>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter" style={{ color: sectionThemes.state.textPrimary }}>
                                        <SplitText text={t('page.state.title_1')} className="block" delay={100} />
                                        <SplitText text={t('page.state.title_2')} className="block" style={{ color: sectionThemes.state.accent }} delay={300} />
                                    </h2>
                                </div>
                                <p className="text-right max-w-xs mt-4 md:mt-0 font-medium" style={{ color: sectionThemes.state.textSecondary }}>
                                    {t('page.state.quote')}
                                </p>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                {(t('page.state.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => {
                                    const icons = [Monitor, ArrowUpRight, Zap, Terminal];
                                    const Icon = icons[i];

                                    return (
                                        <Floating key={i} delay={i * 0.4}>
                                            <motion.div variants={cardVariants} whileHover="hover" className="flex flex-col p-6 rounded-xl border transition-transform" style={{ borderColor: sectionThemes.state.textPrimary + '20', backgroundColor: sectionThemes.state.bgPrimary }}>
                                                <div className="p-3 rounded-lg w-fit mb-auto shadow-sm" style={{ backgroundColor: sectionThemes.state.accent, color: sectionThemes.state.textPrimary }}>
                                                    <Icon size={24} />
                                                </div>
                                                <div className="mt-8">
                                                    <h3 className="font-bold text-xl" style={{ color: sectionThemes.state.textPrimary }}>{item.title}</h3>
                                                    <p className="text-sm mt-1" style={{ color: sectionThemes.state.textSecondary }}>{item.sub}</p>
                                                </div>
                                            </motion.div>
                                        </Floating>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 4: OFFLINE-FIRST */}
                    <Section id="offline" style={{ backgroundColor: "transparent", color: sectionThemes.offline.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-5 flex flex-col justify-center border-r-0 lg:border-r pr-0 lg:pr-12" style={{ borderColor: sectionThemes.offline.border }}>
                                <span className="text-xs font-mono uppercase tracking-widest block mb-4" style={{ color: sectionThemes.offline.accent }}>{t('page.offline.label')}</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
                                    <DecryptedText text={t('page.offline.title_1')} speed={80} animateOn="view" className="block" style={{ color: sectionThemes.offline.textPrimary }} />
                                    <DecryptedText text={t('page.offline.title_2')} speed={80} animateOn="view" delay={0.2} className="block" style={{ color: sectionThemes.offline.accent }} />
                                </h2>
                                <p className="text-lg mb-8" style={{ color: sectionThemes.offline.textSecondary }}>
                                    {t('page.offline.desc')}
                                </p>
                                <div className="py-4 border-t border-b" style={{ borderColor: sectionThemes.offline.border }}>
                                    <p className="font-bold" style={{ color: sectionThemes.offline.accent }}>{t('page.offline.consistency')}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-7 grid grid-rows-3 gap-2">
                                {(t('page.offline.cards') as unknown as Array<{ title: string; sub: string; link?: string }>).map((item, i) => {
                                    const icons = [Database, Cloud, GitBranch];
                                    const Icon = icons[i];
                                    return (
                                        <ScrollAnimatedCard key={i} delay={i * 0.15} className="group relative p-6 md:p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden" style={{ backgroundColor: sectionThemes.offline.bgSecondary }}>
                                            <div>
                                                <h3 className="text-xl font-bold" style={{ color: sectionThemes.offline.textPrimary }}>{item.title}</h3>
                                                <p className="mb-2" style={{ color: sectionThemes.offline.textSecondary }}>{item.sub}</p>
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:underline" style={{ color: sectionThemes.offline.accent }}>
                                                        <span>View Demo</span>
                                                        <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="p-3 rounded-full transition-colors" style={{ backgroundColor: sectionThemes.offline.accent + '20', color: sectionThemes.offline.accent }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = sectionThemes.offline.accent + '30'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = sectionThemes.offline.accent + '20'}>
                                                <Icon size={24} />
                                            </div>
                                        </ScrollAnimatedCard>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 5: HARDWARE */}
                    <Section id="hardware" style={{ backgroundColor: "transparent", color: sectionThemes.hardware.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-4 flex flex-col justify-center">
                                <motion.div
                                    whileHover={{ rotate: 180, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    className="p-6 rounded-2xl mb-8 w-fit transform -rotate-2 cursor-pointer"
                                    style={{ backgroundColor: sectionThemes.hardware.accent }}
                                >
                                    <Cpu size={48} style={{ color: sectionThemes.hardware.textPrimary }} />
                                </motion.div>
                                <span className="text-xs font-mono uppercase tracking-widest block mb-4" style={{ color: sectionThemes.hardware.accent }}>{t('page.hardware.label')}</span>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                                    {(t('page.hardware.title') as string).split(' ').map((w: string, i: number) => <span key={i} className="block">{w}</span>)}
                                </h2>
                                <p style={{ color: sectionThemes.hardware.textSecondary }}>
                                    {t('page.hardware.desc')}
                                </p>
                            </div>

                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div variants={itemVariants} className="p-8 rounded-2xl flex flex-col justify-between h-64 md:h-auto col-span-1 md:col-span-2" style={{ backgroundColor: sectionThemes.hardware.bgSecondary, borderColor: sectionThemes.hardware.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold" style={{ color: sectionThemes.hardware.textPrimary }}>{t('page.hardware.card_main.title')}</h3>
                                        <Box style={{ color: sectionThemes.hardware.accent }} />
                                    </div>
                                    <p className="text-lg" style={{ color: sectionThemes.hardware.textSecondary }}>
                                        {t('page.hardware.card_main.desc')}
                                    </p>
                                </motion.div>
                                <motion.div variants={itemVariants} className="p-6 rounded-xl" style={{ backgroundColor: sectionThemes.hardware.bgPrimary, borderColor: sectionThemes.hardware.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                    <p className="font-bold mb-2" style={{ color: sectionThemes.hardware.textPrimary }}>{t('page.hardware.card_iso.title')}</p>
                                    <p className="text-xs" style={{ color: sectionThemes.hardware.textSecondary }}>{t('page.hardware.card_iso.desc')}</p>
                                </motion.div>
                                <motion.div variants={itemVariants} className="p-6 rounded-xl" style={{ backgroundColor: sectionThemes.hardware.bgPrimary, borderColor: sectionThemes.hardware.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                    <p className="font-bold mb-2" style={{ color: sectionThemes.hardware.textPrimary }}>{t('page.hardware.card_stab.title')}</p>
                                    <p className="text-xs" style={{ color: sectionThemes.hardware.textSecondary }}>{t('page.hardware.card_stab.desc')}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 6: SCALE */}
                    <Section id="multiapp" style={{ backgroundColor: "transparent", color: sectionThemes.multiapp.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-2 p-8 md:p-12 gap-12"
                        >
                            <div className="flex flex-col justify-center relative">
                                <div className="absolute top-0 left-0 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" style={{ backgroundColor: sectionThemes.multiapp.accent }}></div>
                                <div className="absolute top-0 right-12 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: sectionThemes.multiapp.textPrimary }}></div>

                                <div className="relative z-10">
                                    <span className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: sectionThemes.multiapp.accent }}>{t('page.scale.label')}</span>
                                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4" style={{ color: sectionThemes.multiapp.textPrimary }}>
                                        <CountUp to={15} suffix="+" duration={2} style={{ color: sectionThemes.multiapp.textPrimary }} /><span style={{ color: sectionThemes.multiapp.accent }}></span>
                                    </h2>
                                    <h3 className="text-3xl font-bold tracking-tight mb-8">{t('page.scale.title')}</h3>
                                    <p className="text-lg" style={{ color: sectionThemes.multiapp.textSecondary }}>
                                        {t('page.scale.desc')}
                                    </p>

                                    <div className="mt-8 w-full max-w-md">
                                        <InfiniteMarquee
                                            speed={30}
                                            items={[
                                                <Box key="1" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                                <Database key="2" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                                <Cloud key="3" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                                <Smartphone key="4" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                                <Globe key="5" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                                <Lock key="6" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                                <Server key="7" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                                <Zap key="8" size={32} style={{ color: sectionThemes.multiapp.textSecondary }} />,
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 auto-rows-min content-center">
                                {(t('page.scale.cards') as unknown as Array<{ title: string; sub: string; link: string; type: 'playstore' | 'github' }>).map((item, i) => (
                                    <ScrollAnimatedCard key={i} delay={i * 0.1} className="aspect-video rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1 group relative overflow-hidden" style={{ backgroundColor: sectionThemes.multiapp.bgPrimary, borderColor: sectionThemes.multiapp.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                            {item.type === 'playstore' ? <Play size={16} style={{ color: sectionThemes.multiapp.accent, fill: sectionThemes.multiapp.accent }} /> : <GitBranch size={16} style={{ color: sectionThemes.multiapp.textSecondary }} />}
                                        </div>
                                        <div className="w-10 h-10 rounded-xl mb-auto flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${sectionThemes.multiapp.accent}, ${sectionThemes.multiapp.accent}80)` }}>
                                            <span className="font-black text-lg" style={{ color: sectionThemes.multiapp.textPrimary }}>{item.title.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold leading-tight mb-1" style={{ color: sectionThemes.multiapp.textPrimary }}>{item.title}</p>
                                            <p className="text-[10px] uppercase tracking-wide" style={{ color: sectionThemes.multiapp.textSecondary }}>{item.sub}</p>
                                        </div>
                                        <a href={item.link} className="absolute inset-0 z-10" aria-label={`View ${item.title}`}></a>
                                    </ScrollAnimatedCard>
                                ))}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 7: SECURITY */}
                    <Section id="security" style={{ backgroundColor: "transparent", color: sectionThemes.security.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-8 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-8">
                                    <Shield size={32} style={{ color: sectionThemes.security.accent }} />
                                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: sectionThemes.security.textSecondary }}>{t('page.security.label')}</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                                    <DecryptedText text={t('page.security.title_1')} speed={70} animateOn="view" className="block" style={{ color: sectionThemes.security.textPrimary }} />
                                    <DecryptedText text={t('page.security.title_2')} speed={70} animateOn="view" delay={0.3} className="block" style={{ color: sectionThemes.security.bgSecondary }} />
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8" style={{ borderColor: sectionThemes.security.border }}>
                                    <div>
                                        <p className="font-bold mb-2 text-xl" style={{ color: sectionThemes.security.textPrimary }}>{t('page.security.card_1.title')}</p>
                                        <p style={{ color: sectionThemes.security.textSecondary }}>{t('page.security.card_1.desc')}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold mb-2 text-xl" style={{ color: sectionThemes.security.textPrimary }}>{t('page.security.card_2.title')}</p>
                                        <p style={{ color: sectionThemes.security.textSecondary }}>{t('page.security.card_2.desc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden" style={{ backgroundColor: sectionThemes.security.bgSecondary, borderColor: sectionThemes.security.border, borderWidth: '1px', borderStyle: 'solid' }}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: sectionThemes.security.accent + '20' }}></div>
                                <Lock size={64} className="relative z-10" style={{ color: sectionThemes.security.textPrimary }} />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between text-sm border-b pb-2" style={{ borderColor: sectionThemes.security.textPrimary + '20' }}>
                                        <span style={{ color: sectionThemes.security.textSecondary }}>ROOT CHECK</span>
                                        <span className="font-mono" style={{ color: sectionThemes.security.accent }}>PASS</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm border-b pb-2" style={{ borderColor: sectionThemes.security.textPrimary + '20' }}>
                                        <span style={{ color: sectionThemes.security.textSecondary }}>INTEGRITY</span>
                                        <span className="font-mono" style={{ color: sectionThemes.security.accent }}>VERIFIED</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span style={{ color: sectionThemes.security.textSecondary }}>ENCRYPTION</span>
                                        <span className="font-mono" style={{ color: sectionThemes.security.accent }}>AES-256</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 8: X-PLATFORM */}
                    <Section id="crossplatform" style={{ backgroundColor: "transparent", color: sectionThemes.crossplatform.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col p-8 md:p-12 pt-24"
                        >
                            <div className="text-center mb-12">
                                <span className="text-xs font-mono uppercase tracking-widest block mb-4" style={{ color: sectionThemes.crossplatform.accent }}>{t('page.crossplatform.label')}</span>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                                    <SplitText text={t('page.crossplatform.title_1')} className="block" style={{ color: sectionThemes.crossplatform.textPrimary }} delay={100} />
                                    <SplitText text={t('page.crossplatform.title_2')} className="block" style={{ color: sectionThemes.crossplatform.bgSecondary }} delay={300} />
                                </h2>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
                                {(t('page.crossplatform.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => {
                                    const icons = [Smartphone, Tablet, Box, Radio];
                                    const Icon = icons[i];

                                    return (
                                        <motion.div key={i} variants={itemVariants} className="p-8 rounded-xl flex flex-col items-center justify-center gap-4 transition-colors" style={{ backgroundColor: sectionThemes.crossplatform.bgSecondary, borderColor: sectionThemes.crossplatform.border, borderWidth: '1px', borderStyle: 'solid' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = sectionThemes.crossplatform.accent} onMouseLeave={(e) => e.currentTarget.style.borderColor = sectionThemes.crossplatform.border}>
                                            <Icon size={40} style={{ color: sectionThemes.crossplatform.accent }} />
                                            <h3 className="font-bold text-xl" style={{ color: sectionThemes.crossplatform.textPrimary }}>{item.title}</h3>
                                            <p className="text-xs text-center uppercase tracking-widest" style={{ color: sectionThemes.crossplatform.textSecondary }}>{item.sub}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="text-center mt-12 py-4 max-w-2xl mx-auto rounded-full" style={{ backgroundColor: sectionThemes.crossplatform.bgPrimary + '80' }}>
                                <p className="text-sm font-mono" style={{ color: sectionThemes.crossplatform.textSecondary }}>{t('page.crossplatform.footer')}</p>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 9: PRODUCTION */}
                    <Section id="production" style={{ backgroundColor: "transparent", color: sectionThemes.production.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 pt-24 items-center"
                        >
                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest block mb-4" style={{ color: sectionThemes.production.accent }}>{t('page.production.label')}</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                                    {t('page.production.title_1')}<br /><span style={{ color: sectionThemes.production.accent }}>{t('page.production.title_2')}</span>
                                </h2>
                                <p className="text-xl font-bold mb-4" style={{ color: sectionThemes.production.textPrimary }}>{t('page.production.subtitle')}</p>
                                <p className="text-lg leading-relaxed" style={{ color: sectionThemes.production.textSecondary }}>
                                    {t('page.production.desc')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <ScrollAnimatedCard className="p-8 shadow-sm rounded-lg" style={{ backgroundColor: sectionThemes.production.bgSecondary, borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: sectionThemes.production.accent }}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Terminal style={{ color: sectionThemes.production.accent }} />
                                        <h3 className="font-bold text-xl" style={{ color: sectionThemes.production.textPrimary }}>{t('page.production.card_1.title')}</h3>
                                    </div>
                                    <p style={{ color: sectionThemes.production.textSecondary }}>{t('page.production.card_1.desc')}</p>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.2} className="p-8 shadow-sm rounded-lg" style={{ backgroundColor: sectionThemes.production.bgSecondary, borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: sectionThemes.production.textPrimary }}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Key style={{ color: sectionThemes.production.textPrimary }} />
                                        <h3 className="font-bold text-xl" style={{ color: sectionThemes.production.textPrimary }}>{t('page.production.card_2.title')}</h3>
                                    </div>
                                    <p style={{ color: sectionThemes.production.textSecondary }}>{t('page.production.card_2.desc')}</p>
                                </ScrollAnimatedCard>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 10: REFINE */}
                    <Section id="refinement" style={{ backgroundColor: "transparent", color: sectionThemes.refinement.textPrimary }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col justify-center items-center text-center p-8 pt-24"
                        >
                            <span className="text-xs font-mono uppercase tracking-widest mb-8" style={{ color: sectionThemes.refinement.accent }}>{t('page.refinement.label')}</span>

                            <div className="relative mb-12">
                                <h2 className="text-6xl md:text-9xl font-black tracking-tighter relative z-10" style={{ color: sectionThemes.refinement.textPrimary }}>
                                    {(t('page.refinement.title') as string).split(' ').map((w: string, i: number) => <span key={i} className="block">{w}</span>)}
                                </h2>
                                <div className="absolute inset-0 blur-3xl opacity-20 -z-0 rounded-full" style={{ background: `linear-gradient(to right, ${sectionThemes.refinement.accent}, ${sectionThemes.refinement.bgSecondary})` }}></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full border-t pt-12" style={{ borderColor: sectionThemes.refinement.textPrimary + '20' }}>
                                {(t('page.refinement.cards') as unknown as Array<{ title: string; desc: string }>).map((item, i) => (
                                    <div key={i} className={`text-center ${i === 1 ? 'border-l-0 md:border-l border-r-0 md:border-r px-4' : ''}`} style={i === 1 ? { borderColor: sectionThemes.refinement.textPrimary + '20' } : {}}>
                                        <p className="font-bold text-lg mb-2" style={{ color: sectionThemes.refinement.textPrimary }}>{item.title}</p>
                                        <p className="text-sm" style={{ color: sectionThemes.refinement.textSecondary }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <motion.div variants={nowVariants} className="mt-16">
                                <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: sectionThemes.refinement.textSecondary }}>{t('page.refinement.footer')}</p>
                                <div className="h-16 w-px mx-auto" style={{ background: `linear-gradient(to bottom, ${sectionThemes.refinement.accent}, transparent)` }}></div>
                            </motion.div>

                        </motion.div>
                    </Section>

                    {/* CHAPTER 11: PROJECTS */}
                    <Section id="future" style={{ backgroundColor: "transparent", color: sectionThemes.future.textPrimary }}>
                        <ProjectsShowcase />
                    </Section>

                </HorizontalScroll>
            </motion.div>
        </main>
    );
}
