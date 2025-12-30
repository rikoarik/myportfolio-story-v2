import { useState, useEffect } from 'react';
import { ThemeColors } from '@/config/theme';
import { getTimeBasedColors } from '@/lib/timeColors';

/**
 * Hook untuk mendapatkan theme colors yang berubah berdasarkan waktu real-time
 * Update setiap menit untuk perubahan smooth
 */
export function useTimeTheme(): ThemeColors {
    const [theme, setTheme] = useState<ThemeColors>(() => getTimeBasedColors());

    useEffect(() => {
        // Update theme immediately
        setTheme(getTimeBasedColors());

        // Calculate milliseconds until next minute
        const now = new Date();
        const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

        // Set initial timeout to align with next minute
        const initialTimeout = setTimeout(() => {
            setTheme(getTimeBasedColors());
            
            // Then update every minute
            const interval = setInterval(() => {
                setTheme(getTimeBasedColors());
            }, 60000);

            return () => clearInterval(interval);
        }, msUntilNextMinute);

        return () => {
            clearTimeout(initialTimeout);
        };
    }, []);

    // Also update every minute using interval
    useEffect(() => {
        const interval = setInterval(() => {
            setTheme(getTimeBasedColors());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return theme;
}


