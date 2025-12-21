"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean; // Now defaults to false for enter/exit animations
    mode?: "simple" | "typewriter";
}

export default function TextReveal({ text, className, delay = 0, once = false, mode = "simple" }: TextRevealProps) {
    const characters = text.split("");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: (_: number = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: mode === "typewriter" ? 0.1 : 0.03,
                delayChildren: delay
            },
        }),
    };

    const simpleVariants: Variants = {
        hidden: {
            opacity: 0,
            y: "110%", // Start slightly below line height
            rotateX: -20, // Subtle rotation
            skewY: 10,  // Dynamic skew
            filter: "blur(5px)", // Smooth blur out
            transition: {
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1] // Ease In Out Cubic
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            skewY: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
            },
        },
    };

    const typewriterVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0 }
        }
    };

    const selectedVariants = mode === "typewriter" ? typewriterVariants : simpleVariants;

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            // We use a margin so it triggers slightly before/after full view
            viewport={{ once, margin: "-10% 0px -10% 0px" }}
            className={cn("inline-flex flex-wrap overflow-hidden py-2 leading-tight", className)}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={selectedVariants}
                    className="inline-block origin-bottom-left"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
