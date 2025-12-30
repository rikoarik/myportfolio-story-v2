"use client";

interface SectionNumberProps {
    number: number;
    accentColor?: string;
    className?: string;
}

/**
 * Display formatted section numbers (001, 002, 003...)
 * Inspired by ComPsych design guidelines
 */
export default function SectionNumber({ number, accentColor, className = '' }: SectionNumberProps) {
    // Format number with leading zeros (1 -> 001, 11 -> 011)
    const formatted = String(number).padStart(3, '0');

    return (
        <span
            className={`font-mono text-xs tracking-widest ${className}`}
            style={{ color: accentColor }}
        >
            {formatted}
        </span>
    );
}
