"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Globe, Zap, Cpu, Layers, Box, Wrench, Sparkles, Loader2, Shield, Smartphone } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Calculate sun position based on current time (0-100%)
// 6:00 = sunrise (0%), 12:00 = noon (50%), 18:00 = sunset (100%)
function getSunPosition(): { position: number; phase: 'night' | 'sunrise' | 'day' | 'sunset' } {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Night: 20:00 - 5:00
    // Sunrise: 5:00 - 7:00
    // Day: 7:00 - 17:00
    // Sunset: 17:00 - 20:00

    if (totalMinutes >= 1200 || totalMinutes < 300) {
        // Night (20:00 - 5:00)
        return { position: 0, phase: 'night' };
    } else if (totalMinutes >= 300 && totalMinutes < 420) {
        // Sunrise (5:00 - 7:00)
        const progress = (totalMinutes - 300) / 120; // 0 to 1
        return { position: progress * 40, phase: 'sunrise' };
    } else if (totalMinutes >= 420 && totalMinutes < 1020) {
        // Day (7:00 - 17:00)
        const progress = (totalMinutes - 420) / 600; // 0 to 1
        return { position: 40 + progress * 20, phase: 'day' }; // 40% to 60%
    } else {
        // Sunset (17:00 - 20:00)
        const progress = (totalMinutes - 1020) / 180; // 0 to 1
        return { position: 60 + progress * 40, phase: 'sunset' };
    }
}

// Get gradient colors based on time of day
function getGradientColors(phase: 'night' | 'sunrise' | 'day' | 'sunset') {
    switch (phase) {
        case 'night':
            return {
                sky: ['#0a0a1a', '#1a1a2e'],
                sun: ['#c0c0c0', '#808080'],
                foreground: '#1a1a2e'
            };
        case 'sunrise':
            return {
                sky: ['#ff9a56', '#ffcd67', '#87ceeb'],
                sun: ['#ff6b35', '#ffa500', '#ffcc00'],
                foreground: '#2D4263'
            };
        case 'day':
            return {
                sky: ['#87ceeb', '#e0f6ff'],
                sun: ['#ffcc00', '#fff176'],
                foreground: '#2D4263'
            };
        case 'sunset':
            return {
                sky: ['#1a1a2e', '#c84b31', '#ff9a56'],
                sun: ['#ff4500', '#ff6347', '#ffa07a'],
                foreground: '#191919'
            };
    }
}

export default function Loader({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const { theme } = useTheme();

    const sunData = getSunPosition();
    const colors = getGradientColors(sunData.phase);

    // Calculate sun's vertical position (lower = higher in sky)
    // During loading, sun rises from 70% (below horizon) to final position
    const finalSunTop = sunData.phase === 'night' ? 80 :
        sunData.phase === 'sunrise' ? 35 + (1 - sunData.position / 40) * 25 :
            sunData.phase === 'day' ? 30 :
                35 + (sunData.position - 60) / 40 * 35;

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setComplete(true);
                        if (onLoadingComplete) onLoadingComplete();
                    }, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    // Interpolate sun position based on loading progress
    const currentSunTop = 70 - ((70 - finalSunTop) * (progress / 100));

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
                    style={{ backgroundColor: theme.bgPrimary }}
                    exit={{ opacity: 0, transition: { duration: 1, delay: 0.5 } }}
                >
                    {/* LAYER 1: Sky Background */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        style={{
                            background: `linear-gradient(to top, ${colors.sky.join(', ')})`
                        }}
                    />

                    {/* THE SUN: Position based on real time + loading progress */}
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 rounded-full z-10"
                        style={{
                            width: 'min(40vw, 200px)',
                            height: 'min(40vw, 200px)',
                            background: `radial-gradient(circle, ${colors.sun[0]} 0%, ${colors.sun[1] || colors.sun[0]} 50%, ${colors.sun[2] || colors.sun[1] || colors.sun[0]} 100%)`,
                            boxShadow: `0 0 60px ${colors.sun[0]}80, 0 0 120px ${colors.sun[0]}40`,
                            top: `${currentSunTop}%`,
                        }}
                        initial={{ top: "70%" }}
                        animate={{ top: `${currentSunTop}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />

                    {/* LAYER 2: Foreground (Bottom 50%) */}
                    <div
                        className="absolute bottom-0 w-full h-[50%] z-20 flex flex-col items-center justify-start pt-12 md:pt-16 overflow-hidden"
                        style={{ backgroundColor: colors.foreground }}
                    >
                        {/* Horizon line */}
                        <div
                            className="absolute top-0 w-full h-[2px]"
                            style={{
                                background: `linear-gradient(to right, transparent, ${theme.accent}50, transparent)`
                            }}
                        />

                        {/* Loading Content */}
                        <div className="flex flex-col items-center gap-4 z-30">
                            {/* Chapter indicator */}
                            <div
                                className="flex items-center gap-3 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-center font-sans"
                                style={{ color: theme.textSecondary }}
                            >
                                {(() => {
                                    const chapters = ["FOUNDATION", "STRUCTURE", "STATE", "OFFLINE", "HARDWARE", "SCALE", "SECURITY", "X-PLATFORM", "PRODUCTION", "REFINEMENT"];
                                    const icons = [Terminal, Layers, Zap, Globe, Cpu, Box, Shield, Smartphone, Wrench, Sparkles];
                                    const index = Math.min(Math.floor((progress / 100) * 10), 9);
                                    const CurrentIcon = icons[index];

                                    return (
                                        <>
                                            <CurrentIcon className="w-4 h-4" style={{ color: theme.accent }} />
                                            <span style={{ color: theme.textPrimary }}>{chapters[index]}</span>
                                        </>
                                    );
                                })()}
                                <span style={{ color: theme.textSecondary }}>INITIALIZED</span>
                            </div>

                            {/* Progress percentage */}
                            <div
                                className="flex items-center gap-2 text-3xl md:text-4xl font-light tracking-tight font-sans"
                                style={{ color: theme.textPrimary }}
                            >
                                <Loader2
                                    className="w-6 h-6 animate-spin"
                                    style={{ color: theme.accent }}
                                />
                                {progress}%
                            </div>

                            {/* Loading bar */}
                            <div
                                className="w-32 md:w-40 h-[2px] rounded-full overflow-hidden"
                                style={{ backgroundColor: theme.border }}
                            >
                                <motion.div
                                    className="h-full"
                                    style={{ backgroundColor: theme.accent }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.1 }}
                                />
                            </div>

                            {/* Time indicator */}
                            <div
                                className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest mt-4"
                                style={{ color: theme.textSecondary }}
                            >
                                {sunData.phase === 'night' ? '🌙 Night Mode' :
                                    sunData.phase === 'sunrise' ? '🌅 Good Morning' :
                                        sunData.phase === 'day' ? '☀️ Good Day' :
                                            '🌇 Good Evening'}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
