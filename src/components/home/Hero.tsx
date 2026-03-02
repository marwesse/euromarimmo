"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function Hero() {
    const router = useRouter();
    const [transactionType, setTransactionType] = useState<'Acheter' | 'Louer'>('Acheter');
    const [location, setLocation] = useState("Tous les quartiers");
    const [propertyType, setPropertyType] = useState("Tous");

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
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3540&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
                <motion.h1
                    className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight max-w-4xl drop-shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    Découvrez l&apos;Exception. <br />
                    <span className="text-white/90">Vivez l&apos;Exclusivité.</span>
                </motion.h1>

                <motion.p
                    className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl font-light tracking-wide"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    Accédez à une sélection confidentielle des plus belles demeures de Casablanca. De l&apos;effervescence d&apos;Anfa Supérieur à la sérénité de Dar Bouazza.
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
                                className={`px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${transactionType === 'Acheter' ? 'bg-white text-primary shadow-md' : 'text-white hover:text-white/80'}`}
                            >
                                Acheter
                            </button>
                            <button
                                onClick={() => setTransactionType('Louer')}
                                className={`px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${transactionType === 'Louer' ? 'bg-white text-primary shadow-md' : 'text-white hover:text-white/80'}`}
                            >
                                Louer
                            </button>
                        </div>
                    </div>

                    {/* Search Inputs */}
                    <div className="glass w-full p-4 rounded-xl flex flex-col md:flex-row gap-4 lg:gap-6 shadow-2xl items-center md:items-end">
                        <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200/50 flex flex-col items-center md:items-start">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 text-center md:text-left">Localisation</label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-transparent text-primary font-medium focus:outline-none appearance-none cursor-pointer text-center md:text-left"
                            >
                                <option value="Tous les quartiers">Tous les quartiers</option>
                                <option value="Anfa Supérieur">Anfa Supérieur</option>
                                <option value="Maarif / Gauthier">Maarif / Gauthier</option>
                                <option value="Bourgogne / Racine">Bourgogne / Racine</option>
                                <option value="Californie">Californie</option>
                                <option value="Bouskoura">Bouskoura</option>
                                <option value="Dar Bouazza">Dar Bouazza</option>
                                <option value="Palmier">Palmier</option>
                                <option value="France Ville">France Ville</option>
                                <option value="Les Hôpitaux">Les Hôpitaux</option>
                                <option value="Les Princesses">Les Princesses</option>
                                <option value="Ciel">Ciel</option>
                                <option value="CFC">CFC</option>
                                <option value="Abdelmoumen">Abdelmoumen</option>
                                <option value="Ghandi">Ghandi</option>
                                <option value="Maarif">Maarif</option>
                                <option value="Anoual">Anoual</option>
                                <option value="2 Mars">2 Mars</option>
                                <option value="Ferme Bretonne">Ferme Bretonne</option>
                                <option value="Route d'El Jadida">Route d'El Jadida</option>
                                <option value="La Corniche">La Corniche</option>
                                <option value="Marina">Marina</option>
                                <option value="Casa Port">Casa Port</option>
                                <option value="Zenata">Zenata</option>
                                <option value="Ain Diab">Ain Diab</option>
                                <option value="Belvédère">Belvédère</option>
                            </select>
                        </div>

                        <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200/50 flex flex-col items-center md:items-start">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 text-center md:text-left">Type de Bien</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full bg-transparent text-primary font-medium focus:outline-none appearance-none cursor-pointer text-center md:text-left"
                            >
                                <option value="Tous">Tous les types</option>
                                <option value="Villa">Villa</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Appartement de Luxe">Appartement de Luxe</option>
                                <option value="Duplex">Duplex</option>
                            </select>
                        </div>

                        <div className="flex-1 w-full px-4 py-2 flex flex-col items-center md:items-start">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 text-center md:text-left">Budget</label>
                            <select className="w-full bg-transparent text-primary font-medium focus:outline-none appearance-none cursor-pointer text-center md:text-left">
                                <option>Budget Maximum</option>
                                <option>5M - 10M DH</option>
                                <option>10M - 20M DH</option>
                                <option>20M+ DH</option>
                            </select>
                        </div>

                        <button
                            onClick={handleSearch}
                            className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full md:w-auto mt-4 md:mt-0 shadow-lg"
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
