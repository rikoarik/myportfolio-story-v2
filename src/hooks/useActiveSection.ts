import { useState, useEffect, useRef } from 'react';
import { SectionId } from '@/lib/sectionColors';

/**
 * Hook to detect which section is currently in viewport
 * Uses IntersectionObserver to track section visibility
 * 
 * @param sectionIds - Array of section IDs to track (in order)
 * @param threshold - Percentage of section that must be visible (0-1, default 0.5)
 * @returns Currently active section ID
 * 
 * @example
 * const activeSection = useActiveSection(['foundation', 'architecture', 'state']);
 * // activeSection will be 'foundation', 'architecture', or 'state'
 */
export function useActiveSection(
    sectionIds: SectionId[],
    threshold: number = 0.5
): SectionId | null {
    const [activeSection, setActiveSection] = useState<SectionId | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Don't run on server
        if (typeof window === 'undefined') return;

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: threshold,
        };

        // Track which sections are currently intersecting
        const intersectingSections = new Map<string, number>();

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                const sectionId = entry.target.getAttribute('id') as SectionId;

                if (entry.isIntersecting) {
                    // Store intersection ratio for this section
                    intersectingSections.set(sectionId, entry.intersectionRatio);
                } else {
                    // Remove from intersecting sections
                    intersectingSections.delete(sectionId);
                }
            });

            // Find the section with highest intersection ratio
            let maxRatio = 0;
            let mostVisibleSection: SectionId | null = null;

            intersectingSections.forEach((ratio, sectionId) => {
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    mostVisibleSection = sectionId as SectionId;
                }
            });

            // Update active section
            if (mostVisibleSection) {
                setActiveSection(mostVisibleSection);
            }
        };

        // Create observer
        observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        sectionIds.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        // Cleanup
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [sectionIds, threshold]);

    return activeSection;
}

/**
 * Hook to check if a specific section is currently active
 * 
 * @param sectionId - Section ID to check
 * @param allSectionIds - All section IDs to track
 * @param threshold - Visibility threshold (0-1, default 0.5)
 * @returns Whether the section is active
 * 
 * @example
 * const isFoundationActive = useIsSectionActive('foundation', ALL_SECTION_IDS);
 */
export function useIsSectionActive(
    sectionId: SectionId,
    allSectionIds: SectionId[],
    threshold: number = 0.5
): boolean {
    const activeSection = useActiveSection(allSectionIds, threshold);
    return activeSection === sectionId;
}
