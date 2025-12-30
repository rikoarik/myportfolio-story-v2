import { useMemo } from 'react';
import { ThemeColors } from '@/config/theme';
import { useTheme } from '@/context/ThemeContext';
import { SectionId, sectionColorPalettes, blendThemeColors } from '@/lib/sectionColors';

/**
 * Hook to get theme colors for a specific section
 * Blends section base colors (75%) with time-based colors (25%) for dynamic theming
 * 
 * @param sectionId - ID of the section to get colors for
 * @param enableBlending - Whether to blend with time-based colors (default: true)
 * @returns Theme colors for the section
 * 
 * @example
 * const foundationTheme = useSectionTheme('foundation');
 * <div style={{ backgroundColor: foundationTheme.bgPrimary }}>...</div>
 */
export function useSectionTheme(
    sectionId: SectionId,
    enableBlending: boolean = true
): ThemeColors {
    const { theme: timeTheme, isTimeBased } = useTheme();

    const sectionTheme = useMemo(() => {
        const sectionBaseColors = sectionColorPalettes[sectionId];

        // If blending is disabled or user selected a static theme, return base colors
        if (!enableBlending || !isTimeBased) {
            return sectionBaseColors;
        }

        // Blend section colors (75%) with time-based colors (25%)
        return blendThemeColors(sectionBaseColors, timeTheme, 0.25);
    }, [sectionId, enableBlending, isTimeBased, timeTheme]);

    return sectionTheme;
}

/**
 * Hook to get multiple section themes at once
 * Useful for pages that need to access multiple section colors
 * 
 * @param sectionIds - Array of section IDs
 * @param enableBlending - Whether to blend with time-based colors (default: true)
 * @returns Record of section IDs to theme colors
 * 
 * @example
 * const themes = useSectionThemes(['foundation', 'architecture', 'state']);
 * <div style={{ backgroundColor: themes.foundation.bgPrimary }}>...</div>
 */
export function useSectionThemes(
    sectionIds: SectionId[],
    enableBlending: boolean = true
): Record<SectionId, ThemeColors> {
    const { theme: timeTheme, isTimeBased } = useTheme();

    const themes = useMemo(() => {
        const result: Partial<Record<SectionId, ThemeColors>> = {};

        for (const sectionId of sectionIds) {
            const sectionBaseColors = sectionColorPalettes[sectionId];

            if (!enableBlending || !isTimeBased) {
                result[sectionId] = sectionBaseColors;
            } else {
                result[sectionId] = blendThemeColors(sectionBaseColors, timeTheme, 0.25);
            }
        }

        return result as Record<SectionId, ThemeColors>;
    }, [sectionIds, timeTheme, enableBlending, isTimeBased]);

    return themes;
}
