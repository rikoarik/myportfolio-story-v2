"use client";

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

/**
 * Component untuk set CSS variables dari theme ke :root
 * Memungkinkan akses theme colors via CSS variables
 */
export default function ThemeCSSVariables() {
    const { theme } = useTheme();

    useEffect(() => {
        const root = document.documentElement;
        
        // Set CSS variables dari theme
        root.style.setProperty('--theme-bg-primary', theme.bgPrimary);
        root.style.setProperty('--theme-bg-secondary', theme.bgSecondary);
        root.style.setProperty('--theme-accent', theme.accent);
        root.style.setProperty('--theme-accent-hover', theme.accentHover);
        root.style.setProperty('--theme-text-primary', theme.textPrimary);
        root.style.setProperty('--theme-text-secondary', theme.textSecondary);
        root.style.setProperty('--theme-text-accent', theme.textAccent);
        root.style.setProperty('--theme-border', theme.border);
        root.style.setProperty('--theme-gradient-from', theme.gradientFrom);
        root.style.setProperty('--theme-gradient-to', theme.gradientTo);
        
        // Also update legacy variables for compatibility
        root.style.setProperty('--background', theme.bgPrimary);
        root.style.setProperty('--foreground', theme.textPrimary);
        root.style.setProperty('--color-primary', theme.textPrimary);
        root.style.setProperty('--color-accent', theme.accent);
        root.style.setProperty('--color-surface', theme.bgSecondary);
        root.style.setProperty('--color-surface-dim', theme.bgPrimary);
    }, [theme]);

    return null;
}


