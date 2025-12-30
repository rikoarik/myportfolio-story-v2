"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimatedCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
    style?: React.CSSProperties;
}

export default function ScrollAnimatedCard({ children, className = "", delay = 0, direction = "up", style }: ScrollAnimatedCardProps) {
    // Define initial positions based on direction
    const initialMap = {
        up: { y: 100, x: 0, rotateX: 20 },
        left: { x: -100, y: 0, rotateY: -20 },
        right: { x: 100, y: 0, rotateY: 20 }
    };

    const initial = {
        opacity: 0,
        scale: 0.8,
        ...initialMap[direction]
    };

    return (
        <motion.div
            initial={initial}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0
            }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
            transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                mass: 1.2,
                delay: delay
            }}
            whileHover={{
                scale: 1.05,
                y: -10,
                rotateX: 5,
                boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.15)",
                transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
