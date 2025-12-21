"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfiniteMarqueeProps {
    items: ReactNode[];
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

export default function InfiniteMarquee({ items, direction = "left", speed = 20, className = "" }: InfiniteMarqueeProps) {
    return (
        <div className={`overflow-hidden flex select-none mask-linear-fade ${className}`}>
            <motion.div
                className="flex shrink-0 gap-8 py-4 pr-8"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {items.map((item, i) => (
                    <div key={`i-${i}`} className="flex items-center justify-center shrink-0">
                        {item}
                    </div>
                ))}
                {/* Duplicate items for seamless loop */}
                {items.map((item, i) => (
                    <div key={`d-${i}`} className="flex items-center justify-center shrink-0">
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
