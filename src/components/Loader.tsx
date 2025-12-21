"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Globe, Zap, Cpu, Layers, Box, Wrench, Sparkles, Loader2 } from "lucide-react";

export default function Loader({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
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
        }, 30); // ~3s total for a slightly longer sunrise effect

        return () => clearInterval(interval);
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white overflow-hidden"
                    exit={{ opacity: 0, transition: { duration: 1, delay: 0.5 } }}
                >
                    {/* LAYER 1: Background Sky (Top Half + Behind Sun) */}
                    <motion.div
                        className="absolute inset-0 z-0 bg-sky-100"
                    >
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, background: "linear-gradient(to top, #ffecd2 0%, #fcb69f 100%)" }} // Pastel Peach to Pink
                            transition={{ duration: 3 }}
                        />
                    </motion.div>

                    {/* THE SUN: Rises between layers - Softer Pastel Sun */}
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] md:w-[25vh] md:h-[25vh] bg-gradient-to-t from-orange-300 via-orange-200 to-yellow-100 rounded-full shadow-[0_0_100px_rgba(253,186,116,0.6)] z-10"
                        initial={{ top: "60%" }} // Starts hidden behind the 50% foreground
                        animate={{ top: "35%" }} // Rises above the horizon
                        transition={{ duration: 3.5, ease: "easeInOut" }}
                    />

                    {/* LAYER 2: Foreground (Bottom 50%) - Pastel Contrast */}
                    <div className="absolute bottom-0 w-full h-[50%] z-20 bg-slate-200 flex flex-col items-center justify-start pt-12 md:pt-16 overflow-hidden">
                        {/* Horizon line - slightly darker than foreground for definition */}
                        <div className="absolute top-0 w-full h-[1px] bg-slate-300" />

                        <div className="flex flex-col items-center gap-4 text-slate-600 z-30">
                            <div className="flex items-center gap-3 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-center text-slate-500 font-sans">
                                {(() => {
                                    const chapters = ["VOID", "ORIGIN", "PRESSURE", "CONTROL", "SYSTEMS", "SCALE", "TOOLS", "NOW"];
                                    const icons = [Terminal, Globe, Zap, Cpu, Layers, Box, Wrench, Sparkles]; // Map icons to chapters
                                    const index = Math.min(Math.floor((progress / 100) * 8), 7);
                                    const CurrentIcon = icons[index];

                                    return (
                                        <>
                                            <CurrentIcon className="w-4 h-4 text-slate-400" />
                                            <span>{chapters[index]}</span>
                                        </>
                                    );
                                })()}
                                <span className="text-slate-400">INITIALIZED</span>
                            </div>

                            <div className="flex items-center gap-2 text-3xl md:text-4xl font-light tracking-tight font-sans text-slate-700">
                                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                                {progress}%
                            </div>

                            {/* Loading Bar - Darker for visibility */}
                            <div className="w-32 md:w-32 h-[2px] bg-slate-300 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-slate-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.1 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
