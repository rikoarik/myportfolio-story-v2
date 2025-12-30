import { ThemeColors } from '@/config/theme';

// Helper function to interpolate between two hex colors
function lerpColor(color1: string, color2: string, t: number): string {
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

// Helper function to add alpha to hex color
function addAlpha(hex: string, alpha: number): string {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return hex + alphaHex;
}

// Time-based color palettes for each phase
const timePalettes = {
    // Pagi (6:00-11:00): "Morning Mist"
    // Konsep: Bersih, Profesional, Energik.
    // Warna: Putih bersih ke Biru Laut lembut.
    morning: {
        start: {
            bgPrimary: '#FFFFFF',       // Pure White (Clean start)
            bgSecondary: '#F1F5F9',     // Cool Gray (sangat tipis)
            accent: '#0EA5E9',          // Sky Blue (Vibrant tapi tidak norak)
            accentHover: '#0284C7',     // Darker Blue
            textPrimary: '#0F172A',     // Slate 900 (Hampir hitam, lebih lembut)
            textSecondary: '#64748B',   // Slate 500
            textAccent: '#0EA5E9',
            border: '#E2E8F0',
            gradientFrom: '#E0F2FE',    // Light Sky
            gradientTo: '#FFFFFF',
        },
        end: {
            bgPrimary: '#F8FAFC',       // Off-white cool tone
            bgSecondary: '#E0F2FE',     // Pale Blue
            accent: '#38BDF8',          // Light Blue cyan
            accentHover: '#0EA5E9',
            textPrimary: '#1E293B',     // Slate 800
            textSecondary: '#38BDF8',
            textAccent: '#0284C7',
            border: '#BAE6FD',
            gradientFrom: '#38BDF8',
            gradientTo: '#F0F9FF',
        }
    },

    // Siang (11:00-15:00): "Golden Hour Focus"
    // Konsep: Hangat, Produktif, Nyaman dibaca lama.
    // Warna: Ivory (Gading), Krem, dan Amber (Emas).
    noon: {
        start: {
            bgPrimary: '#FFFCF5',       // Warm Ivory (Sangat enak di mata)
            bgSecondary: '#FEEFC3',     // Soft Butter
            accent: '#F59E0B',          // Amber/Gold (Warna fokus)
            accentHover: '#D97706',     // Darker Amber
            textPrimary: '#451A03',     // Dark Brown (Kontras tinggi tapi hangat)
            textSecondary: '#B45309',   // Brownish Orange
            textAccent: '#F59E0B',
            border: '#FEF3C7',
            gradientFrom: '#FDE68A',
            gradientTo: '#FFFCF5',
        },
        end: {
            bgPrimary: '#FFF7ED',       // Orange tint very light
            bgSecondary: '#FFEDD5',     // Soft Peach
            accent: '#EA580C',          // Burnt Orange (Energi sore)
            accentHover: '#C2410C',
            textPrimary: '#431407',     // Deep Espresso
            textSecondary: '#EA580C',
            textAccent: '#EA580C',
            border: '#FED7AA',
            gradientFrom: '#FB923C',
            gradientTo: '#FFF7ED',
        }
    },

    // Sore (15:00-19:00): "Lavender Haze"
    // Konsep: Kreatif, Santai, Estetik.
    // Warna: Transisi dari Ungu Pastel ke Indigo Gelap.
    afternoon: {
        start: {
            bgPrimary: '#FDF4FF',       // Very light Pink/Purple
            bgSecondary: '#F0ABFC',     // Soft Fuchsia
            accent: '#C026D3',          // Fuchsia Purple (Warna pop!)
            accentHover: '#A21CAF',
            textPrimary: '#4A044E',     // Dark Purple Text
            textSecondary: '#C026D3',
            textAccent: '#D946EF',
            border: '#F5D0FE',
            gradientFrom: '#E879F9',
            gradientTo: '#FDF4FF',
        },
        end: {
            bgPrimary: '#2E1065',       // Deep Indigo (Mulai masuk mode gelap)
            bgSecondary: '#4C1D95',     // Lighter Indigo
            accent: '#F472B6',          // Pink Accent (Kontras dengan bg gelap)
            accentHover: '#EC4899',
            textPrimary: '#FAF5FF',     // White Purpleish
            textSecondary: '#F472B6',
            textAccent: '#F472B6',
            border: '#5B21B6',
            gradientFrom: '#8B5CF6',
            gradientTo: '#2E1065',
        }
    },

    // Malam (19:00-6:00): "Deep Space"
    // Konsep: Modern Dark Mode, Coding Vibe, Tenang.
    // Warna: Slate (Abu kebiruan gelap), bukan hitam pekat.
    night: {
        start: {
            bgPrimary: '#0F172A',       // Slate 900 (Warna modern dark mode)
            bgSecondary: '#1E293B',     // Slate 800
            accent: '#6366F1',          // Indigo Neon
            accentHover: '#818CF8',     // Lighter Indigo
            textPrimary: '#F8FAFC',     // Off-white
            textSecondary: '#94A3B8',   // Slate 400 (Text pudar)
            textAccent: '#6366F1',
            border: '#334155',
            gradientFrom: '#6366F1',
            gradientTo: '#0F172A',
        },
        end: {
            bgPrimary: '#020617',       // Hampir Hitam (Deepest Slate)
            bgSecondary: '#0F172A',     // Slate 900
            accent: '#10B981',          // Emerald Green (Kesan "System Active")
            accentHover: '#34D399',
            textPrimary: '#E2E8F0',     // Soft White
            textSecondary: '#10B981',   // Green text
            textAccent: '#10B981',
            border: '#1E293B',
            gradientFrom: '#059669',
            gradientTo: '#020617',
        }
    }
};
// Get current time phase and progress
function getTimePhase(): { phase: keyof typeof timePalettes; progress: number } {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    // Pagi: 6:00-11:00 (300-660 minutes)
    if (totalMinutes >= 360 && totalMinutes < 660) {
        const phaseStart = 360; // 6:00
        const phaseEnd = 660;   // 11:00
        const progress = (totalMinutes - phaseStart) / (phaseEnd - phaseStart);
        return { phase: 'morning', progress: Math.min(1, Math.max(0, progress)) };
    }
    
    // Siang: 11:00-15:00 (660-900 minutes)
    if (totalMinutes >= 660 && totalMinutes < 900) {
        const phaseStart = 660; // 11:00
        const phaseEnd = 900;   // 15:00
        const progress = (totalMinutes - phaseStart) / (phaseEnd - phaseStart);
        return { phase: 'noon', progress: Math.min(1, Math.max(0, progress)) };
    }
    
    // Sore: 15:00-19:00 (900-1140 minutes)
    if (totalMinutes >= 900 && totalMinutes < 1140) {
        const phaseStart = 900; // 15:00
        const phaseEnd = 1140;  // 19:00
        const progress = (totalMinutes - phaseStart) / (phaseEnd - phaseStart);
        return { phase: 'afternoon', progress: Math.min(1, Math.max(0, progress)) };
    }
    
    // Malam: 19:00-6:00 (1140-1440 or 0-360 minutes)
    if (totalMinutes >= 1140) {
        // Late night: 19:00-24:00
        const phaseStart = 1140; // 19:00
        const phaseEnd = 1440;   // 24:00
        const progress = (totalMinutes - phaseStart) / (phaseEnd - phaseStart);
        return { phase: 'night', progress: Math.min(1, Math.max(0, progress)) };
    } else {
        // Early morning: 0:00-6:00
        const phaseStart = 0;    // 0:00
        const phaseEnd = 360;    // 6:00
        const progress = totalMinutes / (phaseEnd - phaseStart);
        return { phase: 'night', progress: Math.min(1, Math.max(0, progress)) };
    }
}

// Generate theme colors based on current time
export function getTimeBasedColors(): ThemeColors {
    const { phase, progress } = getTimePhase();
    const palette = timePalettes[phase];
    
    return {
        bgPrimary: lerpColor(palette.start.bgPrimary, palette.end.bgPrimary, progress),
        bgSecondary: lerpColor(palette.start.bgSecondary, palette.end.bgSecondary, progress),
        accent: lerpColor(palette.start.accent, palette.end.accent, progress),
        accentHover: lerpColor(palette.start.accentHover, palette.end.accentHover, progress),
        textPrimary: lerpColor(palette.start.textPrimary, palette.end.textPrimary, progress),
        textSecondary: lerpColor(palette.start.textSecondary.slice(0, 7), palette.end.textSecondary.slice(0, 7), progress) + '99',
        textAccent: lerpColor(palette.start.textAccent, palette.end.textAccent, progress),
        border: lerpColor(palette.start.border, palette.end.border, progress),
        gradientFrom: lerpColor(palette.start.gradientFrom, palette.end.gradientFrom, progress),
        gradientTo: lerpColor(palette.start.gradientTo, palette.end.gradientTo, progress),
    };
}


