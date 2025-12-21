"use client";

import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function SplitText({ text, className = "", delay = 100 }: SplitTextProps) {
    const letters = text.split("");
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10px" });

    useEffect(() => {
        if (isInView) {
            setInView(true);
        }
    }, [isInView]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
            to: async (next: (props: Record<string, unknown>) => Promise<void>) => {
                if (inView) {
                    await next({ opacity: 1, transform: "translate3d(0, -20px, 0)" });
                    await next({ opacity: 1, transform: "translate3d(0, 0, 0)" });
                }
            },
            delay: i * 50 + delay,
            config: { mass: 1, tension: 200, friction: 15 }
        }))
    );

    return (
        <p ref={ref} className={`overflow-hidden ${className}`} style={{ textAlign: "center", whiteSpace: "nowrap" }}>
            {springs.map((props, index) => (
                <animated.span key={index} style={props} className="inline-block hover:text-emerald-500 transition-colors duration-300">
                    {letters[index] === " " ? "\u00A0" : letters[index]}
                </animated.span>
            ))}
        </p>
    );
}
