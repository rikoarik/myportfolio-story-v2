"use client";

import { cn } from "@/lib/utils";

interface SectionProps {
    id: string;
    className?: string;
    contentClassName?: string;
    title?: string;
    bgColor?: string;
    children: React.ReactNode;
}

export default function Section({ id, className, contentClassName, children }: Omit<SectionProps, 'title'>) {
    // Mobile: min-h-screen, w-full
    // Desktop: h-screen, w-screen (as part of the horizontal train)
    return (
        <section
            id={id}
            className={cn(
                "relative flex-shrink-0 flex flex-col overflow-hidden",
                "w-full min-h-screen h-auto", // Mobile default
                "lg:w-screen lg:h-screen lg:min-h-0", // Desktop override
                className
            )}
        >
            <div className={cn("relative z-10 w-full flex-grow flex flex-col pt-24 pb-24 md:pt-28 md:pb-36", contentClassName)}>
                {children}
            </div>
        </section>
    );
}
