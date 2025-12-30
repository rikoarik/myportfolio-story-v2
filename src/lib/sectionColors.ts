import { ThemeColors } from '@/config/theme';

/**
 * Helper function to interpolate between two hex colors
 * Re-using the logic from timeColors.ts for consistency
 */
export function lerpColor(color1: string, color2: string, t: number): string {
    // Convert hex to RGB
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);

    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    // Interpolate
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);

    // Convert back to hex
    return `#${[r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
}

/**
 * Section IDs matching the sections in page.tsx
 */
export type SectionId =
    | 'foundation'
    | 'architecture'
    | 'state'
    | 'offline'
    | 'hardware'
    | 'multiapp'
    | 'security'
    | 'crossplatform'
    | 'production'
    | 'refinement'
    | 'future';

/**
 * Base color palettes for each section
 * STRATEGY: Premium Neutral Backgrounds + Vibrant Accents
 * Palette: #5A9CB5 (Blue), #FACE68 (Yellow), #FAAC68 (Orange), #FA6868 (Red)
 */
export const sectionColorPalettes: Record<SectionId, ThemeColors> = {
    // 001 - Foundation: White + Cyan Accent
    foundation: {
        bgPrimary: '#ffffff',        // White
        bgSecondary: '#f0f9ff',      // Very Pale Cyan
        accent: '#06b6d4',           // Cyan-500
        accentHover: '#0891b2',      // Cyan-600
        textPrimary: '#0f172a',      // Slate-900 (Deep Dark)
        textSecondary: '#64748b',    // Slate-500
        textAccent: '#06b6d4',
        border: '#e2e8f0',           // Slate-200
        gradientFrom: '#06b6d4',
        gradientTo: '#ffffff',
    },

    // 002 - Architecture: Pale Silver + Amber Accent
    architecture: {
        bgPrimary: '#f8fafc',        // Slate-50
        bgSecondary: '#f1f5f9',      // Slate-100
        accent: '#f59e0b',           // Amber-500
        accentHover: '#d97706',      // Amber-600
        textPrimary: '#0f172a',      // Slate-900
        textSecondary: '#64748b',    // Slate-500
        textAccent: '#f59e0b',
        border: '#e2e8f0',           // Slate-200
        gradientFrom: '#f59e0b',
        gradientTo: '#f8fafc',
    },

    // 003 - State & Flow: White Smoke + Rose Accent
    state: {
        bgPrimary: '#fafafa',        // Neutral-50
        bgSecondary: '#f5f5f5',      // Neutral-100
        accent: '#f43f5e',           // Rose-500
        accentHover: '#e11d48',      // Rose-600
        textPrimary: '#171717',      // Neutral-900
        textSecondary: '#737373',    // Neutral-500
        textAccent: '#f43f5e',
        border: '#e5e5e5',           // Neutral-200
        gradientFrom: '#f43f5e',
        gradientTo: '#fafafa',
    },

    // 004 - Offline-First: Mint Cream + Emerald Accent
    offline: {
        bgPrimary: '#f0fdf4',        // Emerald-50
        bgSecondary: '#dcfce7',      // Emerald-100
        accent: '#10b981',           // Emerald-500
        accentHover: '#059669',      // Emerald-600
        textPrimary: '#022c22',      // Emerald-950
        textSecondary: '#374151',    // Gray-700
        textAccent: '#10b981',
        border: '#bbf7d0',           // Emerald-200
        gradientFrom: '#10b981',
        gradientTo: '#f0fdf4',
    },

    // 005 - Hardware: Alice Blue + Indigo Accent
    hardware: {
        bgPrimary: '#eff6ff',        // Blue-50
        bgSecondary: '#dbeafe',      // Blue-100
        accent: '#6366f1',           // Indigo-500
        accentHover: '#4f46e5',      // Indigo-600
        textPrimary: '#1e3a8a',      // Blue-950
        textSecondary: '#4b5563',    // Gray-600
        textAccent: '#6366f1',
        border: '#bfdbfe',           // Blue-200
        gradientFrom: '#6366f1',
        gradientTo: '#eff6ff',
    },

    // 006 - Scale/Multiapp: Slate White + Orange Accent
    multiapp: {
        bgPrimary: '#f8fafc',        // Slate-50
        bgSecondary: '#e2e8f0',      // Slate-200
        accent: '#f97316',           // Orange-500
        accentHover: '#ea580c',      // Orange-600
        textPrimary: '#0f172a',      // Slate-900
        textSecondary: '#64748b',    // Slate-500
        textAccent: '#f97316',
        border: '#cbd5e1',           // Slate-300
        gradientFrom: '#f97316',
        gradientTo: '#f8fafc',
    },

    // 007 - Security: Rose White + Red Accent
    security: {
        bgPrimary: '#fff1f2',        // Rose-50
        bgSecondary: '#ffe4e6',      // Rose-100
        accent: '#ef4444',           // Red-500
        accentHover: '#dc2626',      // Red-600
        textPrimary: '#450a0a',      // Red-950
        textSecondary: '#52525b',    // Zinc-600
        textAccent: '#ef4444',
        border: '#fecdd3',           // Rose-200
        gradientFrom: '#ef4444',
        gradientTo: '#fff1f2',
    },

    // 008 - Cross-Platform: White + Violet Accent
    crossplatform: {
        bgPrimary: '#ffffff',        // White
        bgSecondary: '#f3e8ff',      // Purple-100
        accent: '#8b5cf6',           // Violet-500
        accentHover: '#7c3aed',      // Violet-600
        textPrimary: '#1e293b',      // Slate-800
        textSecondary: '#64748b',    // Slate-500
        textAccent: '#8b5cf6',
        border: '#e9d5ff',           // Purple-200
        gradientFrom: '#8b5cf6',
        gradientTo: '#ffffff',
    },

    // 009 - Production: Sky White + Sky Accent
    production: {
        bgPrimary: '#f0f9ff',        // Sky-50
        bgSecondary: '#e0f2fe',      // Sky-100
        accent: '#0ea5e9',           // Sky-500
        accentHover: '#0284c7',      // Sky-600
        textPrimary: '#0c4a6e',      // Sky-950
        textSecondary: '#475569',    // Slate-600
        textAccent: '#0ea5e9',
        border: '#bae6fd',           // Sky-200
        gradientFrom: '#0ea5e9',
        gradientTo: '#f0f9ff',
    },

    // 010 - Refinement: Ivory + Gold Accent
    refinement: {
        bgPrimary: '#fffff0',        // Ivory
        bgSecondary: '#fef3c7',      // Amber-100
        accent: '#eab308',           // Yellow-500
        accentHover: '#ca8a04',      // Yellow-600
        textPrimary: '#422006',      // Amber-950
        textSecondary: '#57534e',    // Stone-600
        textAccent: '#eab308',
        border: '#fde68a',           // Amber-200
        gradientFrom: '#eab308',
        gradientTo: '#fffff0',
    },

    // 011 - Future: Lavender Blush + Magenta Accent
    future: {
        bgPrimary: '#fff0f5',        // Lavender Blush
        bgSecondary: '#fce7f3',      // Pink-100
        accent: '#ec4899',           // Pink-500
        accentHover: '#db2777',      // Pink-600
        textPrimary: '#500724',      // Pink-950
        textSecondary: '#52525b',    // Zinc-600
        textAccent: '#ec4899',
        border: '#fbcfe8',           // Pink-200
        gradientFrom: '#ec4899',
        gradientTo: '#fff0f5',
    },
};

/**
 * Blend section base colors with time-based colors
 * @param sectionColors Base colors for the section
 * @param timeColors Current time-based colors
 * @param influence How much time-based colors influence the blend (0-1, default 0.25)
 * @returns Blended theme colors
 */
export function blendThemeColors(
    sectionColors: ThemeColors,
    timeColors: ThemeColors,
    influence: number = 0.25
): ThemeColors {
    return {
        bgPrimary: lerpColor(sectionColors.bgPrimary, timeColors.bgPrimary, influence),
        bgSecondary: lerpColor(sectionColors.bgSecondary, timeColors.bgSecondary, influence),
        accent: lerpColor(sectionColors.accent, timeColors.accent, influence),
        accentHover: lerpColor(sectionColors.accentHover, timeColors.accentHover, influence),
        textPrimary: lerpColor(sectionColors.textPrimary, timeColors.textPrimary, influence),
        textSecondary: lerpColor(
            sectionColors.textSecondary.slice(0, 7),
            timeColors.textSecondary.slice(0, 7),
            influence
        ) + '99',
        textAccent: lerpColor(sectionColors.textAccent, timeColors.textAccent, influence),
        border: lerpColor(sectionColors.border, timeColors.border, influence),
        gradientFrom: lerpColor(sectionColors.gradientFrom, timeColors.gradientFrom, influence),
        gradientTo: lerpColor(sectionColors.gradientTo, timeColors.gradientTo, influence),
    };
}

/**
 * Get section colors without time-based blending
 * Useful for static color display or debugging
 */
export function getSectionColors(sectionId: SectionId): ThemeColors {
    return sectionColorPalettes[sectionId];
}
