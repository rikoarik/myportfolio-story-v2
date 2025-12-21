import { Layers } from "lucide-react";
import MenuOverlay from "./MenuOverlay";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useHorizontalScroll } from "./HorizontalScroll";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const { activeIndex } = useHorizontalScroll();

    // Security (Index 6) is the only dark section requiring light text
    const isDarkSection = activeIndex === 6;
    const textColor = isDarkSection ? "text-slate-50" : "text-slate-900";
    const subtextColor = isDarkSection ? "text-slate-400" : "opacity-70";
    const buttonHover = isDarkSection ? "hover:bg-slate-800" : "hover:bg-slate-100";
    const iconColor = isDarkSection ? "text-slate-50" : "text-slate-900";

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center ${textColor} pointer-events-none transition-colors duration-500`}>
                <div className="pointer-events-auto cursor-pointer">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                        Arik Riko Arik
                    </h1>
                    <p className={`text-[10px] tracking-widest uppercase mt-1 transition-colors duration-500 ${subtextColor}`}>
                        {t('header.role')}
                    </p>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className={`pointer-events-auto flex items-center gap-3 group px-4 py-2 rounded-full transition-all duration-300 ${buttonHover}`}
                >
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold tracking-tight">{t('header.menu')}</span>
                        <span className="text-[8px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                            {t('header.menu_sub')}
                        </span>
                    </div>
                    <Layers className={`w-6 h-6 stroke-1 group-hover:rotate-180 transition-transform duration-500 ${iconColor}`} />
                </button>
            </header>

            <MenuOverlay
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
