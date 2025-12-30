"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    prefix?: string;
    suffix?: string;
    style?: React.CSSProperties;
}

export default function CountUp({
    to,
    from = 0,
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = "",
    prefix = "",
    suffix = "",
    style,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(from);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
        duration: duration * 1000,
    });
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const [displayValue, setDisplayValue] = useState(from);

    useEffect(() => {
        if (isInView && startWhen) {
            setTimeout(() => {
                motionValue.set(to);
            }, delay * 1000);
        }
    }, [isInView, startWhen, delay, motionValue, to]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return () => unsubscribe();
    }, [springValue]);

    return (
        <span ref={ref} className={cn("inline-block tabular-nums", className)} style={style}>
            {prefix}{displayValue.toLocaleString().replace(/,/g, separator)}{suffix}
        </span>
    );
}
