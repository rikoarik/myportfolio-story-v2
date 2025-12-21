"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollDivider() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 pointer-events-none z-50 flex flex-col justify-end">
            {/* Text indicator floating above */}
            {/* <div className="w-full flex justify-between px-8 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <span>Start</span>
                <span>End</span>
             </div> */}

            {/* The Divider Line */}
            <div className="w-full h-[2px] bg-slate-900/10">
                <motion.div
                    style={{ scaleX, transformOrigin: "0%" }}
                    className="h-full bg-slate-900 w-full"
                />
            </div>
        </div>
    );
}
