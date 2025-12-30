import { Variants } from 'framer-motion';

/**
 * ComPsych-inspired animation variants
 * Uses signature easing curve: [0.22, 1, 0.36, 1]
 */

// Smooth scroll reveal animation (fade-in from bottom with scale)
export const scrollRevealVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Container with staggered children animation
export const containerStaggerVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Faster scroll reveal for smaller elements
export const quickRevealVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Section transition (for background color changes)
export const sectionTransitionVariants: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Parallax effect for background elements
export const parallaxVariants: Variants = {
    initial: {
        y: 0,
    },
    animate: {
        y: -50,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Slide in from left (for sidebar navigation)
export const slideInLeftVariants: Variants = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Fade in with slight scale
export const fadeInScaleVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Card hover animation (subtle lift)
export const cardHoverVariants: Variants = {
    initial: {
        y: 0,
        scale: 1,
    },
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Staggered list items
export const listItemVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

/**
 * Helper to create custom stagger animation
 * @param staggerDelay - Delay between each child (in seconds)
 * @param initialDelay - Initial delay before first child (in seconds)
 */
export function createStaggerVariants(
    staggerDelay: number = 0.1,
    initialDelay: number = 0.2
): Variants {
    return {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: initialDelay,
            },
        },
    };
}

/**
 * Helper to create custom scroll reveal with configurable params
 * @param distance - Y distance to animate from (default: 60)
 * @param duration - Animation duration in seconds (default: 0.8)
 */
export function createScrollReveal(
    distance: number = 60,
    duration: number = 0.8
): Variants {
    return {
        hidden: {
            opacity: 0,
            y: distance,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };
}
