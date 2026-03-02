"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Propriétés", href: "/proprietes" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

export function Header({ logoUrl }: { logoUrl?: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    // Determine if we should use transparent header initially
    const isHomepage = pathname === "/";
    const isDarkBgPage = isHomepage || pathname === "/services" || pathname === "/contact" || pathname === "/proprietes";
    const headerDesktopClass = isScrolled || !isDarkBgPage
        ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-white/50 m-4 rounded-full"
        : "bg-transparent mx-4 mt-4";
    const headerMobileClass = isScrolled || !isDarkBgPage
        ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
        : "bg-transparent";

    const textColor = isScrolled || !isDarkBgPage ? "text-primary" : "text-white";
    const logoColor = isScrolled || !isDarkBgPage ? "text-primary" : "text-white";
    const invertLogo = !isScrolled && isDarkBgPage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn("fixed top-0 w-full z-50 transition-all duration-500", "md:px-4", isScrolled ? "md:py-4" : "md:py-6")}>
            {/* Desktop Navbar (Pill shape when scrolled) */}
            <div className={cn("hidden md:block transition-all duration-500 container mx-auto px-6 py-3 relative", headerDesktopClass)}>
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="group flex items-center shrink-0">
                        {logoUrl ? (
                            <img src={logoUrl} alt="EUROMAR IMMO Logo" className={cn("max-h-16 py-1 w-auto object-contain transition-all duration-500", invertLogo ? "filter brightness-0 invert" : "mix-blend-multiply")} />
                        ) : (
                            <h1 className={cn("font-serif text-xl tracking-widest uppercase transition-colors duration-500", logoColor)}>
                                EUROMAR IMMO
                            </h1>
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center justify-center flex-1 gap-1 lg:gap-2 px-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-[13px] tracking-widest uppercase font-semibold relative group overflow-hidden"
                                >
                                    <span className={cn(
                                        "relative z-10 transition-colors duration-300",
                                        textColor,
                                        isActive && !isDarkBgPage ? "text-accent" : "group-hover:text-white/70"
                                    )}>
                                        {link.name}
                                    </span>

                                    {/* Animated Underline */}
                                    <span className={cn(
                                        "absolute bottom-1 left-4 right-4 h-[1px] transform origin-left transition-transform duration-300 ease-out",
                                        isDarkBgPage && !isScrolled ? "bg-white" : "bg-accent",
                                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    )} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Call to action */}
                    <div className="hidden md:flex items-center gap-6 shrink-0">
                        <a href="tel:+212661755716" className={cn("hidden lg:flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors duration-300", textColor)}>
                            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="tracking-wide">+212 661-755716</span>
                        </a>
                        <Link
                            href="/contact"
                            className={cn(
                                "flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 group overflow-hidden relative shadow-sm",
                                isScrolled || !isDarkBgPage
                                    ? "bg-primary text-white hover:shadow-[0_8px_25px_rgba(212,175,55,0.25)] hover:-translate-y-1"
                                    : "bg-white text-primary hover:shadow-[0_8px_25px_rgba(212,175,55,0.25)] hover:-translate-y-1"
                            )}
                        >
                            <span className="absolute inset-0 bg-accent transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full z-0" />
                            <Calendar className={cn("w-4 h-4 z-10 relative transition-colors duration-300", (isScrolled || !isDarkBgPage) ? "text-white" : "text-primary group-hover:text-white")} />
                            <span className={cn("z-10 relative transition-colors duration-300", (isScrolled || !isDarkBgPage) ? "text-white" : "text-primary group-hover:text-white")}>Prendre RDV</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className={cn("md:hidden transition-all duration-500 px-4 py-3 relative z-50", headerMobileClass, isMobileMenuOpen && "bg-transparent border-transparent shadow-none backdrop-blur-none")}>
                <div className="flex items-center justify-between">
                    <Link href="/" className="group flex items-center z-50">
                        {logoUrl ? (
                            <img src={logoUrl} alt="EUROMAR IMMO Logo" className={cn("max-h-12 w-auto object-contain transition-all duration-500", (invertLogo || isMobileMenuOpen) ? "filter brightness-0 invert" : "mix-blend-multiply")} />
                        ) : (
                            <h1 className={cn("font-serif text-lg tracking-widest uppercase transition-colors duration-500", isMobileMenuOpen ? "text-white" : (isScrolled || !isDarkBgPage ? "text-primary" : "text-white"))}>
                                EUROMAR IMMO
                            </h1>
                        )}
                    </Link>

                    <button
                        className={cn("p-2 rounded-full transition-colors z-50 relative", isMobileMenuOpen ? "text-white hover:bg-white/10" : cn(textColor, !isScrolled && isDarkBgPage ? "bg-white/10 backdrop-blur-md" : "hover:bg-black/5 backdrop-blur-md"))}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden fixed inset-0 z-40 bg-[#0f172a]/95 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

                        <div className="flex flex-col items-center w-full max-w-sm mt-12 gap-8 z-10">
                            <div className="flex flex-col items-center gap-6 w-full">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                                        className="overflow-hidden"
                                    >
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "block text-3xl font-serif text-center transition-all duration-300",
                                                pathname === link.href ? "text-accent" : "text-white/80 hover:text-white hover:scale-105"
                                            )}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: navLinks.length * 0.1 + 0.3, ease: "easeOut" }}
                                className="w-full h-px bg-white/10"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: navLinks.length * 0.1 + 0.4, ease: "easeOut" }}
                                className="flex flex-col items-center gap-6 w-full"
                            >
                                <a href="tel:+212661755716" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                        <Phone className="w-5 h-5 text-accent" />
                                    </div>
                                    <span className="text-lg font-light tracking-wide">+212 661-755716</span>
                                </a>
                                <Link
                                    href="/contact"
                                    className="w-full bg-accent text-white hover:bg-white hover:text-primary text-center py-4 rounded-full font-semibold tracking-widest uppercase text-sm shadow-[0_8px_20px_rgba(212,175,55,0.3)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Prendre Rendez-vous
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
