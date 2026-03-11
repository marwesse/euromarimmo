"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Home, Banknote, ArrowRightLeft } from "lucide-react";

export function Hero() {
    const router = useRouter();
    const [transactionType, setTransactionType] = useState<'Acheter' | 'Louer'>('Acheter');
    const [location, setLocation] = useState("Tous les quartiers");
    const [propertyType, setPropertyType] = useState("Tous");
    const [budgetAchat, setBudgetAchat] = useState("Budget Maximum");
    const [budgetLoc, setBudgetLoc] = useState("Budget Maximum");

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (location !== "Tous les quartiers") {
            params.set('ville', location);
        }
        if (propertyType !== "Tous") {
            params.set('type', propertyType);
        }

        const maxPrice = transactionType === 'Acheter' ? budgetAchat : budgetLoc;
        if (maxPrice !== "Budget Maximum") {
            params.set('prix', maxPrice);
        }

        router.push(`/proprietes?${params.toString()}`);
    };
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full min-h-screen"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2500&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center pt-32 sm:pt-40 md:pt-48">
                <motion.h1
                    className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] text-white mb-4 md:mb-6 leading-[1.1] max-w-[95%] sm:max-w-3xl md:max-w-4xl drop-shadow-xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="block font-light text-white tracking-tight">EUROMAR IMMO</span>
                    <span className="block font-medium mt-2 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Agence Immobilière de Luxe à Casablanca</span>
                </motion.h1>

                <motion.p
                    className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-[95%] sm:max-w-2xl md:max-w-3xl font-light tracking-wide leading-relaxed mx-auto drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    Notre sélection exclusive de demeures de prestige.
                    <span className="block text-white text-[10px] sm:text-xs md:text-sm lg:text-base mt-3 md:mt-4 font-normal tracking-[0.2em] uppercase">
                        D&apos;Anfa Supérieur à Dar Bouazza
                    </span>
                </motion.p>

                {/* 4. The Overlapping Dark Bar (La Barre Royale) */}
                <div className="relative z-30 mx-auto w-[92%] -mt-12 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 md:-mt-0 md:w-[90%] md:max-w-7xl">
                    <div className="w-full bg-[#0a0a0a] border border-white/5 shadow-2xl md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] rounded-xl flex flex-col md:flex-row items-center p-4 md:p-6 divide-y md:divide-y-0 md:divide-x divide-white/5">

                        {/* Transaction */}
                        <div className="flex-1 w-full px-4 md:px-6 py-4 md:py-2">
                            <label className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest mb-2 block font-medium">Projet</label>
                            <div className="flex items-center gap-3">
                                <ArrowRightLeft className="w-5 h-5 text-[#D4AF37] shrink-0" />
                                <select
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value as 'Acheter' | 'Louer')}
                                    className="bg-transparent text-white font-medium focus:outline-none w-full cursor-pointer flex-1 text-base sm:text-lg appearance-none"
                                >
                                    <option value="Acheter" className="bg-neutral-900 text-white">Acheter</option>
                                    <option value="Louer" className="bg-neutral-900 text-white">Louer</option>
                                </select>
                            </div>
                        </div>

                        {/* Ville */}
                        <div className="flex-1 w-full px-4 md:px-6 py-4 md:py-2">
                            <label className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest mb-2 block font-medium">Ville</label>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="bg-transparent text-white font-medium focus:outline-none w-full cursor-pointer flex-1 text-base sm:text-lg appearance-none"
                                >
                                    {[
                                        "Tous les quartiers", "Palmier", "France ville", "Les Hôpitaux",
                                        "Les Princesses", "Ciel", "CFC", "Abdelmouman", "Ghandi",
                                        "Maarif", "Anoual", "2 Mars", "Ferme Bretonne", "Route El Jadida",
                                        "La Corniche", "Marina", "Casa Port", "Zenata", "Ain Diab", "Belvédère"
                                    ].map(opt => (
                                        <option key={opt} value={opt} className="bg-neutral-900 text-white">{opt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Type */}
                        <div className="flex-1 w-full px-4 md:px-6 py-4 md:py-2">
                            <label className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest mb-2 block font-medium">Type de bien</label>
                            <div className="flex items-center gap-3">
                                <Home className="w-5 h-5 text-[#D4AF37] shrink-0" />
                                <select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="bg-transparent text-white font-medium focus:outline-none w-full cursor-pointer flex-1 text-base sm:text-lg appearance-none"
                                >
                                    {[
                                        { value: "Tous", label: "Tous les types" },
                                        { value: "Studio", label: "Studio" },
                                        { value: "Villa", label: "Villa" },
                                        { value: "Penthouse", label: "Penthouse" },
                                        { value: "Appartement de Luxe", label: "Appartement de Luxe" },
                                        { value: "Duplex", label: "Duplex" }
                                    ].map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="flex-1 w-full px-4 md:px-6 py-4 md:py-2">
                            <label className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest mb-2 block font-medium">Budget max</label>
                            <div className="flex items-center gap-3">
                                <Banknote className="w-5 h-5 text-[#D4AF37] shrink-0" />
                                {transactionType === 'Acheter' ? (
                                    <select
                                        value={budgetAchat}
                                        onChange={(e) => setBudgetAchat(e.target.value)}
                                        className="bg-transparent text-white font-medium focus:outline-none w-full cursor-pointer flex-1 text-base sm:text-lg appearance-none"
                                    >
                                        {["Budget Maximum", "5M - 10M DH", "10M - 20M DH", "20M+ DH"].map(opt => (
                                            <option key={opt} value={opt} className="bg-neutral-900 text-white">{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <select
                                        value={budgetLoc}
                                        onChange={(e) => setBudgetLoc(e.target.value)}
                                        className="bg-transparent text-white font-medium focus:outline-none w-full cursor-pointer flex-1 text-base sm:text-lg appearance-none"
                                    >
                                        {["Budget Maximum", "400 - 800 DH", "800 - 1400 DH"].map(opt => (
                                            <option key={opt} value={opt} className="bg-neutral-900 text-white">{opt}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="w-full md:w-auto px-4 md:px-6 py-6 md:py-0 shrink-0">
                            <button
                                onClick={handleSearch}
                                className="w-full md:w-auto bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-neutral-950 px-8 py-5 font-bold uppercase tracking-widest text-sm hover:scale-[1.02] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all rounded flex items-center justify-center gap-3"
                            >
                                <Search className="w-5 h-5 text-neutral-950" />
                                Rechercher
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
