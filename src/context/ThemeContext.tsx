"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore, ReactNode } from 'react';
import { themes, ThemeName, ThemeColors } from '@/config/theme';

interface ThemeContextType {
    theme: ThemeColors;
    themeName: ThemeName;
    setThemeName: (name: ThemeName) => void;
    availableThemes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME: ThemeName = 'nightSky';

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

function getSnapshot(): ThemeName {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    return saved && themes[saved] ? saved : DEFAULT_THEME;
}

function getServerSnapshot(): ThemeName {
    return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Use useSyncExternalStore to read from localStorage without cascading renders
    const themeName = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    const setThemeName = useCallback((name: ThemeName) => {
        localStorage.setItem(THEME_STORAGE_KEY, name);
        emitChange();
    }, []);

    const value: ThemeContextType = {
        theme: themes[themeName],
        themeName,
        setThemeName,
        availableThemes: Object.keys(themes) as ThemeName[],
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
export const themeDisplayNames: Record<ThemeName, string> = {
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
