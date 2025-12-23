import { Layers } from "lucide-react";
import MenuOverlay from "./MenuOverlay";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const { theme } = useTheme();

    return (
        <>
            <header
                className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center pointer-events-none transition-colors duration-500"
                style={{ color: theme.textPrimary }}
            >
                <div className="pointer-events-auto cursor-pointer">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                        Arik Riko Prasetya
                    </h1>
                    <p
                        className="text-[10px] tracking-widest uppercase mt-1 transition-colors duration-500"
                        style={{ color: theme.textSecondary }}
                    >
                        {t('header.role')}
                    </p>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="pointer-events-auto flex items-center gap-3 group px-4 py-2 rounded-full transition-all duration-300 hover:opacity-80"
                    style={{
                        color: theme.textPrimary,
                        backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.bgSecondary + '40'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold tracking-tight">{t('header.menu')}</span>
                    </div>
                    <Layers
                        className="w-6 h-6 stroke-1 group-hover:rotate-180 transition-transform duration-500"
                        style={{ color: theme.textPrimary }}
                    />
                </button>
            </header>

            <MenuOverlay
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
