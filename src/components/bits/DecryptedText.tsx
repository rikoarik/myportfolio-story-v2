"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    sequential?: boolean;
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    animateOn?: "view" | "hover";
    delay?: number;
}

export default function DecryptedText({
    text,
    speed = 50,
    sequential = false,
    useOriginalCharsOnly = false,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
    className = "",
    parentClassName = "",
    animateOn = "view",
    delay = 0,
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10px" });

    const revealText = () => {
        setIsScrambling(true);
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText(() => {
                return text
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iteration) {
                            return text[index];
                        }
                        if (useOriginalCharsOnly) {
                            const originalChars = text.split("");
                            return originalChars[Math.floor(Math.random() * originalChars.length)];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("");
            });
            if (sequential) {
                iteration += 1 / 3; 
            } else {
                iteration += 1;
            }
            if (iteration >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
                setDisplayText(text);
            }
        }, speed);
        return () => clearInterval(interval);
    };

    useEffect(() => {
        if (animateOn === "view" && isInView && !isScrambling) {
             const timeout = setTimeout(() => {
                 revealText();
             }, delay * 1000);
             return () => clearTimeout(timeout);
        }
    }, [isInView, animateOn, delay]);

    const handleMouseEnter = () => {
        if (animateOn === "hover") revealText();
    };

    return (
        <motion.span
            ref={containerRef}
            className={cn("inline-block whitespace-pre-wrap", parentClassName)}
            onMouseEnter={handleMouseEnter}
        >
            <span className={cn("inline-block", className)}>{displayText}</span>
        </motion.span>
    );
}
