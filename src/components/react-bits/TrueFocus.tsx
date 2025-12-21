"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
    items: { label: string; onClick?: () => void }[];
    className?: string;
}

export default function TrueFocus({ items, className = "" }: TrueFocusProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className={`flex flex-wrap gap-8 justify-center ${className}`}>
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                        filter: hoveredIndex !== null && hoveredIndex !== index ? "blur(4px)" : "blur(0px)",
                        scale: hoveredIndex === index ? 1.1 : 1,
                        opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={item.onClick}
                >
                    <span className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 uppercase tracking-tighter">
                        {item.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
