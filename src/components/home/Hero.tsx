"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { LuxurySelect } from "@/components/ui/LuxurySelect";

export function Hero() {
    const router = useRouter();
    const [transactionType, setTransactionType] = useState<'Acheter' | 'Louer'>('Acheter');
    const [location, setLocation] = useState("Tous les quartiers");
    const [propertyType, setPropertyType] = useState("Tous");
    const [budgetAchat, setBudgetAchat] = useState("Budget Maximum");
    const [budgetLoc, setBudgetLoc] = useState("Budget Maximum");

    const handleSearch = () => {
        const params = new URLSearchParams();
        const transactionValue = transactionType === 'Acheter' ? 'Vente' : 'Location';
        params.set('transaction', transactionValue);

        if (location !== "Tous les quartiers") {
            params.set('quartier', location);
        }
        if (propertyType !== "Tous") {
            params.set('type', propertyType);
        }

        router.push(`/proprietes?${params.toString()}`);
    };
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
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
                    <span className="block font-light text-white tracking-tight">L&apos;Élégance</span>
                    <span className="block font-medium mt-2 md:mt-4">à Casablanca.</span>
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

                {/* Search Bar Container */}
                <motion.div
                    className="w-full max-w-4xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                    {/* Toggle Switch */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-black/30 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-lg border border-white/10">
                            <button
                                onClick={() => setTransactionType('Acheter')}
                                className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[13px] md:text-sm font-bold tracking-wide transition-all duration-300 ${transactionType === 'Acheter' ? 'bg-white text-primary shadow-md' : 'text-white hover:text-white/80'}`}
                            >
                                Acheter
                            </button>
                            <button
                                onClick={() => setTransactionType('Louer')}
                                className={`px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[13px] md:text-sm font-bold tracking-wide transition-all duration-300 ${transactionType === 'Louer' ? 'bg-white text-primary shadow-md' : 'text-white hover:text-white/80'}`}
                            >
                                Louer
                            </button>
                        </div>
                    </div>

                    {/* Search Inputs */}
                    <div className="glass w-full p-3 md:p-4 rounded-2xl flex flex-col md:flex-row gap-3 lg:gap-6 shadow-2xl items-center md:items-end border border-white/20">
                        <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200/50 flex flex-col items-center md:items-start group">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1 text-center md:text-left transition-colors group-focus-within:text-accent">Localisation</label>
                            <LuxurySelect
                                value={location}
                                onChange={setLocation}
                                direction="up"
                                options={[
                                    "Tous les quartiers", "Palmier", "France ville", "Les Hôpitaux",
                                    "Les Princesses", "Ciel", "CFC", "Abdelmouman", "Ghandi",
                                    "Maarif", "Anoual", "2 Mars", "Ferme Bretonne", "Route El Jadida",
                                    "La Corniche", "Marina", "Casa Port", "Zenata", "Ain Diab", "Belvédère"
                                ]}
                                buttonClassName="w-full bg-transparent text-primary dark:text-white font-serif md:font-medium focus:outline-none cursor-pointer text-center md:text-left text-lg md:text-base py-1"
                            />
                        </div>

                        <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200/50 flex flex-col items-center md:items-start group">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1 text-center md:text-left transition-colors group-focus-within:text-accent">Type de Bien</label>
                            <LuxurySelect
                                value={propertyType}
                                onChange={setPropertyType}
                                direction="up"
                                options={[
                                    { value: "Tous", label: "Tous les types" },
                                    "Studio", "Villa", "Penthouse", "Appartement de Luxe", "Duplex"
                                ]}
                                buttonClassName="w-full bg-transparent text-primary dark:text-white font-serif md:font-medium focus:outline-none cursor-pointer text-center md:text-left text-lg md:text-base py-1"
                            />
                        </div>

                        <div className="flex-1 w-full px-4 py-2 flex flex-col items-center md:items-start group">
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1 text-center md:text-left transition-colors group-focus-within:text-accent">Budget</label>
                            {transactionType === 'Acheter' ? (
                                <LuxurySelect
                                    value={budgetAchat}
                                    onChange={setBudgetAchat}
                                    direction="up"
                                    options={["Budget Maximum", "5M - 10M DH", "10M - 20M DH", "20M+ DH"]}
                                    buttonClassName="w-full bg-transparent text-primary dark:text-white font-serif md:font-medium focus:outline-none cursor-pointer text-center md:text-left text-lg md:text-base py-1"
                                />
                            ) : (
                                <LuxurySelect
                                    value={budgetLoc}
                                    onChange={setBudgetLoc}
                                    direction="up"
                                    options={["Budget Maximum", "400 - 800 DH", "800 - 1400 DH"]}
                                    buttonClassName="w-full bg-transparent text-primary dark:text-white font-serif md:font-medium focus:outline-none cursor-pointer text-center md:text-left text-lg md:text-base py-1"
                                />
                            )}
                        </div>

                        <button
                            onClick={handleSearch}
                            className="bg-accent hover:bg-accent-hover text-white px-8 py-3.5 md:py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 w-full md:w-auto mt-2 md:mt-0 shadow-lg min-h-[44px]"
                        >
                            <Search className="w-5 h-5" />
                            <span className="md:hidden">Rechercher</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
