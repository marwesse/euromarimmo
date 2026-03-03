"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Settings, Users, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions/auth-actions";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getUnreadLeadsCount } from "@/app/actions/lead-actions";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Propriétés", href: "/admin/proprietes", icon: Building2 },
    { name: "Leads VIP", href: "/admin/leads", icon: Users },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        async function fetchUnreadCount() {
            try {
                const count = await getUnreadLeadsCount();
                setUnreadCount(count);
            } catch (error) {
                console.error("Failed to fetch unread leads count:", error);
            }
        }
        fetchUnreadCount();

        // Optional: Polling every 30 seconds for new leads
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#111827] z-40 flex items-center justify-between px-4 border-b border-gray-800">
                <Link href="/admin" className="text-xl font-serif text-white tracking-wider uppercase">
                    EUROMAR <span className="text-[#d4af37]">IMMO</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-[#1f2937]" />
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-2 focus:outline-none">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] text-gray-300 min-h-screen h-[100dvh] border-r border-gray-800 transition-transform duration-300 md:relative md:translate-x-0 flex flex-col",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-center h-20 border-b border-gray-800 shrink-0 relative">
                    <Link href="/admin" className="text-2xl font-serif text-white tracking-wider uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                        EUROMAR <span className="text-[#d4af37]">IMMO</span>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-[#1f2937] text-white"
                                        : "hover:bg-[#1f2937]/50 hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={cn("w-5 h-5", isActive ? "text-[#d4af37]" : "text-gray-400")} />
                                    {item.name}
                                </div>
                                {item.name === "Leads VIP" && unreadCount > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-800 shrink-0">
                    <form action={async () => { await signOut(); }}>
                        <button
                            type="submit"
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-colors group"
                        >
                            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                            Déconnexion
                        </button>
                    </form>
                    <div className="mt-4 hidden md:flex items-center justify-between px-4 py-2 border-t border-gray-800 pt-4">
                        <span className="text-sm text-gray-400">Thème</span>
                        <ThemeToggle className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-[#1f2937]" />
                    </div>
                </div>
            </div>
        </>
    );
}
