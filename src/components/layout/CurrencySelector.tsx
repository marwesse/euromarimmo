"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn is available, or we use a local one. We'll use a local one to be safe.

const currencies = [
    { code: "MAD", flag: "🇲🇦" },
    { code: "EUR", flag: "🇪🇺" },
    { code: "USD", flag: "🇺🇸" },
];

export function CurrencySelector({ className }: { className?: string }) {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentCurrency = currencies.find((c) => c.code === currency) || currencies[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className={`relative ${className || ""}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
                aria-label="Sélectionner la devise"
            >
                <span className="text-sm font-medium tracking-wide">
                    {currentCurrency.code} {currentCurrency.flag}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-28 bg-white dark:bg-[#1a202c] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                        {currencies.map((c) => (
                            <button
                                key={c.code}
                                onClick={() => {
                                    setCurrency(c.code as any);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${currency === c.code ? "text-accent font-semibold bg-accent/5 dark:bg-accent/10" : "text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                <span>{c.code}</span>
                                <span>{c.flag}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
