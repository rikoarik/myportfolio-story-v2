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
import SplitText from "@/components/bits/SplitText";
import DecryptedText from "@/components/bits/DecryptedText";
import CountUp from "@/components/bits/CountUp";
import Magnetic from "@/components/Magnetic";
import Floating from "@/components/Floating";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import ScrollAnimatedCard from "@/components/ScrollAnimatedCard";
import { useLanguage } from "@/context/LanguageContext";

// Night Sky Color Palette
// #191919 - Darkest (main bg)
// #2D4263 - Dark blue (secondary)
// #C84B31 - Orange/rust (accent)
// #ECDBBA - Cream (text)

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

    return (
        <main className="cursor-none bg-[#191919] text-[#ECDBBA] font-sans selection:bg-[#C84B31]/30">
            <CursorTracker />
            <Loader onLoadingComplete={() => setIsLoaded(true)} />
            <motion.div
                initial={{ y: "100vh" }}
                animate={{ y: isLoaded ? 0 : "100vh" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="relative lg:fixed inset-0 z-50 bg-[#191919] w-full min-h-screen lg:h-full"
            >
                <BackgroundController />
                <HorizontalScroll overlay={
                    <>
                        <Header />
                        <BottomRuler />
                    </>
                }>

                    {/* CHAPTER 1: FOUNDATION */}
                    <Section id="foundation" className="bg-[#191919] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2D4263] pr-0 lg:pr-12 pb-12 lg:pb-0">
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="h-px w-12 bg-[#C84B31]"></span>
                                        <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31]">{t('page.foundation.label')}</span>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12">
                                        <SplitText text={t('page.foundation.title_1')} className="block text-[#2D4263]" />
                                        <SplitText text={t('page.foundation.title_2')} className="block text-[#ECDBBA]" delay={200} />
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 border-l-2 border-[#C84B31]">
                                        <p className="text-lg font-bold mb-2 text-[#ECDBBA]">{t('page.foundation.subtitle_1')}</p>
                                        <p className="text-[#ECDBBA]/70">{t('page.foundation.desc_1')}</p>
                                    </div>
                                    <div className="p-6 border-l-2 border-[#C84B31]">
                                        <p className="text-lg font-bold mb-2 text-[#ECDBBA]">{t('page.foundation.subtitle_2')}</p>
                                        <p className="text-[#ECDBBA]/70">{t('page.foundation.desc_2')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col justify-end lg:justify-between pl-0 lg:pl-4 pt-12 lg:pt-0">
                                <div className="grid grid-rows-3 gap-px bg-[#2D4263]">
                                    {(t('page.foundation.cards') as unknown as string[]).map((word, i) => (
                                        <div key={i} className="h-full w-full">
                                            <Magnetic>
                                                <motion.div variants={itemVariants} className="bg-[#191919] p-8 flex items-center justify-center lg:justify-start group hover:bg-[#2D4263] transition-colors h-full">
                                                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-[#2D4263] group-hover:text-[#ECDBBA] transition-colors uppercase">{word}</span>
                                                </motion.div>
                                            </Magnetic>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 2: STRUCTURE */}
                    <Section id="architecture" className="bg-[#1a1f2e] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 p-8 md:p-12 pt-24 gap-8"
                        >
                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="mb-12">
                                    <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-4">{t('page.structure.label')}</span>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                                        <DecryptedText text={t('page.structure.title_1')} speed={100} animateOn="view" className="block text-[#ECDBBA]" />
                                        <DecryptedText text={t('page.structure.title_2')} speed={100} animateOn="view" delay={0.2} className="block text-[#2D4263]" />
                                    </h2>
                                    <p className="text-xl text-[#ECDBBA]/70 leading-relaxed max-w-sm">
                                        {t('page.structure.desc')}
                                    </p>
                                </div>
                                <div className="p-6 bg-[#2D4263] border border-[#2D4263] rounded-lg shadow-sm">
                                    <p className="font-mono text-xs text-[#ECDBBA]/50 mb-2">{t('page.structure.contract_label')}</p>
                                    <p className="text-lg font-bold text-[#ECDBBA]">{t('page.structure.contract_title')}</p>
                                    <p className="text-[#ECDBBA]/70">{t('page.structure.contract_desc')}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-2 gap-4 auto-rows-fr">
                                <ScrollAnimatedCard className="col-span-2 md:col-span-1 bg-[#2D4263] p-8 border border-[#2D4263] flex flex-col justify-between hover:shadow-lg transition-shadow rounded-lg">
                                    <Layers className="text-[#C84B31] mb-4" size={32} />
                                    <div>
                                        <h3 className="font-bold text-xl mb-1 text-[#ECDBBA]">{t('page.structure.presentation.title')}</h3>
                                        <p className="text-sm text-[#ECDBBA]/60">{t('page.structure.presentation.desc')}</p>
                                    </div>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.1} className="col-span-2 md:col-span-1 bg-[#2D4263] p-8 border border-[#2D4263] flex flex-col justify-between hover:shadow-lg transition-shadow rounded-lg">
                                    <Database className="text-[#C84B31] mb-4" size={32} />
                                    <div>
                                        <h3 className="font-bold text-xl mb-1 text-[#ECDBBA]">{t('page.structure.data.title')}</h3>
                                        <p className="text-sm text-[#ECDBBA]/60">{t('page.structure.data.desc')}</p>
                                    </div>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.2} className="col-span-2 bg-[#C84B31] text-[#ECDBBA] p-8 flex flex-col md:flex-row items-center justify-between gap-8 h-full rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <Box className="text-[#ECDBBA]" size={32} />
                                        <div>
                                            <h3 className="font-bold text-xl">{t('page.structure.domain.title')}</h3>
                                            <p className="text-sm text-[#ECDBBA]/70">{t('page.structure.domain.desc')}</p>
                                        </div>
                                    </div>
                                    <div className="h-px w-full md:w-24 bg-[#ECDBBA]/30"></div>
                                    <span className="font-mono text-xs text-[#ECDBBA]">PURE LOGIC</span>
                                </ScrollAnimatedCard>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 3: STATE & FLOW */}
                    <Section id="state" className="bg-[#2D4263] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col p-8 md:p-12 pt-24"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#ECDBBA]/20 pb-8">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-2">{t('page.state.label')}</span>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#ECDBBA]">
                                        <SplitText text={t('page.state.title_1')} className="block" delay={100} />
                                        <SplitText text={t('page.state.title_2')} className="block text-[#C84B31]" delay={300} />
                                    </h2>
                                </div>
                                <p className="text-[#ECDBBA]/60 text-right max-w-xs mt-4 md:mt-0 font-medium">
                                    {t('page.state.quote')}
                                </p>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                {(t('page.state.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => {
                                    const icons = [Monitor, ArrowUpRight, Zap, Terminal];
                                    const Icon = icons[i];

                                    return (
                                        <Floating key={i} delay={i * 0.4}>
                                            <motion.div variants={cardVariants} whileHover="hover" className="flex flex-col p-6 rounded-xl border border-[#ECDBBA]/20 bg-[#191919] transition-transform">
                                                <div className="p-3 rounded-lg bg-[#C84B31] w-fit mb-auto shadow-sm text-[#ECDBBA]">
                                                    <Icon size={24} />
                                                </div>
                                                <div className="mt-8">
                                                    <h3 className="font-bold text-xl text-[#ECDBBA]">{item.title}</h3>
                                                    <p className="text-sm text-[#ECDBBA]/60 mt-1">{item.sub}</p>
                                                </div>
                                            </motion.div>
                                        </Floating>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 4: OFFLINE-FIRST */}
                    <Section id="offline" className="bg-[#191919] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-5 flex flex-col justify-center border-r-0 lg:border-r border-[#2D4263] pr-0 lg:pr-12">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-4">{t('page.offline.label')}</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
                                    <DecryptedText text={t('page.offline.title_1')} speed={80} animateOn="view" className="block text-[#ECDBBA]" />
                                    <DecryptedText text={t('page.offline.title_2')} speed={80} animateOn="view" delay={0.2} className="block text-[#C84B31]" />
                                </h2>
                                <p className="text-lg text-[#ECDBBA]/70 mb-8">
                                    {t('page.offline.desc')}
                                </p>
                                <div className="py-4 border-t border-b border-[#2D4263]">
                                    <p className="font-bold text-[#C84B31]">{t('page.offline.consistency')}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-7 grid grid-rows-3 gap-2">
                                {(t('page.offline.cards') as unknown as Array<{ title: string; sub: string; link?: string }>).map((item, i) => {
                                    const icons = [Database, Cloud, GitBranch];
                                    const Icon = icons[i];
                                    return (
                                        <ScrollAnimatedCard key={i} delay={i * 0.15} className="group relative bg-[#2D4263] p-6 md:p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
                                            <div>
                                                <h3 className="text-xl font-bold text-[#ECDBBA]">{item.title}</h3>
                                                <p className="text-[#ECDBBA]/60 mb-2">{item.sub}</p>
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#C84B31] uppercase tracking-wider hover:underline">
                                                        <span>View Demo</span>
                                                        <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="p-3 bg-[#C84B31]/20 rounded-full text-[#C84B31] group-hover:bg-[#C84B31]/30 transition-colors">
                                                <Icon size={24} />
                                            </div>
                                        </ScrollAnimatedCard>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 5: HARDWARE */}
                    <Section id="hardware" className="bg-[#1a1f2e] text-[#ECDBBA]">
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
                                    className="bg-[#C84B31] p-6 rounded-2xl mb-8 w-fit transform -rotate-2 cursor-pointer"
                                >
                                    <Cpu size={48} className="text-[#ECDBBA]" />
                                </motion.div>
                                <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-4">{t('page.hardware.label')}</span>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                                    {(t('page.hardware.title') as string).split(' ').map((w: string, i: number) => <span key={i} className="block">{w}</span>)}
                                </h2>
                                <p className="text-[#ECDBBA]/70">
                                    {t('page.hardware.desc')}
                                </p>
                            </div>

                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div variants={itemVariants} className="bg-[#2D4263] p-8 rounded-2xl border border-[#2D4263] flex flex-col justify-between h-64 md:h-auto col-span-1 md:col-span-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold text-[#ECDBBA]">{t('page.hardware.card_main.title')}</h3>
                                        <Box className="text-[#C84B31]" />
                                    </div>
                                    <p className="text-[#ECDBBA]/70 text-lg">
                                        {t('page.hardware.card_main.desc')}
                                    </p>
                                </motion.div>
                                <motion.div variants={itemVariants} className="bg-[#191919] p-6 rounded-xl border border-[#2D4263]">
                                    <p className="font-bold text-[#ECDBBA] mb-2">{t('page.hardware.card_iso.title')}</p>
                                    <p className="text-xs text-[#ECDBBA]/60">{t('page.hardware.card_iso.desc')}</p>
                                </motion.div>
                                <motion.div variants={itemVariants} className="bg-[#191919] p-6 rounded-xl border border-[#2D4263]">
                                    <p className="font-bold text-[#ECDBBA] mb-2">{t('page.hardware.card_stab.title')}</p>
                                    <p className="text-xs text-[#ECDBBA]/60">{t('page.hardware.card_stab.desc')}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 6: SCALE */}
                    <Section id="multiapp" className="bg-[#2D4263] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-2 p-8 md:p-12 gap-12"
                        >
                            <div className="flex flex-col justify-center relative">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-[#C84B31] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                                <div className="absolute top-0 right-12 w-32 h-32 bg-[#ECDBBA] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                                <div className="relative z-10">
                                    <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-2">{t('page.scale.label')}</span>
                                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#ECDBBA] mb-4">
                                        <CountUp to={15} suffix="+" duration={2} className="text-[#ECDBBA]" /><span className="text-[#C84B31]"></span>
                                    </h2>
                                    <h3 className="text-3xl font-bold tracking-tight mb-8">{t('page.scale.title')}</h3>
                                    <p className="text-lg text-[#ECDBBA]/70">
                                        {t('page.scale.desc')}
                                    </p>

                                    <div className="mt-8 w-full max-w-md">
                                        <InfiniteMarquee
                                            speed={30}
                                            items={[
                                                <Box key="1" size={32} className="text-[#ECDBBA]/50" />,
                                                <Database key="2" size={32} className="text-[#ECDBBA]/50" />,
                                                <Cloud key="3" size={32} className="text-[#ECDBBA]/50" />,
                                                <Smartphone key="4" size={32} className="text-[#ECDBBA]/50" />,
                                                <Globe key="5" size={32} className="text-[#ECDBBA]/50" />,
                                                <Lock key="6" size={32} className="text-[#ECDBBA]/50" />,
                                                <Server key="7" size={32} className="text-[#ECDBBA]/50" />,
                                                <Zap key="8" size={32} className="text-[#ECDBBA]/50" />,
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 auto-rows-min content-center">
                                {(t('page.scale.cards') as unknown as Array<{ title: string; sub: string; link: string; type: 'playstore' | 'github' }>).map((item, i) => (
                                    <ScrollAnimatedCard key={i} delay={i * 0.1} className="aspect-video bg-[#191919] border border-[#2D4263] rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                            {item.type === 'playstore' ? <Play size={16} className="text-[#C84B31] fill-[#C84B31]" /> : <GitBranch size={16} className="text-[#ECDBBA]/50" />}
                                        </div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C84B31] to-[#C84B31]/50 mb-auto flex items-center justify-center">
                                            <span className="font-black text-[#ECDBBA] text-lg">{item.title.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#ECDBBA] leading-tight mb-1">{item.title}</p>
                                            <p className="text-[10px] uppercase tracking-wide text-[#ECDBBA]/50">{item.sub}</p>
                                        </div>
                                        <a href={item.link} className="absolute inset-0 z-10" aria-label={`View ${item.title}`}></a>
                                    </ScrollAnimatedCard>
                                ))}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 7: SECURITY */}
                    <Section id="security" className="bg-[#191919] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-8 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-8">
                                    <Shield className="text-[#C84B31]" size={32} />
                                    <span className="text-xs font-mono uppercase tracking-widest text-[#ECDBBA]/50">{t('page.security.label')}</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                                    <DecryptedText text={t('page.security.title_1')} speed={70} animateOn="view" className="block text-[#ECDBBA]" />
                                    <DecryptedText text={t('page.security.title_2')} speed={70} animateOn="view" delay={0.3} className="block text-[#2D4263]" />
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#2D4263] pt-8">
                                    <div>
                                        <p className="font-bold text-[#ECDBBA] mb-2 text-xl">{t('page.security.card_1.title')}</p>
                                        <p className="text-[#ECDBBA]/60">{t('page.security.card_1.desc')}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#ECDBBA] mb-2 text-xl">{t('page.security.card_2.title')}</p>
                                        <p className="text-[#ECDBBA]/60">{t('page.security.card_2.desc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 bg-[#2D4263] border border-[#2D4263] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#C84B31]/20 rounded-full blur-3xl animate-pulse"></div>
                                <Lock size={64} className="text-[#ECDBBA] relative z-10" />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between text-sm border-b border-[#ECDBBA]/20 pb-2">
                                        <span className="text-[#ECDBBA]/50">ROOT CHECK</span>
                                        <span className="text-[#C84B31] font-mono">PASS</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm border-b border-[#ECDBBA]/20 pb-2">
                                        <span className="text-[#ECDBBA]/50">INTEGRITY</span>
                                        <span className="text-[#C84B31] font-mono">VERIFIED</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#ECDBBA]/50">ENCRYPTION</span>
                                        <span className="text-[#C84B31] font-mono">AES-256</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 8: X-PLATFORM */}
                    <Section id="crossplatform" className="bg-[#1a1f2e] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col p-8 md:p-12 pt-24"
                        >
                            <div className="text-center mb-12">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-4">{t('page.crossplatform.label')}</span>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                                    <SplitText text={t('page.crossplatform.title_1')} className="block text-[#ECDBBA]" delay={100} />
                                    <SplitText text={t('page.crossplatform.title_2')} className="block text-[#2D4263]" delay={300} />
                                </h2>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
                                {(t('page.crossplatform.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => {
                                    const icons = [Smartphone, Tablet, Box, Radio];
                                    const Icon = icons[i];

                                    return (
                                        <motion.div key={i} variants={itemVariants} className="bg-[#2D4263] border border-[#2D4263] p-8 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-[#C84B31] transition-colors">
                                            <Icon size={40} className="text-[#C84B31]" />
                                            <h3 className="font-bold text-xl text-[#ECDBBA]">{item.title}</h3>
                                            <p className="text-xs text-center text-[#ECDBBA]/50 uppercase tracking-widest">{item.sub}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="text-center mt-12 bg-[#191919]/50 py-4 max-w-2xl mx-auto rounded-full">
                                <p className="text-sm font-mono text-[#ECDBBA]/50">{t('page.crossplatform.footer')}</p>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 9: PRODUCTION */}
                    <Section id="production" className="bg-[#191919] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 pt-24 items-center"
                        >
                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] block mb-4">{t('page.production.label')}</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                                    {t('page.production.title_1')}<br /><span className="text-[#C84B31]">{t('page.production.title_2')}</span>
                                </h2>
                                <p className="text-xl text-[#ECDBBA] font-bold mb-4">{t('page.production.subtitle')}</p>
                                <p className="text-[#ECDBBA]/70 text-lg leading-relaxed">
                                    {t('page.production.desc')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <ScrollAnimatedCard className="bg-[#2D4263] border-l-4 border-[#C84B31] p-8 shadow-sm rounded-lg">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Terminal className="text-[#C84B31]" />
                                        <h3 className="font-bold text-xl text-[#ECDBBA]">{t('page.production.card_1.title')}</h3>
                                    </div>
                                    <p className="text-[#ECDBBA]/70">{t('page.production.card_1.desc')}</p>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.2} className="bg-[#2D4263] border-l-4 border-[#ECDBBA] p-8 shadow-sm rounded-lg">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Key className="text-[#ECDBBA]" />
                                        <h3 className="font-bold text-xl text-[#ECDBBA]">{t('page.production.card_2.title')}</h3>
                                    </div>
                                    <p className="text-[#ECDBBA]/70">{t('page.production.card_2.desc')}</p>
                                </ScrollAnimatedCard>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 10: REFINE */}
                    <Section id="refinement" className="bg-[#2D4263] text-[#ECDBBA]">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col justify-center items-center text-center p-8 pt-24"
                        >
                            <span className="text-xs font-mono uppercase tracking-widest text-[#C84B31] mb-8">{t('page.refinement.label')}</span>

                            <div className="relative mb-12">
                                <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-[#ECDBBA] relative z-10">
                                    {(t('page.refinement.title') as string).split(' ').map((w: string, i: number) => <span key={i} className="block">{w}</span>)}
                                </h2>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#C84B31] to-[#2D4263] blur-3xl opacity-20 -z-0 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full border-t border-[#ECDBBA]/20 pt-12">
                                {(t('page.refinement.cards') as unknown as Array<{ title: string; desc: string }>).map((item, i) => (
                                    <div key={i} className={`text-center ${i === 1 ? 'border-l-0 md:border-l border-r-0 md:border-r border-[#ECDBBA]/20 px-4' : ''}`}>
                                        <p className="font-bold text-lg mb-2 text-[#ECDBBA]">{item.title}</p>
                                        <p className="text-sm text-[#ECDBBA]/60">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <motion.div variants={nowVariants} className="mt-16">
                                <p className="text-[#ECDBBA]/50 font-mono text-xs uppercase tracking-widest mb-4">{t('page.refinement.footer')}</p>
                                <div className="h-16 w-px bg-gradient-to-b from-[#C84B31] to-transparent mx-auto"></div>
                            </motion.div>

                        </motion.div>
                    </Section>

                </HorizontalScroll>
            </motion.div>
        </main>
    );
}
