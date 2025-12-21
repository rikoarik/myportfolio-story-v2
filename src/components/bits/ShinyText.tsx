"use client";

export default function ShinyText({ text, disabled = false, speed = 3, className = "" }: { text: string; disabled?: boolean; speed?: number; className?: string }) {
    if (disabled) return <span className={className}>{text}</span>;

    const animationDuration = `${speed}s`;

    return (
        <span
            className={`inline-block relative overflow-hidden ${className}`}
            style={{
                backgroundImage:
                    "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: `shine ${animationDuration} linear infinite`,
            }}
        >
            <style jsx>{`
                @keyframes shine {
                    0% { background-position: 100%; }
                    100% { background-position: -100%; }
                }
             `}</style>
            {text}
        </span>
    );
}
