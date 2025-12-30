"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
    style?: React.CSSProperties;
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
    style,
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10px" });

    const revealText = useCallback(() => {
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
    }, [text, speed, sequential, useOriginalCharsOnly, characters]);

    useEffect(() => {
        if (animateOn === "view" && isInView && !isScrambling && !hasAnimated) {
            const timeout = setTimeout(() => {
                setHasAnimated(true);
                revealText();
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, animateOn, delay, isScrambling, revealText, hasAnimated]);

    const handleMouseEnter = () => {
        if (animateOn === "hover") revealText();
    };

    return (
        <motion.span
            ref={containerRef}
            className={cn("inline-block whitespace-pre-wrap", parentClassName)}
            onMouseEnter={handleMouseEnter}
            style={style}
        >
            <span className={cn("inline-block", className)}>{displayText}</span>
        </motion.span>
    );
}
