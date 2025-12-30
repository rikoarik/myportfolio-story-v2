"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore, ReactNode, useMemo } from 'react';
import { themes, ThemeName, ThemeColors } from '@/config/theme';
import { useTimeTheme } from '@/hooks/useTimeTheme';

interface ThemeContextType {
    theme: ThemeColors;
    themeName: ThemeName | 'time-based';
    setThemeName: (name: ThemeName | 'time-based') => void;
    availableThemes: (ThemeName | 'time-based')[];
    isTimeBased: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme-v2';
const DEFAULT_THEME: ThemeName | 'time-based' = 'time-based';

// For useSyncExternalStore - avoids the setState in effect warning
let listeners: Array<() => void> = [];

function emitChange() {
    for (const listener of listeners) {
        listener();
    }
}

function subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
        listeners = listeners.filter(l => l !== listener);
    };
}

function getSnapshot(): ThemeName | 'time-based' {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | 'time-based' | null;
    if (saved === 'time-based') return 'time-based';
    return saved && themes[saved] ? saved : DEFAULT_THEME;
}

function getServerSnapshot(): ThemeName | 'time-based' {
    return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Get time-based theme colors
    const timeTheme = useTimeTheme();

    // Use useSyncExternalStore to read from localStorage without cascading renders
    const themeName = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    const setThemeName = useCallback((name: ThemeName | 'time-based') => {
        localStorage.setItem(THEME_STORAGE_KEY, name);
        emitChange();
    }, []);

    const isTimeBased = themeName === 'time-based';

    // Use time-based theme if selected, otherwise use static theme
    const theme = useMemo(() => {
        if (isTimeBased) {
            return timeTheme;
        }
        return themes[themeName as ThemeName];
    }, [isTimeBased, themeName, timeTheme]);

    const value: ThemeContextType = {
        theme,
        themeName,
        setThemeName,
        availableThemes: ['time-based', ...Object.keys(themes) as ThemeName[]],
        isTimeBased,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Theme display names for UI
export const themeDisplayNames: Record<ThemeName | 'time-based', string> = {
    'time-based': '⏰ Time-Based (Real-time)',
    light: '☀️ Premium Light',
    nightSky: '🌙 Night Sky',
    midnightBlue: '🌌 Midnight Blue',
    darkPurple: '💜 Dark Purple',
    galaxy: '🌊 Galaxy',
    deepNight: '🌑 Deep Night',
    ocean: '🌊 Ocean',
    forest: '🌲 Forest',
    sunset: '🌅 Sunset',
    lavender: '💜 Lavender',
    coffee: '☕ Coffee',
};
