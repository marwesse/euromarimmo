"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by waiting for mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className={cn("p-2 rounded-full opacity-0", className)} aria-hidden="true">
                <Sun className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
                "p-2 rounded-full transition-all duration-300 relative overflow-hidden group hover:bg-black/5 dark:hover:bg-white/10",
                className
            )}
            aria-label="Toggle theme"
        >
            <div className="relative z-10">
                {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-accent group-hover:rotate-45 transition-transform duration-300" />
                ) : (
                    <Moon className="w-5 h-5 text-primary group-hover:text-accent group-hover:-rotate-12 transition-colors transition-transform duration-300" />
                )}
            </div>
        </button>
    );
}
