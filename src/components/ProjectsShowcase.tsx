"use client";

import { Smartphone, Terminal, MapPin, Tv, ShieldCheck, Layers } from "lucide-react";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import CardSwap, { Card } from "./bits/CardSwap";

const projects = [
    {
        title: "Member Ecosystem",
        subtitle: "Sangu Lirboyo",
        tags: ["React Native", "Super App"],
        desc: "Built a 'Super App' ecosystem for University and Islamic Boarding School. 10,000+ active users, 4.9★ on Play Store.",
        link: "https://play.google.com/store/apps/details?id=com.solusinegeri.app.partner.p2l&hl=id",
        icon: Smartphone,
        image: "/assets/member_ecosystem.png"
    },
    {
        title: "Launcher SolusiNegeri",
        subtitle: "Android Kiosk & Device Management",
        tags: ["Jetpack Compose", "Kiosk Mode"],
        desc: "Custom Android Launcher for EDC devices. Deployed on thousands of devices, reduced non-business data usage by 90%.",
        link: "https://play.google.com/store/apps/details?id=com.solusinegeri.launcher&hl=id",
        icon: Terminal,
        image: "/assets/launcher_solusinegeri.png"
    },
    {
        title: "DIGILUH",
        subtitle: "Government Attendance & Offline Sync",
        tags: ["Flutter", "Offline-First"],
        desc: "Ministry of Marine and Fisheries attendance app for remote coastal areas. Zero data loss with offline-first architecture.",
        link: "https://play.google.com/store/apps/details?id=id.go.kkp.digiluh&hl=id",
        icon: MapPin,
        image: "/assets/digiluh.png"
    },
    {
        title: "Android TV Access Control",
        subtitle: "Large Screen Attendance Board",
        tags: ["Android TV", "Kotlin"],
        desc: "Dedicated Android TV application for employee check-in/out. Optimized for remote control navigation.",
        link: "#",
        icon: Tv,
        image: "/assets/android_tv_access.png"
    },
    {
        title: "Merchant SolusiNegeri",
        subtitle: "Secure Financial Transaction App",
        tags: ["Kotlin", "Security"],
        desc: "Financial app with paranoid security. Detects root, Frida, and mock locations. Handles sensitive data daily.",
        link: "https://play.google.com/store/apps/details?id=com.solusinegeri.merchant3&hl=id",
        icon: ShieldCheck,
        image: "/assets/merchant_solusinegeri.png"
    },
    {
        title: "ClosePay Core",
        subtitle: "Multi-Module Architecture",
        tags: ["Architecture", "Modularization"],
        desc: "Shared domain logic module across 15+ apps. Development speed doubled with single source of truth.",
        link: "https://github.com/rikoarik/merchant-closepay-core",
        icon: Layers,
        image: "/assets/closepay_core.png"
    },
];

export default function ProjectsShowcase() {
    const theme = useSectionTheme('production');

    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-20 gap-12">
            {/* Left Column: Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <span className="text-sm font-mono uppercase tracking-widest block mb-6" style={{ color: theme.textAccent }}>
                    Selected Works
                </span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8" style={{ color: theme.textPrimary }}>
                    PRODUCTION<br />
                    <span style={{ color: theme.textAccent }}>PROJECTS.</span>
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed max-w-xl" style={{ color: theme.textSecondary }}>
                    Real-world applications handling millions in transactions and thousands of users.
                </p>

                <div className="mt-12 flex items-center gap-4 text-sm font-bold opacity-60" style={{ color: theme.textSecondary }}>
                    <span>Scroll or Click Cards</span>
                    <div className="h-px flex-1 bg-current opacity-20" />
                </div>
            </div>

            {/* Right Column: Card Swap */}
            <div className="w-full md:w-1/2 flex h-[500px]">
                <CardSwap
                    cardDistance={60}
                    verticalDistance={70}
                    delay={2000}
                    pauseOnHover={true}
                    easing="elastic"
                >
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        return (
                            <Card
                                key={index}
                                customClass="p-6 md:p-8 flex flex-col justify-between border"
                                style={{
                                    backgroundColor: theme.bgSecondary,
                                    borderColor: theme.border,
                                    width: '500px',
                                    height: '500px'
                                }}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{ backgroundColor: theme.accent + '50', color: theme.accent }}
                                        >
                                            <Icon size={24} />
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold uppercase tracking-wider transition-colors hover:underline"
                                            style={{ color: theme.textSecondary }}
                                        >
                                            View Project
                                        </a>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>{project.title}</h3>
                                    <p className="text-sm font-mono mb-4" style={{ color: theme.textSecondary }}>{project.subtitle}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 rounded-md text-xs font-medium"
                                                style={{ backgroundColor: theme.bgPrimary, color: theme.textSecondary }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm leading-relaxed mb-auto" style={{ color: theme.textSecondary }}>
                                        {project.desc}
                                    </p>

                                    <div className="mt-6 w-full h-40 overflow-hidden rounded-lg relative group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </CardSwap>
            </div>
        </div>
    );
}
