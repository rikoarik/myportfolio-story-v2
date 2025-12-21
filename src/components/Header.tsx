"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center text-slate-900 pointer-events-none">
                <div className="pointer-events-auto cursor-pointer">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase">
                        Riko Arik
                    </h1>
                    <p className="text-[10px] opacity-70 tracking-widest uppercase mt-1">
                        Senior Portfolio
                    </p>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="pointer-events-auto group flex items-center gap-2 cursor-pointer"
                >
                    <span className="hidden md:inline text-xs font-bold uppercase tracking-widest group-hover:opacity-70 transition-opacity text-slate-900">
                        Menu
                    </span>
                    <div className="p-2 border border-slate-900/10 rounded-full group-hover:bg-slate-900/5 transition-colors">
                        <Menu className="w-5 h-5 text-slate-900" />
                    </div>
                </button>
            </header>

            <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
