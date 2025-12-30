"use client";

import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface SectionProps {
    id: string;
    className?: string;
    contentClassName?: string;
    title?: string;
    bgColor?: string;
    children: React.ReactNode;
    style?: CSSProperties;
    showSectionNumber?: boolean;
    sectionNumber?: number;
}

export default function Section({
    id,
    className,
    contentClassName,
    children,
    style,
    showSectionNumber = false,
    sectionNumber
}: Omit<SectionProps, 'title'>) {
    // Mobile: min-h-screen, w-full
    // Desktop: h-screen, w-screen (as part of the horizontal train)
    return (
        <section
            id={id}
            data-section-id={id}
            className={cn(
                "relative flex-shrink-0 flex flex-col overflow-hidden section-transition",
                "w-full min-h-screen h-auto", // Mobile default
                "lg:w-screen lg:h-screen lg:min-h-0", // Desktop override
                className
            )}
            style={style}
        >
            {showSectionNumber && sectionNumber && (
                <div className="absolute top-8 left-8 z-10 opacity-20">
                    <span className="section-number text-6xl font-black">
                        {String(sectionNumber).padStart(3, '0')}
                    </span>
                </div>
            )}
            <div className={cn("relative z-10 w-full flex-grow flex flex-col pt-24 pb-24 md:pt-28 md:pb-36", contentClassName)}>
                {children}
            </div>
        </section>
    );
}

