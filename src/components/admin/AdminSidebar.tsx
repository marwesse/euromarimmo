"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Settings, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/actions/auth-actions";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Propriétés", href: "/admin/proprietes", icon: Building2 },
    { name: "Leads VIP", href: "/admin/leads", icon: Users },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 bg-[#111827] text-gray-300 min-h-screen border-r border-gray-800">
            <div className="flex items-center justify-center h-20 border-b border-gray-800">
                <Link href="/admin" className="text-2xl font-serif text-white tracking-wider uppercase">
                    EUROMAR <span className="text-[#d4af37]">IMMO</span>
                </Link>
            </div>

            <div className="flex-1 px-4 py-8 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-[#1f2937] text-white"
                                    : "hover:bg-[#1f2937]/50 hover:text-white"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-[#d4af37]" : "text-gray-400")} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-800">
                <form action={async () => { await signOut(); }}>
                    <button
                        type="submit"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                        Déconnexion
                    </button>
                </form>
            </div>
        </div>
    );
}
