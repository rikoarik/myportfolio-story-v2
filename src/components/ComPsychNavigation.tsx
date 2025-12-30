"use client";

import { motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';
import { SectionId } from '@/lib/sectionColors';
import { useTheme } from '@/context/ThemeContext';
import { slideInLeftVariants, listItemVariants } from '@/lib/compsychAnimations';
import SectionNumber from './SectionNumber';
import { useLanguage } from '@/context/LanguageContext';

// All section IDs in order
const ALL_SECTIONS: SectionId[] = [
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
    'future',
];

/**
 * ComPsych-style sticky sidebar navigation
 * Shows section numbers (001-011) with smooth scroll to section
 * Hidden on mobile, visible on desktop (lg+)
 */
export default function ComPsychNavigation() {
    const activeSection = useActiveSection(ALL_SECTIONS, 0.3);
    const { theme } = useTheme();
    const { t } = useLanguage();

    // Section labels for display
    const sectionLabels: Record<SectionId, string> = {
        foundation: t('page.foundation.label'),
        architecture: t('page.structure.label'),
        state: t('page.state.label'),
        offline: t('page.offline.label'),
        hardware: t('page.hardware.label'),
        multiapp: t('page.scale.label'),
        security: t('page.security.label'),
        crossplatform: t('page.crossplatform.label'),
        production: t('page.production.label'),
        refinement: t('page.refinement.label'),
        future: 'FUTURE',
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={slideInLeftVariants}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
            style={{
                backgroundColor: theme.bgPrimary + 'CC', // 80% opacity
                backdropFilter: 'blur(10px)',
            }}
        >
            <div className="py-8 px-4 rounded-r-2xl border-r-2" style={{ borderColor: theme.accent }}>
                <motion.ul
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.05,
                                delayChildren: 0.3,
                            },
                        },
                    }}
                    className="space-y-4"
                >
                    {ALL_SECTIONS.map((sectionId, index) => {
                        const isActive = activeSection === sectionId;

                        return (
                            <motion.li
                                key={sectionId}
                                variants={listItemVariants}
                            >
                                <button
                                    onClick={() => scrollToSection(sectionId)}
                                    className="flex items-center gap-3 group transition-all duration-300"
                                    aria-label={`Go to ${sectionLabels[sectionId]}`}
                                >
                                    {/* Section Number */}
                                    <SectionNumber
                                        number={index + 1}
                                        accentColor={isActive ? theme.accent : theme.textSecondary}
                                        className={`transition-all duration-300 ${isActive ? 'text-lg font-bold' : 'text-xs'
                                            }`}
                                    />

                                    {/* Active Indicator Bar */}
                                    <div
                                        className="h-8 transition-all duration-300"
                                        style={{
                                            width: isActive ? '3px' : '1px',
                                            backgroundColor: isActive ? theme.accent : theme.border,
                                        }}
                                    />

                                    {/* Section Label (appears on hover or when active) */}
                                    <span
                                        className={`text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                            }`}
                                        style={{
                                            color: isActive ? theme.textPrimary : theme.textSecondary,
                                            maxWidth: isActive ? '200px' : '0px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {sectionLabels[sectionId]}
                                    </span>
                                </button>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </motion.nav>
    );
}
