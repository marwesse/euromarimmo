"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WhatsAppFAB() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;
    const whatsappMessage = "Bonjour EUROMAR IMMO,\n\nJe suis intéressé(e) par vos propriétés.";
    const whatsappUrl = `https://wa.me/212600692922?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 flex items-center justify-start group">
            {/* Tooltip (Visible on hover on Desktop) */}
            <div className="hidden md:block absolute left-20 bg-gray-900/90 text-white text-sm font-medium px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-sm border border-white/10 shadow-xl hidden md:group-hover:block">
                Contactez-nous
                {/* Tooltip Arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-gray-900/90 rotate-45 border-b border-l border-white/10"></div>
            </div>

            <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#075E54] text-white shadow-2xl shadow-green-900/30 hover:scale-110 transition-transform duration-300"
            >
                {/* Pulse Animation Ring */}
                <span className="absolute inset-0 rounded-full border-2 border-[#075E54]/50 animate-ping opacity-75"></span>
                <span className="absolute inset-0 rounded-full border-2 border-[#075E54]/30 animate-pulse"></span>

                {/* Glassmorphism subtle inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />

                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 relative z-10" />
            </Link>
        </div>
    );
}
