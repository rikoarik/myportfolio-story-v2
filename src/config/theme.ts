// Theme configuration with color palettes from colorhunt.co
// Change activeTheme to switch between different color schemes

export type ThemeName =
    | 'nightSky'
    | 'midnightBlue'
    | 'darkPurple'
    | 'galaxy'
    | 'deepNight'
    | 'ocean'
    | 'forest'
    | 'sunset'
    | 'lavender'
    | 'coffee';

export interface ThemeColors {
    // Main backgrounds
    bgPrimary: string;      // Darkest background
    bgSecondary: string;    // Secondary/card background

    // Accent colors
    accent: string;         // Primary accent (buttons, highlights)
    accentHover: string;    // Accent hover state

    // Text colors
    textPrimary: string;    // Main text
    textSecondary: string;  // Muted text
    textAccent: string;     // Accent text (labels, highlights)

    // Borders & Dividers
    border: string;

    // Gradients
    gradientFrom: string;
    gradientTo: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
    // Night Sky - Dark with orange/rust accents
    nightSky: {
        bgPrimary: '#191919',
        bgSecondary: '#2D4263',
        accent: '#C84B31',
        accentHover: '#E05A3E',
        textPrimary: '#ECDBBA',
        textSecondary: '#ECDBBA99',
        textAccent: '#C84B31',
        border: '#2D4263',
        gradientFrom: '#C84B31',
        gradientTo: '#2D4263',
    },

    // Midnight Blue - Deep blue with cyan accents
    midnightBlue: {
        bgPrimary: '#070F2B',
        bgSecondary: '#1B1A55',
        accent: '#9290C3',
        accentHover: '#A8A6D6',
        textPrimary: '#E8E8E8',
        textSecondary: '#E8E8E899',
        textAccent: '#9290C3',
        border: '#535C91',
        gradientFrom: '#9290C3',
        gradientTo: '#1B1A55',
    },

    // Dark Purple - Elegant purple with pink accents
    darkPurple: {
        bgPrimary: '#1A1A2E',
        bgSecondary: '#16213E',
        accent: '#E94560',
        accentHover: '#FF5A75',
        textPrimary: '#EAEAEA',
        textSecondary: '#EAEAEA99',
        textAccent: '#E94560',
        border: '#0F3460',
        gradientFrom: '#E94560',
        gradientTo: '#0F3460',
    },

    // Galaxy - Teal with cyan highlights
    galaxy: {
        bgPrimary: '#2C3333',
        bgSecondary: '#2E4F4F',
        accent: '#0E8388',
        accentHover: '#10A5AB',
        textPrimary: '#CBE4DE',
        textSecondary: '#CBE4DE99',
        textAccent: '#0E8388',
        border: '#2E4F4F',
        gradientFrom: '#0E8388',
        gradientTo: '#2E4F4F',
    },

    // Deep Night - Classic dark with blue highlights
    deepNight: {
        bgPrimary: '#0D1B2A',
        bgSecondary: '#1B263B',
        accent: '#778DA9',
        accentHover: '#8FA2BC',
        textPrimary: '#E0E1DD',
        textSecondary: '#E0E1DD99',
        textAccent: '#778DA9',
        border: '#415A77',
        gradientFrom: '#778DA9',
        gradientTo: '#1B263B',
    },

    // Ocean - Deep sea theme
    ocean: {
        bgPrimary: '#0C1844',
        bgSecondary: '#153677',
        accent: '#00CFFD',
        accentHover: '#33D9FF',
        textPrimary: '#F6F8FF',
        textSecondary: '#F6F8FF99',
        textAccent: '#00CFFD',
        border: '#1E4D8C',
        gradientFrom: '#00CFFD',
        gradientTo: '#153677',
    },

    // Forest - Dark green natural theme
    forest: {
        bgPrimary: '#1A2421',
        bgSecondary: '#2D3B36',
        accent: '#9DC08B',
        accentHover: '#B5D4A4',
        textPrimary: '#EDF1D6',
        textSecondary: '#EDF1D699',
        textAccent: '#9DC08B',
        border: '#40513B',
        gradientFrom: '#9DC08B',
        gradientTo: '#40513B',
    },

    // Sunset - Warm dark theme with orange/pink
    sunset: {
        bgPrimary: '#1F1D36',
        bgSecondary: '#3F3351',
        accent: '#E9A6A6',
        accentHover: '#F0BABA',
        textPrimary: '#F5F5F5',
        textSecondary: '#F5F5F599',
        textAccent: '#E9A6A6',
        border: '#864879',
        gradientFrom: '#E9A6A6',
        gradientTo: '#864879',
    },

    // Lavender - Soft purple theme
    lavender: {
        bgPrimary: '#2B2D42',
        bgSecondary: '#3D405B',
        accent: '#D4A5FF',
        accentHover: '#E0BAFF',
        textPrimary: '#F2E9E4',
        textSecondary: '#F2E9E499',
        textAccent: '#D4A5FF',
        border: '#5C5D7E',
        gradientFrom: '#D4A5FF',
        gradientTo: '#3D405B',
    },

    // Coffee - Warm brown theme
    coffee: {
        bgPrimary: '#1B1A17',
        bgSecondary: '#3D2C29',
        accent: '#E8A87C',
        accentHover: '#F0BC94',
        textPrimary: '#F5F1E3',
        textSecondary: '#F5F1E399',
        textAccent: '#E8A87C',
        border: '#5C4033',
        gradientFrom: '#E8A87C',
        gradientTo: '#5C4033',
    },
};

// ============================================
// CHANGE THIS TO SWITCH THEMES
// ============================================
export const activeTheme: ThemeName = 'nightSky';

// Helper function to get current theme colors
export function getTheme(): ThemeColors {
    return themes[activeTheme];
}

// Helper function to get theme by name
export function getThemeByName(name: ThemeName): ThemeColors {
    return themes[name];
}
