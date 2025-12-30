import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useHorizontalScroll } from "./HorizontalScroll";
import { ThemeColors } from "@/config/theme";

interface BackgroundControllerProps {
    sectionThemes?: Record<string, ThemeColors>;
}

// Order must match the sections in page.tsx loop
const SECTION_IDS = [
    'foundation',
    'architecture',
    'state',
    'offline',
    'hardware',
    'multiapp',
    'security',
    'crossplatform',
    'production',
    'refinement',
    'future'
];

export default function BackgroundController({ sectionThemes }: BackgroundControllerProps) {
    const { theme } = useTheme();
    const { activeIndex } = useHorizontalScroll();

    // Determine target color based on active section
    let targetColor = theme.bgPrimary;

    if (sectionThemes) {
        // Safety check index
        const safeIndex = Math.max(0, Math.min(activeIndex, SECTION_IDS.length - 1));
        const activeSectionId = SECTION_IDS[safeIndex];
        const activeTheme = sectionThemes[activeSectionId];

        if (activeTheme) {
            targetColor = activeTheme.bgPrimary;
        }
    }

    return (
        <motion.div
            initial={{ backgroundColor: targetColor }}
            animate={{ backgroundColor: targetColor }}
            transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth fade
            className="fixed inset-0 -z-10 w-full h-full"
        />
    );
}
