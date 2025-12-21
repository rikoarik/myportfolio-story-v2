"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, useCallback, createContext, useContext } from "react";

// Context to share scroll progress with other components
interface ScrollContextType {
    progress: number; // 0-1 normalized progress
    scrollToSection: (sectionIndex: number) => void;
}

export const HorizontalScrollContext = createContext<ScrollContextType>({
    progress: 0,
    scrollToSection: () => { },
});

export function useHorizontalScroll() {
    return useContext(HorizontalScrollContext);
}

export default function HorizontalScroll({ children, overlay }: { children: React.ReactNode; overlay?: React.ReactNode }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [singleContentWidth, setSingleContentWidth] = useState(0);
    const [progress, setProgress] = useState(0);

    // Scroll state
    const targetX = useRef(0);
    const currentX = useRef(0);
    const x = useMotionValue(0);

    // Lerp factor - higher = more responsive, lower = smoother
    const LERP_FACTOR = 0.08;

    const [isMobile, setIsMobile] = useState(false);

    // Measure Content Width & Check Mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }

            if (contentRef.current && contentRef.current.children[0]) {
                const child = contentRef.current.children[0] as HTMLElement;
                setSingleContentWidth(child.getBoundingClientRect().width);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        const observer = new ResizeObserver(handleResize);
        if (contentRef.current) observer.observe(contentRef.current);
        setTimeout(handleResize, 500);

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
        };
    }, []);

    // Wrap function for seamless loop
    const wrapValue = useCallback((value: number, width: number): number => {
        if (width === 0) return value;
        const minBound = -width * 2;
        const maxBound = 0;

        if (value > maxBound) {
            return minBound + (value % width);
        } else if (value < minBound) {
            return maxBound + (value % width);
        }
        return value;
    }, []);

    // Scroll to specific section (0-7 for 8 sections)
    const scrollToSection = useCallback((sectionIndex: number) => {
        if (isMobile) {
            // Native vertical scroll for mobile
            const sectionId = ["void", "origin", "pressure", "control", "systems", "scale", "tools", "now"][sectionIndex];
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
            return;
        }

        if (singleContentWidth === 0) return;
        const sectionWidth = singleContentWidth / 8;
        const newTarget = -(sectionIndex * sectionWidth);
        targetX.current = wrapValue(newTarget, singleContentWidth);
    }, [singleContentWidth, wrapValue, isMobile]);

    // Animation loop using requestAnimationFrame
    useEffect(() => {
        if (isMobile) return; // Disable animation loop on mobile

        let animationId: number;

        const animate = () => {
            if (singleContentWidth > 0) {
                const diff = targetX.current - currentX.current;
                currentX.current += diff * LERP_FACTOR;
                const wrappedCurrent = wrapValue(currentX.current, singleContentWidth);

                if (Math.abs(wrappedCurrent - currentX.current) > singleContentWidth * 0.5) {
                    currentX.current = wrappedCurrent;
                    targetX.current = wrapValue(targetX.current, singleContentWidth);
                }

                x.set(wrappedCurrent);

                // Calculate progress (0-1)
                // wrappedCurrent is in range [-2*width, 0]
                // Normalize to [0, 1]
                const normalizedProgress = Math.abs(wrappedCurrent) / singleContentWidth;
                setProgress(normalizedProgress % 1);
            }

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [singleContentWidth, wrapValue, x, isMobile]);

    // Handle wheel events
    useEffect(() => {
        if (isMobile) return; // Disable wheel hijacking on mobile

        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
            targetX.current -= delta;
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [isMobile]);

    // Handle keyboard navigation
    useEffect(() => {
        if (isMobile) return; // Disable keyboard hijacking on mobile

        const handleKeyDown = (e: KeyboardEvent) => {
            const scrollAmount = 300;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                targetX.current -= scrollAmount;
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                targetX.current += scrollAmount;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobile]);

    // Handle touch events for mobile (actually, we want to disable this specific logic on mobile and just let native scroll happen)
    useEffect(() => {
        if (isMobile) return;

        const container = containerRef.current;
        if (!container) return;

        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchStartX - touchX;
            const deltaY = touchStartY - touchY;
            const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
            targetX.current -= delta * 2;
            touchStartX = touchX;
            touchStartY = touchY;
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [isMobile]);

    if (isMobile) {
        return (
            <HorizontalScrollContext.Provider value={{ progress, scrollToSection }}>
                <div className="w-full flex flex-col overflow-x-hidden relative">
                    {/* Render only one instance of children for vertical mobile layout */}
                    <div className="flex flex-col w-full">
                        {children}
                    </div>
                </div>
                {/* No overlay on mobile, or render a modified one if needed */}
            </HorizontalScrollContext.Provider>
        );
    }

    return (
        <HorizontalScrollContext.Provider value={{ progress, scrollToSection }}>
            <div
                ref={containerRef}
                className="fixed inset-0 overflow-hidden flex items-center bg-transparent cursor-grab active:cursor-grabbing"
                style={{ touchAction: "none" }}
            >
                <motion.div
                    ref={contentRef}
                    style={{ x }}
                    className="flex h-full w-max bg-transparent will-change-transform"
                >
                    <div className="flex shrink-0">{children}</div>
                    <div className="flex shrink-0">{children}</div>
                    <div className="flex shrink-0">{children}</div>
                </motion.div>
            </div>
            {overlay}
        </HorizontalScrollContext.Provider>
    );
}
