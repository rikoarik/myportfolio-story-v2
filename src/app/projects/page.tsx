"use client";

import CursorTracker from "@/components/CursorTracker";
import { ArrowUpRight, Github, ChevronLeft, MapPin, CreditCard, LayoutTemplate, ShieldCheck, Terminal, Smartphone, Store, Tv, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const projects = [
    {
        title: "Member Ecosystem",
        subtitle: "Sangu Lirboyo & MyBrawijaya",
        tags: ["React Native", "Super App", "Play Store"],
        problem: "University and Islamic Boarding School (Pesantren) environments needed a unified digital system for payments, ID cards, and academic access. Separate apps for every function were confusing.",
        solution: "Built a 'Super App' ecosystem using React Native. Includes modules for QRIS payments, E-Wallet, PPOB, and Digital ID. Supports multi-tenant configuration allows the same codebase to power 'Sangu Lirboyo' and 'MyBrawijaya'.",
        result: "10,000+ active users. Processed millions in monthly transactions. 4.9 Star rating on Play Store.",
        link: "https://play.google.com/store/apps/details?id=com.solusinegeri.app.partner.p2l&hl=id",
        type: "playstore",
        icon: Smartphone
    },
    {
        title: "Launcher SolusiNegeri",
        subtitle: "Android Kiosk & Device Management",
        tags: ["Jetpack Compose", "System Services", "Kiosk Mode"],
        problem: "Deployed EDC devices were being misused for games and social media by merchants. Standard Android limitations were insufficient to lock down the devices completely.",
        solution: "Developed a custom Android Launcher acting as the OS shell. Implemented strict AppLock, whitelisting, and auto-start services. Integrated remote device health monitoring.",
        result: "Deployed on thousands of EDC devices. Reduced non-business data usage by 90% and support tickets by 80%.",
        link: "https://play.google.com/store/apps/details?id=com.solusinegeri.launcher&hl=id",
        type: "playstore",
        icon: Terminal
    },
    {
        title: "DIGILUH",
        subtitle: "Government Attendance & Offline Sync",
        tags: ["Flutter", "BLoC", "Hive", "Offline-First"],
        problem: "The Ministry of Marine and Fisheries (KKP) needed to track attendance in remote coastal areas with unreliable internet. Real-time sync was impossible.",
        solution: "Engineered a Flutter-based Offline-First app. Uses Hive for a local 'Source of Truth' database. Data is queued and auto-synced via background workers when connectivity is restored.",
        result: "Zero data loss records. Actively used by government employees across Indonesia for verified attendance.",
        link: "https://play.google.com/store/apps/details?id=id.go.kkp.digiluh&hl=id",
        type: "playstore",
        icon: MapPin
    },
    {
        title: "Android TV Access Control",
        subtitle: "Large Screen Attendance Board",
        tags: ["Android TV", "Kotlin", "Business Logic Managers"],
        problem: "Offices needed a highly visible, communal way for employees to check in/out without queuing at a small fingerprint machine.",
        solution: "Built a dedicated Android TV / STB application. Optimized UI/UX for remote control navigation. Synchronizes with the central attendance server in real-time.",
        result: "Streamlined entry flow. Acts as a digital signage board when not in use, displaying company announcements.",
        link: "#", // Private Enterprise App
        type: "casestudy",
        icon: Tv
    },
    {
        title: "Merchant SolusiNegeri",
        subtitle: "Secure Financial Transaction App",
        tags: ["Kotlin", "Clean Arch", "Security", "EDC"],
        problem: "Financial apps on open Android devices are vulnerable to root attacks, hooking, and GPS spoofing.",
        solution: "Native Android app with 'Paranoid Security' levels. Detects Magisk, Frida, and mock locations. Direct integration with thermal printers and NFC readers for payments.",
        result: "Secure, high-trust application handling sensitive financial data daily.",
        link: "https://play.google.com/store/apps/details?id=com.solusinegeri.merchant3&hl=id", // Linking to core as proxy
        type: "playstore",
        icon: ShieldCheck
    },
    {
        title: "ClosePay Core",
        subtitle: "Multi-Module Architecture",
        tags: ["Architecture", "Kotlin", "Modularization"],
        problem: "Maintaining business logic across 15+ different apps led to inconsistencies and bugs.",
        solution: "Extracted all domain logic into a shared `Core` module. All apps (Merchant, Member, Agent) consume this single source of truth.",
        result: "Development speed doubled. Fix a bug once, update everywhere.",
        link: "https://github.com/rikoarik/merchant-closepay-core",
        type: "github",
        icon: Layers
    },
    {
        title: "StoryApp",
        subtitle: "Modern Android Paging",
        tags: ["Kotlin", "Paging 3", "CameraX", "Google Maps"],
        problem: "Loading large lists of image-heavy stories causes memory leaks and stuttering scrolling.",
        solution: "Implemented Paging 3 with RemoteMediator for seamless infinite scroll. Uses CameraX for story content creation.",
        result: "Butter-smooth 60fps scrolling even with thousands of items.",
        link: "https://github.com/rikoarik/StoryApp",
        type: "github",
        icon: ArrowUpRight
    },
    {
        title: "Explore Bojonegoro",
        subtitle: "GIS & Tourism Maps",
        tags: ["GeoJSON", "Google Maps API", "Tourism"],
        problem: "Tourists lack accessible digital information for local hidden gems.",
        solution: "GIS application overlaying custom routes and points of interest on Google Maps.",
        result: "Promotes local tourism with digital accessibility.",
        link: "https://github.com/rikoarik/ExploreBojonegoro",
        type: "github",
        icon: MapPin
    }
];

export default function Projects() {
    const { theme } = useTheme();
    
    return (
        <main 
            className="cursor-none min-h-screen font-sans" 
            style={{ 
                backgroundColor: theme.bgPrimary, 
                color: theme.textPrimary,
                transition: 'background-color 1s ease, color 1s ease'
            }}
        >
            <CursorTracker />

            {/* Navigation */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center backdrop-blur-sm border-b" style={{ backgroundColor: theme.bgPrimary + 'E6', borderColor: theme.border }}>
                <Link href="/" className="flex items-center gap-2 transition-colors uppercase font-mono text-xs tracking-widest font-bold" style={{ color: theme.textSecondary }} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textSecondary}>
                    <ChevronLeft size={16} />
                    Back to Portfolio
                </Link>
                <div className="font-mono text-xs" style={{ color: theme.textSecondary }}>PHYSICAL PROOF</div>
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
                {/* Header */}
                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono uppercase tracking-widest block mb-4"
                        style={{ color: theme.accent }}
                    >
                        Selected Works
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
                        style={{ color: theme.textPrimary }}
                    >
                        EXTENSIVE <span style={{ color: theme.accent }}>WORK.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl max-w-2xl leading-relaxed"
                        style={{ color: theme.textSecondary }}
                    >
                        A mix of Enterprise Production Apps handling real revenue and Open Source explorations pushing technical boundaries.
                    </motion.p>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full h-64 md:h-96 rounded-3xl mb-24 overflow-hidden relative group"
                    style={{ backgroundColor: theme.bgSecondary, borderColor: theme.border, borderWidth: '1px', borderStyle: 'solid' }}
                >
                    <Image
                        src="/assets/mobile_ui_mockup.png"
                        alt="Mobile App UI"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent flex items-end p-8">
                        <p className="text-white font-mono text-sm">FIG 1.0 — PRODUCTION STANDARD UI</p>
                    </div>
                </motion.div>

                {/* Projects List */}
                <div className="space-y-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6 }}
                            className="group"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 border-b pb-8" style={{ borderColor: theme.border }}>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl mt-1" style={{ backgroundColor: theme.bgSecondary, color: theme.textSecondary }}>
                                        <project.icon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: theme.textPrimary }}>{project.title}</h2>
                                            {project.type === "playstore" && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border" style={{ backgroundColor: theme.accent + '20', color: theme.accent, borderColor: theme.accent + '40' }}>Live</span>
                                            )}
                                        </div>
                                        <p className="font-mono text-sm" style={{ color: theme.textSecondary }}>{project.subtitle}</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex gap-2 flex-wrap justify-end max-w-md">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold border" style={{ backgroundColor: theme.bgSecondary, color: theme.textSecondary, borderColor: theme.border }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.textSecondary }}>The Problem</p>
                                    <p className="leading-relaxed text-sm" style={{ color: theme.textPrimary }}>
                                        {project.problem}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.textSecondary }}>Technical Solution</p>
                                    <p className="leading-relaxed text-sm" style={{ color: theme.textPrimary }}>
                                        {project.solution}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.textSecondary }}>The Result</p>
                                    <p className="font-medium leading-relaxed text-sm mb-4" style={{ color: theme.textPrimary }}>
                                        {project.result}
                                    </p>
                                    {project.link !== "#" && (
                                        <Link href={project.link} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold transition-colors uppercase tracking-wider" style={{ color: theme.textPrimary }} onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = theme.textPrimary}>
                                            {project.type === "playstore" ? "View on Play Store" : "View Code"} <ArrowUpRight size={16} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Call to Action */}
                <div className="mt-32 pt-16 border-t text-center" style={{ borderColor: theme.border }}>
                    <p className="mb-4" style={{ color: theme.textSecondary }}>Explore 30+ other repositories</p>
                    <a href="https://github.com/rikoarik" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors" style={{ backgroundColor: theme.bgSecondary, color: theme.textPrimary }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.accent} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.bgSecondary}>
                        <Github size={20} />
                        Visit GitHub Profile
                    </a>
                </div>
            </div>
        </main>
    );
}
