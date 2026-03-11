"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export function Footer({ logoUrl }: { logoUrl?: string }) {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Colonne 1 : La Marque */}
                    <div>
                        <Link href="/" className="inline-block mb-6 group">
                            <h2 className="text-2xl font-light tracking-widest text-white group-hover:text-white/90 transition-colors">
                                EUROMAR IMMO
                            </h2>
                            <p className="text-xs tracking-widest text-[#D4AF37] mt-1 font-serif uppercase">
                                Immobilier de Luxe
                            </p>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            L'excellence immobilière à Casablanca. Nous accompagnons une clientèle exigeante dans l'acquisition de propriétés d'exception.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-zinc-400 hover:text-[#D4AF37] transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61580664440205" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#D4AF37] transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-zinc-400 hover:text-[#D4AF37] transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2 : Découvrir */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Découvrir</h3>
                        <div className="flex flex-col">
                            <Link href="/proprietes?type=Villa" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">Villas</Link>
                            <Link href="/proprietes?type=Penthouse" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">Penthouses</Link>
                            <Link href="/proprietes?type=Off-Market" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">Off-Market</Link>
                            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">Estimation</Link>
                        </div>
                    </div>

                    {/* Colonne 3 : L'Agence */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">L'Agence</h3>
                        <div className="flex flex-col">
                            <Link href="/services" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">À propos</Link>
                            <Link href="/services" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">Notre Équipe</Link>
                            <Link href="/services" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">Conciergerie VIP</Link>
                            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors block mb-3 text-sm w-fit">Contact</Link>
                        </div>
                    </div>

                    {/* Colonne 4 : Contact VIP & Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Contactez-Nous</h3>

                        <div className="flex flex-col space-y-4 mb-8">
                            <a href="mailto:support@euromarimmo.com" className="flex items-center gap-3 text-zinc-400 group w-fit">
                                <Mail className="w-5 h-5 text-[#D4AF37]" />
                                <span className="font-medium group-hover:text-[#D4AF37] transition-colors text-sm">support@euromarimmo.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-zinc-400">
                                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                                <span className="text-sm">Casablanca, Maroc</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Rejoignez le Cercle Privé</p>
                            <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="bg-white/5 border-b border-white/20 px-0 py-2 w-full text-sm focus:outline-none focus:border-[#D4AF37] text-white placeholder:text-zinc-600 transition-colors"
                                />
                                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-white transition-colors text-sm font-medium px-2 pb-1">
                                    S'inscrire
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Copyright / Bottom Bar */}
                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-500 text-xs">
                        &copy; 2026 EUROMAR IMMO. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/legal" className="text-zinc-500 hover:text-white text-xs transition-colors">Mentions Légales</Link>
                        <Link href="/privacy" className="text-zinc-500 hover:text-white text-xs transition-colors">Politique de Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
