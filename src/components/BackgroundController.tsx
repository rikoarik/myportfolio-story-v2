"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function BackgroundController() {
    const { scrollY } = useScroll();


    // Map progress to colors.
    // Colors: pastel palette from Color Hunt + a few more for 8 chapters
    const colors = [
        "#FFDCDC", // Void
        "#FFF2EB", // Origin
        "#FFE8CD", // Pressure
        "#FFD6BA", // Control
        "#FFE5D9", // Systems
        "#FBFAF0", // Scale
        "#F0F4EF", // Tools
        "#E5E1EE"  // Now
    ];

    const [bgColor, setBgColor] = useState(colors[0]);

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        const totalH = document.documentElement.scrollHeight - window.innerHeight;
        const singleSetHeight = totalH / 3;
        if (singleSetHeight <= 0) return;

        const progress = (latest % singleSetHeight) / singleSetHeight;
        const index = Math.min(Math.floor(progress * colors.length), colors.length - 1);
        setBgColor(colors[index]);
    });

    return (
        <motion.div
            animate={{ backgroundColor: bgColor }}
            transition={{ duration: 1, ease: "linear" }}
            className="fixed inset-0 -z-10 w-full h-full"
        />
    );
}
