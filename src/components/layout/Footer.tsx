"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer({ logoUrl }: { logoUrl?: string }) {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="bg-[#0f172a] text-white pt-24 pb-8 border-t border-white/5 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand & Blurb */}
                    <div className="lg:col-span-4 space-y-8 pr-0 lg:pr-8">
                        <Link href="/" className="inline-block group">
                            {logoUrl ? (
                                <img src={logoUrl} alt="EUROMAR IMMO Logo" className="h-32 w-auto object-contain transition-transform duration-700 group-hover:scale-105 filter brightness-0 invert opacity-90 group-hover:opacity-100" />
                            ) : (
                                <h2 className="font-serif text-3xl tracking-widest uppercase transition-colors group-hover:text-accent">
                                    EUROMARO <span className="text-[#d4af37]">IMMO</span>
                                </h2>
                            )}
                        </Link>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                            L&apos;agence immobilière de référence pour les propriétés de prestige au Maroc. Notre expertise à votre service pour des projets d&apos;exception.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group">
                                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group">
                                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group">
                                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2 space-y-8">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-white/90">Raccourcis</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all text-sm uppercase tracking-wider font-medium">Accueil</Link>
                            </li>
                            <li>
                                <Link href="/proprietes" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all text-sm uppercase tracking-wider font-medium">Notre Catalogue</Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all text-sm uppercase tracking-wider font-medium">Expertise & Services</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-accent hover:translate-x-1 inline-block transition-all text-sm uppercase tracking-wider font-medium">Contactez-nous</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="lg:col-span-3 space-y-8">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-white/90">Contact</h3>
                        <ul className="space-y-6 text-gray-400 text-sm">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 pt-0.5">
                                    <Phone className="w-4 h-4 text-accent" />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <strong className="text-white font-medium uppercase tracking-wider text-xs">Téléphone</strong>
                                    <a href="tel:+212661755716" className="hover:text-accent transition-colors text-base">+212 661-755716</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                    <Mail className="w-4 h-4 text-accent" />
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <strong className="text-white font-medium uppercase tracking-wider text-xs">Email</strong>
                                    <a href="mailto:contact@euromarimmo.ma" className="hover:text-accent transition-colors text-base break-all">contact@euromarimmo.ma</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Locations */}
                    <div className="lg:col-span-3 space-y-8">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-white/90">Notre Bureau</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 pt-0.5">
                                    <MapPin className="w-4 h-4 text-accent" />
                                </div>
                                <div className="flex flex-col gap-1 pt-1 leading-relaxed">
                                    <strong className="block text-white uppercase tracking-wider text-xs mb-1">Siège Social</strong>
                                    91 rue ben radi slaoui <br />ETG 3 APPT 20, <br />Casablanca, Maroc
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-light tracking-wide uppercase">
                    <p>&copy; {new Date().getFullYear()} EUROMAR IMMO. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-accent transition-colors">Mentions Légales</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Politique de Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
