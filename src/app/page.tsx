"use client";

import { useState } from "react";

import CursorTracker from "../components/CursorTracker";
import BackgroundController from "../components/BackgroundController";
import HorizontalScroll from "../components/HorizontalScroll";
import BottomRuler from "../components/BottomRuler";
import Section from "../components/Section";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { ArrowUpRight, Smartphone, Wifi, Layers, Shield, Box, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import TextReveal from "@/components/TextReveal";
import SplitText from "@/components/bits/SplitText";
import ShinyText from "@/components/bits/ShinyText";
import TrueFocus from "@/components/bits/TrueFocus";
import DecryptedText from "@/components/bits/DecryptedText";
import CountUp from "@/components/bits/CountUp";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// --- 1. Void (Blur Fade) ---
const voidVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

// --- 2. Origin (Slide Up + Scale) ---
const originVariants: Variants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // easeOutExpo
  }
};

// --- 3. Pressure (Heavy Snap) ---
const pressureVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 }
  }
};

// --- 4. Control (3D Flip) ---
const controlVariants: Variants = {
  hidden: { opacity: 0, rotateX: 90, y: 20 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.8, ease: "backOut" }
  }
};

// --- 5. Systems (Slide In Right) ---
const systemsVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// --- 6. Scale (Zoom Out) ---
const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 1.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
  }
};

// --- 7. Tools (Bouncy Pop) ---
const toolsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

// --- 8. Now (Standard Fade Up) ---
const nowVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="cursor-none">
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

          {/* CHAPTER 1: VOID */}
          {/* CHAPTER 1: VOID */}
          <Section id="void" className="bg-[#EBEBEB] text-slate-900" contentClassName="pt-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="w-full h-full grid grid-rows-[1fr_auto] p-8 md:p-12 gap-8"
            >
              <motion.div variants={voidVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                <div className="flex flex-col justify-center">
                  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] text-slate-900 mb-4">
                    <SplitText text="ARIK RIKO" className="block" delay={300} />
                    <SplitText text="PRASETYA" className="block" delay={500} />
                  </h1>
                </div>
                <div className="flex flex-col justify-end pb-4">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-slate-600 leading-tight italic text-right">
                    &quot;Some systems collapse under pressure. Not immediately, but gradually—until failure becomes inevitable.&quot;
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={voidVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-900/10 pt-6"
              >
                <div className="space-y-2 text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
                  <p>
                    I work in environments where that kind of failure is not acceptable.
                    Where downtime means lost transactions.
                  </p>
                  <p className="font-bold text-slate-900">
                    This work begins before anything breaks.
                  </p>
                </div>
                <div className="flex flex-col justify-end">
                  <ul className="space-y-0 text-5xl md:text-6xl font-black uppercase tracking-tighter text-slate-300 text-right">
                    <li>Android</li>
                    <li>Fintech</li>
                    <li>Gov</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </Section>

          {/* CHAPTER 2: ORIGIN */}
          {/* CHAPTER 2: ORIGIN */}
          <Section id="origin" className="bg-[#F5F5F7] text-slate-900">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              className="grid grid-cols-1 lg:grid-cols-2 h-full w-full"
            >
              <div className="h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-slate-300">
                <motion.div variants={originVariants}>
                  <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85]">
                    <TextReveal text="The Spark" className="block text-slate-900" mode="typewriter" />
                  </h2>
                  <div className="space-y-6 text-slate-700 leading-relaxed text-lg max-w-md">
                    <p>
                      I didn’t start by building flashy products. I started by working on systems that had to function, no matter the conditions.
                    </p>
                    <ul className="space-y-2 font-mono text-xs text-slate-500 bg-white/50 p-4 rounded-lg">
                      <li>[WARN] Unstable networks</li>
                      <li>[WARN] Inconsistent devices</li>
                      <li>[WARN] User impatience</li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={originVariants}
                className="h-full flex flex-col justify-center items-center p-8 md:p-16 bg-white/40"
              >
                <div className="max-w-md">
                  <p className="text-3xl font-serif italic text-slate-800 leading-tight mb-8">
                    &quot;It’s not about screens. It’s about decisions—what to protect, and what must never fail.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-1 bg-slate-900" />
                    <span className="font-bold uppercase tracking-widest text-xs">Core Principle</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Section>

          {/* CHAPTER 3: PRESSURE */}
          {/* CHAPTER 3: PRESSURE */}
          <Section id="pressure" className="bg-[#FFE4E6] text-slate-900">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              className="w-full h-full grid grid-cols-1 md:grid-cols-12"
            >
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between h-full border-r border-rose-200">
                <motion.div variants={pressureVariants}>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase leading-none">
                    Fintech doesn&apos;t forgive.
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Transacting money is different. There is no &quot;undo&quot;. Every pixel implies a promise of accuracy.
                  </p>
                </motion.div>
                <SpotlightCard className="p-6 bg-white/60 backdrop-blur-md" spotlightColor="rgba(244, 63, 94, 0.1)">
                  <div className="flex flex-col gap-3 font-mono text-xs text-rose-900">
                    <div className="flex justify-between border-b border-rose-200 pb-2">
                      <span>TRANSACTIONS</span>
                      <span className="font-bold">ACCURATE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SECURITY</span>
                      <span className="font-bold">ABSOLUTE</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>

              <div className="md:col-span-7 p-8 md:p-12 grid grid-rows-3 gap-4">
                {[
                  { title: "NFC / EDC", desc: "Physical constraints.", icon: <Box /> },
                  { title: "Offline-First", desc: "Sync challenges.", icon: <Wifi /> },
                  { title: "Android TV", desc: "No touch assumptions.", icon: <Smartphone /> }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={pressureVariants}
                    className="w-full h-full"
                  >
                    <SpotlightCard className="h-full w-full p-6 flex items-center justify-between bg-white text-slate-900 border-none shadow-sm hover:shadow-lg transition-shadow" spotlightColor="rgba(244, 63, 94, 0.05)">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-rose-50 text-rose-600 rounded-xl">{item.icon}</div>
                        <div>
                          <h3 className="font-bold text-xl">{item.title}</h3>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-rose-200">
                        <ArrowUpRight size={32} />
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* CHAPTER 4: CONTROL */}
          {/* CHAPTER 4: CONTROL */}
          <Section id="control" className="bg-[#EEF2FF] text-slate-900">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              className="w-full h-full flex flex-col pt-12"
            >
              <div className="text-center px-12">
                <motion.h2 variants={controlVariants} className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85] uppercase">
                  Architecture
                </motion.h2>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-full">
                {[
                  { label: "Clean Arch", icon: <Shield className="mb-4 text-blue-500" />, desc: "Separation of concerns." },
                  { label: "MVVM", icon: <Layers className="mb-4 text-indigo-500" />, desc: "Reactive state management." },
                  { label: "Typesafe", icon: <Box className="mb-4 text-cyan-500" />, desc: "Compile-time safety." },
                  { label: "Modular", icon: <Zap className="mb-4 text-violet-500" />, desc: "Scalable codebase." }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={controlVariants}
                    className={cn(
                      "h-full flex flex-col items-center justify-center p-8 border-t border-r border-indigo-200/50 hover:bg-white/50 transition-colors",
                      i === 3 && "border-r-0"
                    )}
                  >
                    {feature.icon}
                    <h3 className="font-bold text-xl mb-2">{feature.label}</h3>
                    <p className="text-slate-500 text-sm text-center">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* CHAPTER 5: SYSTEMS IN MOTION */}
          <Section id="systems" className="bg-[#F3E8FF] text-slate-900">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              className="w-full h-full grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-center h-full border-r border-purple-200">
                <motion.h2 variants={systemsVariants} className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 mb-6 leading-tight uppercase">
                  <DecryptedText text="EVOLUTION" className="block" speed={40} />
                  <DecryptedText text="IN REAL TIME" className="block text-purple-700" speed={40} delay={0.5} />
                </motion.h2>
                <motion.p variants={systemsVariants} className="text-slate-600 text-sm mb-6 max-w-sm">
                  These systems don’t pause for refactors. They evolve while staying online.
                </motion.p>
                <motion.button variants={systemsVariants} className="w-fit group flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-none text-xs font-bold uppercase tracking-widest hover:bg-purple-600 transition-colors">
                  View Evolution <Zap size={16} className="group-hover:animate-pulse" />
                </motion.button>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 h-full">
                {[
                  { title: "Merchant SolusiNegeri", desc: "Real transactions. NFC & EDC integrated.", type: "Fintech" },
                  { title: "Launcher SolusiNegeri", desc: "Kiosk control. Device management.", type: "Kiosk" },
                  { title: "Member Ecosystem", desc: "Payments, wallets, billing.", type: "Platform" },
                  { title: "KKP Attendance", desc: "Offline-first sync logic.", type: "Gov" }
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={systemsVariants}
                    className="border-b border-black/5 md:border-b-0 md:odd:border-r md:border-b md:last:border-b-0 md:[&:nth-last-child(2)]:border-b-0 border-purple-200/50"
                  // Simple grid border logic, might need refinement for perfect borders
                  >
                    <SpotlightCard className="w-full h-full p-8 flex flex-col justify-between bg-white/50 hover:bg-white transition-colors border-none rounded-none shadow-none" spotlightColor="rgba(147, 51, 234, 0.1)">
                      <div>
                        <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-2 py-1 mb-4 inline-block">{item.type}</span>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-700 leading-relaxed text-sm">{item.desc}</p>
                      </div>
                      <Zap className="w-6 h-6 text-purple-300" />
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* CHAPTER 6: SCALE */}
          <Section id="scale" className="bg-[#ECFDF5] text-slate-900">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full w-full"
            >
              <motion.div
                variants={scaleVariants}
                className="bg-emerald-950 text-white p-12 md:p-24 flex flex-col justify-center h-full"
              >
                <div className="text-[15vw] md:text-[8vw] font-black leading-none tracking-tighter mb-4 text-emerald-500">
                  <CountUp to={15} suffix="+" duration={3} />
                </div>
                <div className="text-xl uppercase tracking-[0.3em] font-mono text-emerald-400">Production Deployments</div>
              </motion.div>
              <motion.div
                variants={scaleVariants}
                className="p-12 md:p-24 flex flex-col justify-center h-full bg-transparent"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85]">
                  <TextReveal text="BUILT FOR THE" className="block" />
                  <TextReveal text="CHOKE POINTS." className="block text-emerald-600" delay={0.3} />
                </h2>
                <p className="text-lg text-slate-700 mb-8 leading-relaxed max-w-md italic">&quot;At scale, small decisions accumulate. The work becomes quieter—but more critical.&quot;</p>

                <ul className="grid grid-cols-1 gap-4 font-bold text-slate-950/80 text-sm">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Backward compatibility.</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Zero-downtime security.</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Optimized pipelines.</li>
                </ul>
              </motion.div>
            </motion.div>
          </Section>

          {/* CHAPTER 7: TOOLS */}
          <Section id="tools" className="bg-[#FAFAFA] text-slate-900">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              className="relative w-full h-full"
            >
              <div className="flex flex-col justify-center items-center text-center p-8 md:p-16 h-full pb-64">
                <TrueFocus
                  items={[
                    { label: "Kotlin" },
                    { label: "Compose" },
                    { label: "React" },
                    { label: "Native" }
                  ]}
                  className="mb-8 max-w-5xl"
                />
              </div>

              <motion.div
                variants={toolsVariants}
                className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-8 md:p-12 pb-24 md:pb-32 flex flex-col md:flex-row justify-between items-center gap-8 z-20"
              >
                <p className="text-2xl font-serif text-slate-800 italic leading-snug max-w-2xl">
                  &quot;What remains constant is the responsibility to choose tools that serve the system—not personal preference.&quot;
                </p>
                <div className="flex-shrink-0 px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold uppercase text-[10px] tracking-[0.3em]">
                  Maintainability & Reliability
                </div>
              </motion.div>
            </motion.div>
          </Section>

          {/* CHAPTER 8: NOW */}
          <Section id="now" className="bg-[#FFFFFF] text-slate-900">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              className="grid grid-rows-[1fr_auto] h-full w-full"
            >
              <div className="flex flex-col justify-center items-center text-center relative p-8">
                <div className="space-y-6 relative z-10 w-full max-w-5xl">
                  <motion.p variants={nowVariants} className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Right now, I build and maintain mobile systems for fintech and government environments.
                  </motion.p>
                  <motion.div variants={nowVariants}>
                    <h2 className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] text-slate-900 flex items-center justify-center gap-4 flex-wrap">
                      <ShinyText text="SYSTEM ONLINE" speed={4} className="text-slate-900" />
                      <span className="text-green-500 bg-green-500/10 rounded-full w-[0.5em] h-[0.5em] animate-pulse relative top-4"></span>
                    </h2>
                  </motion.div>

                  <div className="pt-12">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={nowVariants}
                      href="mailto:arik@example.com"
                      className="inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-green-600 transition-all shadow-xl"
                    >
                      Initiate Connection <ArrowUpRight className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>

              <motion.div
                variants={nowVariants}
                className="border-t border-slate-100 p-8 md:p-12 flex flex-col md:flex-row justify-between text-xs font-mono text-slate-400 uppercase tracking-wider gap-4"
              >
                <span>&copy; 2025 Arik Riko Prasetya.</span>
                <div className="flex gap-8">
                  <span>Stability over spectacle</span>
                  <span>Longevity over novelty</span>
                </div>
              </motion.div>
            </motion.div>
          </Section>

        </HorizontalScroll>
      </motion.div>
    </main>
  );
}
