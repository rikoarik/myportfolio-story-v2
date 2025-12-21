"use client";

import { useState } from "react";
import CursorTracker from "../components/CursorTracker";
import BackgroundController from "../components/BackgroundController";
import HorizontalScroll from "../components/HorizontalScroll";
import BottomRuler from "../components/BottomRuler";
import Section from "../components/Section";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { ArrowUpRight, Layers, Shield, Box, Zap, Database, Lock, Terminal, Key, GitBranch, Smartphone, Globe, Cloud, Cpu, Server, Radio, Monitor, Tablet } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SplitText from "@/components/bits/SplitText";
import DecryptedText from "@/components/bits/DecryptedText";
import CountUp from "@/components/bits/CountUp";
import Magnetic from "@/components/Magnetic";
import Floating from "@/components/Floating";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import ScrollAnimatedCard from "@/components/ScrollAnimatedCard";
import { useLanguage } from "@/context/LanguageContext";

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
        boxShadow: "0 20px 30px -4px rgba(0, 0, 0, 0.1)",
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
        <main className="cursor-none bg-slate-50 text-slate-900 font-sans selection:bg-orange-500/30">
            <CursorTracker />
            <Loader onLoadingComplete={() => setIsLoaded(true)} />
            <motion.div
                initial={{ y: "100vh" }}
                animate={{ y: isLoaded ? 0 : "100vh" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 z-50 bg-background w-full h-full"
            >
                <BackgroundController />
                <HorizontalScroll overlay={
                    <>
                        <Header />
                        <BottomRuler />
                    </>
                }>

                    {/* CHAPTER 1: FOUNDATION */}
                    <Section id="foundation" className="bg-[#EBEBEB] text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-300 pr-0 lg:pr-12 pb-12 lg:pb-0">
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="h-px w-12 bg-slate-900/20"></span>
                                        <span className="text-xs font-mono uppercase tracking-widest text-slate-500">{t('page.foundation.label')}</span>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12">
                                        <SplitText text={t('page.foundation.title_1')} className="block text-slate-400" />
                                        <SplitText text={t('page.foundation.title_2')} className="block text-slate-900" delay={200} />
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 border-l-2 border-slate-900/10">
                                        <p className="text-lg font-bold mb-2">{t('page.foundation.subtitle_1')}</p>
                                        <p className="text-slate-600">{t('page.foundation.desc_1')}</p>
                                    </div>
                                    <div className="p-6 border-l-2 border-slate-900/10">
                                        <p className="text-lg font-bold mb-2">{t('page.foundation.subtitle_2')}</p>
                                        <p className="text-slate-600">{t('page.foundation.desc_2')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col justify-end lg:justify-between pl-0 lg:pl-4 pt-12 lg:pt-0">
                                <div className="grid grid-rows-3 gap-px bg-slate-300">
                                    {(t('page.foundation.cards') as unknown as string[]).map((word, i) => (
                                        <div key={i} className="h-full w-full">
                                            <Magnetic>
                                                <motion.div variants={itemVariants} className="bg-[#EBEBEB] p-8 flex items-center justify-center lg:justify-start group hover:bg-white transition-colors h-full">
                                                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-slate-300 group-hover:text-slate-900 transition-colors uppercase">{word}</span>
                                                </motion.div>
                                            </Magnetic>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 2: STRUCTURE */}
                    <Section id="architecture" className="bg-[#F5F5F7] text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 p-8 md:p-12 pt-24 gap-8"
                        >
                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="mb-12">
                                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-4">{t('page.structure.label')}</span>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                                        <DecryptedText text={t('page.structure.title_1')} speed={100} animateOn="view" className="block text-slate-900" />
                                        <DecryptedText text={t('page.structure.title_2')} speed={100} animateOn="view" delay={0.2} className="block text-slate-400" />
                                    </h2>
                                    <p className="text-xl text-slate-700 leading-relaxed max-w-sm">
                                        {t('page.structure.desc')}
                                    </p>
                                </div>
                                <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <p className="font-mono text-xs text-slate-500 mb-2">{t('page.structure.contract_label')}</p>
                                    <p className="text-lg font-bold">{t('page.structure.contract_title')}</p>
                                    <p className="text-slate-600">{t('page.structure.contract_desc')}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-2 gap-4 auto-rows-fr">
                                <ScrollAnimatedCard className="col-span-2 md:col-span-1 bg-white p-8 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-shadow">
                                    <Layers className="text-orange-500 mb-4" size={32} />
                                    <div>
                                        <h3 className="font-bold text-xl mb-1">{t('page.structure.presentation.title')}</h3>
                                        <p className="text-sm text-slate-500">{t('page.structure.presentation.desc')}</p>
                                    </div>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.1} className="col-span-2 md:col-span-1 bg-white p-8 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-shadow">
                                    <Database className="text-blue-500 mb-4" size={32} />
                                    <div>
                                        <h3 className="font-bold text-xl mb-1">{t('page.structure.data.title')}</h3>
                                        <p className="text-sm text-slate-500">{t('page.structure.data.desc')}</p>
                                    </div>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.2} className="col-span-2 bg-slate-900 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                                    <div className="flex items-center gap-4">
                                        <Box className="text-emerald-400" size={32} />
                                        <div>
                                            <h3 className="font-bold text-xl">{t('page.structure.domain.title')}</h3>
                                            <p className="text-sm text-slate-400">{t('page.structure.domain.desc')}</p>
                                        </div>
                                    </div>
                                    <div className="h-px w-full md:w-24 bg-slate-700"></div>
                                    <span className="font-mono text-xs text-emerald-400">PURE LOGIC</span>
                                </ScrollAnimatedCard>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 3: STATE & FLOW */}
                    <Section id="state" className="bg-[#EEF2FF] text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col p-8 md:p-12 pt-24"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-indigo-100 pb-8">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-500 block mb-2">{t('page.state.label')}</span>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">
                                        <SplitText text={t('page.state.title_1')} className="block" delay={100} />
                                        <SplitText text={t('page.state.title_2')} className="block text-indigo-500" delay={300} />
                                    </h2>
                                </div>
                                <p className="text-indigo-900/60 text-right max-w-xs mt-4 md:mt-0 font-medium">
                                    {t('page.state.quote')}
                                </p>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                {(t('page.state.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => {
                                    const icons = [Monitor, ArrowUpRight, Zap, Terminal];
                                    const bgColors = ["bg-indigo-50", "bg-blue-50", "bg-amber-50", "bg-emerald-50"];
                                    const textColors = ["text-indigo-600", "text-blue-600", "text-amber-600", "text-emerald-600"];
                                    const Icon = icons[i];

                                    return (
                                        <Floating key={i} delay={i * 0.4}>
                                            <motion.div variants={cardVariants} whileHover="hover" className={`flex flex-col p-6 rounded-xl border border-slate-100 ${bgColors[i]} transition-transform`}>
                                                <div className={`p-3 rounded-lg bg-white w-fit mb-auto shadow-sm ${textColors[i]}`}>
                                                    <Icon size={24} />
                                                </div>
                                                <div className="mt-8">
                                                    <h3 className="font-bold text-xl text-slate-900">{item.title}</h3>
                                                    <p className="text-sm text-slate-600 mt-1">{item.sub}</p>
                                                </div>
                                            </motion.div>
                                        </Floating>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 4: OFFLINE-FIRST */}
                    <Section id="offline" className="bg-[#FFE4E6] text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-5 flex flex-col justify-center border-r-0 lg:border-r border-rose-200 pr-0 lg:pr-12">
                                <span className="text-xs font-mono uppercase tracking-widest text-rose-500 block mb-4">{t('page.offline.label')}</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
                                    <DecryptedText text={t('page.offline.title_1')} speed={80} animateOn="view" className="block text-slate-900" />
                                    <DecryptedText text={t('page.offline.title_2')} speed={80} animateOn="view" delay={0.2} className="block text-rose-400" />
                                </h2>
                                <p className="text-lg text-slate-700 mb-8">
                                    {t('page.offline.desc')}
                                </p>
                                <div className="py-4 border-t border-b border-rose-200">
                                    <p className="font-bold text-rose-900">{t('page.offline.consistency')}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-7 grid grid-rows-3 gap-2">
                                {(t('page.offline.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => {
                                    const icons = [Database, Cloud, GitBranch];
                                    const Icon = icons[i];
                                    return (
                                        <ScrollAnimatedCard key={i} delay={i * 0.15} className="bg-white p-6 md:p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow rounded-lg">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                                                <p className="text-slate-500">{item.sub}</p>
                                            </div>
                                            <div className="p-3 bg-rose-50 rounded-full text-rose-500">
                                                <Icon size={24} />
                                            </div>
                                        </ScrollAnimatedCard>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 5: HARDWARE */}
                    <Section id="hardware" className="bg-[#F3E8FF] text-slate-900">
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
                                    className="bg-purple-100 p-6 rounded-2xl mb-8 w-fit transform -rotate-2 cursor-pointer"
                                >
                                    <Cpu size={48} className="text-purple-600" />
                                </motion.div>
                                <span className="text-xs font-mono uppercase tracking-widest text-purple-600 block mb-4">{t('page.hardware.label')}</span>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                                    {(t('page.hardware.title') as string).split(' ').map((w: string, i: number) => <span key={i} className="block">{w}</span>)}
                                </h2>
                                <p className="text-slate-600">
                                    {t('page.hardware.desc')}
                                </p>
                            </div>

                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl border border-purple-100 flex flex-col justify-between h-64 md:h-auto col-span-1 md:col-span-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold">{t('page.hardware.card_main.title')}</h3>
                                        <Box className="text-purple-400" />
                                    </div>
                                    <p className="text-slate-600 text-lg">
                                        {t('page.hardware.card_main.desc')}
                                    </p>
                                </motion.div>
                                <motion.div variants={itemVariants} className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                    <p className="font-bold text-purple-900 mb-2">{t('page.hardware.card_iso.title')}</p>
                                    <p className="text-xs text-purple-700">{t('page.hardware.card_iso.desc')}</p>
                                </motion.div>
                                <motion.div variants={itemVariants} className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                    <p className="font-bold text-purple-900 mb-2">{t('page.hardware.card_stab.title')}</p>
                                    <p className="text-xs text-purple-700">{t('page.hardware.card_stab.desc')}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 6: SCALE */}
                    <Section id="multiapp" className="bg-[#ECFDF5] text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-2 p-8 md:p-12 gap-12"
                        >
                            <div className="flex flex-col justify-center relative">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                                <div className="absolute top-0 right-12 w-32 h-32 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                                <div className="relative z-10">
                                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 block mb-2">{t('page.scale.label')}</span>
                                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-4">
                                        <CountUp to={15} suffix="+" duration={2} className="text-slate-900" /><span className="text-emerald-500"></span>
                                    </h2>
                                    <h3 className="text-3xl font-bold tracking-tight mb-8">{t('page.scale.title')}</h3>
                                    <p className="text-lg text-slate-700">
                                        {t('page.scale.desc')}
                                    </p>

                                    <div className="mt-8 w-full max-w-md">
                                        <InfiniteMarquee
                                            speed={30}
                                            items={[
                                                <Box key="1" size={32} className="text-slate-400" />,
                                                <Database key="2" size={32} className="text-slate-400" />,
                                                <Cloud key="3" size={32} className="text-slate-400" />,
                                                <Smartphone key="4" size={32} className="text-slate-400" />,
                                                <Globe key="5" size={32} className="text-slate-400" />,
                                                <Lock key="6" size={32} className="text-slate-400" />,
                                                <Server key="7" size={32} className="text-slate-400" />,
                                                <Zap key="8" size={32} className="text-slate-400" />,
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 auto-rows-min content-center">
                                {(t('page.scale.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => (
                                    <ScrollAnimatedCard key={i} delay={i * 0.1} className="aspect-video bg-white border border-emerald-100 rounded-2xl p-6 flex flex-col justify-end hover:shadow-lg transition-shadow">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 mb-auto"></div>
                                        <p className="font-bold text-slate-900">{item.title}</p>
                                        <p className="text-xs text-slate-500">{item.sub}</p>
                                    </ScrollAnimatedCard>
                                ))}
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 7: SECURITY */}
                    <Section id="security" className="bg-[#1E293B] text-white">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 pt-24"
                        >
                            <div className="lg:col-span-8 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-8">
                                    <Shield className="text-emerald-400" size={32} />
                                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400">{t('page.security.label')}</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                                    <DecryptedText text={t('page.security.title_1')} speed={70} animateOn="view" className="block text-white" />
                                    <DecryptedText text={t('page.security.title_2')} speed={70} animateOn="view" delay={0.3} className="block text-slate-600" />
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800 pt-8">
                                    <div>
                                        <p className="font-bold text-white mb-2 text-xl">{t('page.security.card_1.title')}</p>
                                        <p className="text-slate-400">{t('page.security.card_1.desc')}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white mb-2 text-xl">{t('page.security.card_2.title')}</p>
                                        <p className="text-slate-400">{t('page.security.card_2.desc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                                <Lock size={64} className="text-white relative z-10" />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center justify-between text-sm border-b border-slate-800 pb-2">
                                        <span className="text-slate-500">ROOT CHECK</span>
                                        <span className="text-emerald-400 font-mono">PASS</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm border-b border-slate-800 pb-2">
                                        <span className="text-slate-500">INTEGRITY</span>
                                        <span className="text-emerald-400 font-mono">VERIFIED</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">ENCRYPTION</span>
                                        <span className="text-emerald-400 font-mono">AES-256</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 8: X-PLATFORM */}
                    <Section id="crossplatform" className="bg-[#FAFAFA] text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col p-8 md:p-12 pt-24"
                        >
                            <div className="text-center mb-12">
                                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-4">{t('page.crossplatform.label')}</span>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                                    <SplitText text={t('page.crossplatform.title_1')} className="block text-slate-900" delay={100} />
                                    <SplitText text={t('page.crossplatform.title_2')} className="block text-slate-500" delay={300} />
                                </h2>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
                                {(t('page.crossplatform.cards') as unknown as Array<{ title: string; sub: string }>).map((item, i) => {
                                    const icons = [Smartphone, Tablet, Box, Radio];
                                    const colors = ["text-green-500", "text-blue-500", "text-cyan-500", "text-sky-500"];
                                    const borders = ["hover:border-green-400", "hover:border-blue-400", "hover:border-cyan-400", "hover:border-sky-400"];
                                    const Icon = icons[i];

                                    return (
                                        <motion.div key={i} variants={itemVariants} className={`bg-white border border-slate-200 p-8 rounded-xl flex flex-col items-center justify-center gap-4 ${borders[i]} transition-colors`}>
                                            <Icon size={40} className={colors[i]} />
                                            <h3 className="font-bold text-xl">{item.title}</h3>
                                            <p className="text-xs text-center text-slate-400 uppercase tracking-widest">{item.sub}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="text-center mt-12 bg-white/50 py-4 max-w-2xl mx-auto rounded-full">
                                <p className="text-sm font-mono text-slate-500">{t('page.crossplatform.footer')}</p>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 9: PRODUCTION */}
                    <Section id="production" className="bg-[#FFF1F2] text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 pt-24 items-center"
                        >
                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest text-rose-500 block mb-4">{t('page.production.label')}</span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
                                    {t('page.production.title_1')}<br /><span className="text-rose-500">{t('page.production.title_2')}</span>
                                </h2>
                                <p className="text-xl text-slate-800 font-bold mb-4">{t('page.production.subtitle')}</p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    {t('page.production.desc')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <ScrollAnimatedCard className="bg-white border-l-4 border-rose-500 p-8 shadow-sm">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Terminal className="text-rose-500" />
                                        <h3 className="font-bold text-xl">{t('page.production.card_1.title')}</h3>
                                    </div>
                                    <p className="text-slate-600">{t('page.production.card_1.desc')}</p>
                                </ScrollAnimatedCard>
                                <ScrollAnimatedCard delay={0.2} className="bg-white border-l-4 border-slate-800 p-8 shadow-sm">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Key className="text-slate-800" />
                                        <h3 className="font-bold text-xl">{t('page.production.card_2.title')}</h3>
                                    </div>
                                    <p className="text-slate-600">{t('page.production.card_2.desc')}</p>
                                </ScrollAnimatedCard>
                            </div>
                        </motion.div>
                    </Section>

                    {/* CHAPTER 10: REFINE */}
                    <Section id="refinement" className="bg-white text-slate-900">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                            className="w-full h-full flex flex-col justify-center items-center text-center p-8 pt-24"
                        >
                            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8">{t('page.refinement.label')}</span>

                            <div className="relative mb-12">
                                <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 relative z-10">
                                    {(t('page.refinement.title') as string).split(' ').map((w: string, i: number) => <span key={i} className="block">{w}</span>)}
                                </h2>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-rose-200 blur-3xl opacity-20 -z-0 rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full border-t border-slate-100 pt-12">
                                {(t('page.refinement.cards') as unknown as Array<{ title: string; desc: string }>).map((item, i) => (
                                    <div key={i} className={`text-center ${i === 1 ? 'border-l-0 md:border-l border-r-0 md:border-r border-slate-100 px-4' : ''}`}>
                                        <p className="font-bold text-lg mb-2">{item.title}</p>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <motion.div variants={nowVariants} className="mt-16">
                                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-4">{t('page.refinement.footer')}</p>
                                <div className="h-16 w-px bg-gradient-to-b from-slate-200 to-transparent mx-auto"></div>
                            </motion.div>

                        </motion.div>
                    </Section>

                </HorizontalScroll>
            </motion.div>
        </main>
    );
}
