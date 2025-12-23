"use client";

import React from 'react';
import Snowfall from 'react-snowfall';

export default function SeasonalEffects() {

    const now = new Date();
    const month = now.getMonth(); // 0-11

    let season: 'winter' | 'spring' | 'summer' | 'autumn' = 'summer';

    // Winter: Dec (11), Jan (0), Feb (1)
    if (month === 11 || month === 0 || month === 1) {
        season = 'winter';
    }
    // Spring: Mar (2), Apr (3), May (4)
    else if (month >= 2 && month <= 4) {
        season = 'spring';
    }
    // Autumn: Sep (8), Oct (9), Nov (10)
    else if (month >= 8 && month <= 10) {
        season = 'autumn';
    }

    // WINTER CONFIG
    if (season === 'winter') {
        return (
            <Snowfall
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 50,
                    pointerEvents: 'none',
                }}
                snowflakeCount={100}
                radius={[0.5, 3.0]}
                speed={[0.5, 3.0]}
                wind={[-0.5, 2.0]}
            />
        );
    }

    // FALL/AUTUMN CONFIG
    if (season === 'autumn') {
        return (
            <Snowfall
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 50,
                    pointerEvents: 'none',
                }}
                color="#D2691E" // Chocolate/Orange color for leaves
                snowflakeCount={60}
                radius={[5, 10]} // Larger to simulate leaves
                speed={[0.5, 2.0]}
                wind={[-0.5, 1.5]}
            />
        );
    }

    // SPRING CONFIG
    if (season === 'spring') {
        return (
            <Snowfall
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 50,
                    pointerEvents: 'none',
                }}
                color="#FFC0CB" // Pink
                snowflakeCount={80}
                radius={[3, 6]}
                speed={[0.5, 1.5]}
            />
        );
    }

    return null;
}
