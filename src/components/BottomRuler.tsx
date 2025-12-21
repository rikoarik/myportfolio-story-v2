"use client";

import { motion } from "framer-motion";
import { useHorizontalScroll } from "./HorizontalScroll";

const milestones = [
    { label: "Void", id: 0 },
    { label: "Origin", id: 1 },
    { label: "Pressure", id: 2 },
    { label: "Control", id: 3 },
    { label: "Systems", id: 4 },
    { label: "Scale", id: 5 },
    { label: "Tools", id: 6 },
    { label: "Now", id: 7 },
];

export default function BottomRuler() {
    const { progress } = useHorizontalScroll();

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none pb-8 pt-4 hidden lg:block">
            {/* Container */}
            <div className="w-full max-w-[95%] mx-auto relative h-16 pointer-events-auto">

                {/* Ruler Track */}
                <div className="absolute top-0 left-0 w-full h-px bg-slate-900/10" />

                {/* Ticks & Labels */}
                <div className="relative w-full h-full flex justify-between items-start">
                    {/* Render many small ticks for ruler effect */}
                    <div className="absolute inset-0 flex justify-between w-full overflow-hidden px-4" aria-hidden="true">
                        {Array.from({ length: 160 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-px flex-shrink-0 ${i % 20 === 0 ? "h-3 bg-slate-900/20" : i % 5 === 0 ? "h-2 bg-slate-900/10" : "h-1 bg-slate-900/5"}`}
                            />
                        ))}
                    </div>

                    {milestones.map((ms) => (
                        <div key={ms.id} className="relative flex flex-col items-center justify-start pt-4" style={{ flex: 1 }}>
                            <span className="text-[10px] uppercase tracking-widest text-[#a8a29e] font-medium font-sans">
                                {ms.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <motion.div
                        className="absolute top-0 -ml-12 h-1 bg-[#854d0e] rounded-full shadow-sm"
                        style={{
                            left: `${progress * 100}%`,
                            width: "96px"
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
