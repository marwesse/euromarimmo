"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Option {
    value: string;
    label: string;
}

interface LuxurySelectProps {
    options: (Option | string)[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
    name?: string;
    className?: string;
    buttonClassName?: string;
    dropdownClassName?: string;
    direction?: "up" | "down";
}

export function LuxurySelect({
    options,
    value,
    onChange,
    placeholder,
    icon,
    name,
    className,
    buttonClassName,
    dropdownClassName,
    direction = "down"
}: LuxurySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const formattedOptions = options.map(opt =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    const selectedOption = formattedOptions.find(opt => opt.value === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            {name && <input type="hidden" name={name} value={value} />}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn("w-full flex items-center justify-between focus:outline-none cursor-pointer", buttonClassName)}
            >
                <div className="flex items-center gap-2 truncate">
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span className={cn("truncate", !selectedOption && "opacity-70")}>
                        {selectedOption ? selectedOption.label : (placeholder || "Sélectionnez...")}
                    </span>
                </div>
                <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-300 opacity-70", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: direction === "down" ? -10 : 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: direction === "down" ? -10 : 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "absolute z-50 w-full bg-white dark:bg-[#1a202c] border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] py-2 max-h-64 overflow-y-auto left-0",
                            direction === "up" ? "bottom-full mb-3 origin-bottom" : "top-full mt-3 origin-top",
                            dropdownClassName
                        )}
                    >
                        {formattedOptions.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                className={cn(
                                    "w-full text-left px-5 py-3 text-sm transition-colors flex items-center justify-between group",
                                    value === opt.value
                                        ? "bg-primary/5 dark:bg-white/10 text-primary dark:text-white font-medium"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                )}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span className={cn("truncate transition-transform group-hover:translate-x-1 duration-300", value === opt.value && "translate-x-1")}>{opt.label}</span>
                                {value === opt.value && <Check className="w-4 h-4 text-accent shrink-0" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
