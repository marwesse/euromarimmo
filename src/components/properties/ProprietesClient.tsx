"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BedDouble, Bath, SquareMenu, Filter, ChevronDown, MapPin, ArrowRight } from "lucide-react";

const filterTypes = ["Tous", "Studio", "Villa", "Penthouse", "Appartement de Luxe", "Duplex"];
const locations = [
    "Tous les quartiers", "Palmier", "France ville", "Les Hôpitaux", "Les Princesses", "Ciel", "CFC",
    "Abdelmouman", "Ghandi", "Maarif", "Anoual", "2 Mars", "Ferme Bretonne", "Route El Jadida",
    "La Corniche", "Marina", "Casa Port", "Zenata", "Ain Diab", "Belvédère"
];

export function ProprietesClient({ properties }: { properties: any[] }) {
    const searchParams = useSearchParams();

    const [activeFilter, setActiveFilter] = useState("Tous");
    const [transactionFilter, setTransactionFilter] = useState("Tous");
    const [locationFilter, setLocationFilter] = useState("Tous les quartiers");

    useEffect(() => {
        const typeParam = searchParams.get('type');
        const transactionParam = searchParams.get('transaction');
        const quartierParam = searchParams.get('quartier');

        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (typeParam) setActiveFilter(typeParam);
         
        if (transactionParam) setTransactionFilter(transactionParam);
         
        if (quartierParam) setLocationFilter(quartierParam);
    }, [searchParams]);

    const filteredProperties = properties.filter(p => {
        const matchType = activeFilter === "Tous" || p.type === activeFilter;
        const matchTransaction = transactionFilter === "Tous" || p.type === transactionFilter;
        // Adjust for Supabase fields vs Mock Data fields
        const matchLocation = locationFilter === "Tous les quartiers" || p.location?.includes(locationFilter);

        return matchType && matchTransaction && matchLocation;
    });

    return (
        <div className="pb-20 min-h-screen bg-bg-offwhite">

            {/* Header */}
            <div className="bg-primary text-white pt-36 pb-16 mb-12">
                <div className="container mx-auto px-4 md:px-8">
                    <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 block">Notre Catalogue</span>
                    <h1 className="font-serif text-4xl md:text-5xl">Propriétés d&apos;Exception</h1>
                    <p className="text-gray-300 mt-4 max-w-2xl text-lg font-light">
                        Êtes-vous sûr de vouloir réinitialiser vos critères de recherche ? L&apos;immobilier d&apos;exception n&apos;attend que vous.
                        De la villa contemporaine les pieds dans l&apos;eau au riad authentique au cœur de la Médina, découvrez la sélection la plus exclusive du Maroc.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8">

                {/* Filtres */}
                <div className="flex flex-col gap-4 mb-12 bg-white p-4 rounded-xl shadow-sm border border-gray-100">

                    {/* Transaction Filter */}
                    <div className="flex items-center gap-3 w-full pb-4 border-b border-gray-100 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-2 text-gray-400 font-medium uppercase tracking-wider text-xs md:text-sm mr-4 shrink-0">
                            <span>Transaction</span>
                        </div>
                        {["Tous", "Vente", "Location"].map(type => (
                            <button
                                key={type}
                                onClick={() => setTransactionFilter(type)}
                                className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${transactionFilter === type
                                    ? "bg-accent text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {type === "Tous" ? "Tout voir" : type === "Vente" ? "À Vendre" : "À Louer"}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                        {/* Type Filter */}
                        <div className="flex items-center gap-4 w-full overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                            <div className="flex items-center gap-2 text-gray-400 font-medium uppercase tracking-wider text-xs md:text-sm shrink-0">
                                <Filter className="w-4 h-4" />
                                <span>Type de Bien</span>
                            </div>
                            <div className="relative flex items-center p-1.5 bg-gray-50/80 rounded-full border border-gray-100 shrink-0">
                                {filterTypes.map(type => {
                                    const isActive = activeFilter === type;
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => setActiveFilter(type)}
                                            className={`relative px-5 py-2.5 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300 shrink-0 ${isActive ? "text-white" : "text-gray-500 hover:text-[#d4af37]"
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeFilter"
                                                    className="absolute inset-0 bg-[#1a202c] rounded-full shadow-md border border-[#d4af37]/30"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">{type}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Location & Count */}
                        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                            <div className="relative w-full sm:w-auto flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                                <MapPin className="w-4 h-4 text-gray-400 absolute left-3" />
                                <select
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="w-full sm:w-auto bg-transparent text-gray-600 font-medium focus:outline-none appearance-none cursor-pointer pl-6 pr-6 py-1 text-sm text-ellipsis"
                                >
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
                            </div>

                            <div className="text-gray-500 font-medium text-sm flex items-center whitespace-nowrap">
                                <span className="text-primary font-bold mr-1">{filteredProperties.length}</span> biens
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grille de Propriétés */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full"
                        >
                            <Link href={`/proprietes/${property.id}`} className="relative h-72 overflow-hidden shrink-0 block">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${property.status === 'Nouveau' ? 'bg-accent' :
                                        property.status === 'Vendu' ? 'bg-red-800' : 'bg-primary/80 backdrop-blur-sm'
                                        }`}>
                                        {property.status || 'Nouveau'}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md bg-black/50 border border-white/20">
                                        {property.type === 'Vente' ? 'À Vendre' : 'À Louer'}
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <p className="text-2xl font-serif mb-1">{Number(property.price || 0).toLocaleString('fr-FR')} DH</p>
                                </div>
                            </Link>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-serif text-xl text-primary mb-2 transition-colors line-clamp-2">
                                    <Link href={`/proprietes/${property.id}`} className="hover:text-accent">
                                        {property.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 mt-auto">{property.location}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-gray-600 text-sm">
                                    <div className="flex items-center gap-2">
                                        <BedDouble className="w-4 h-4 text-accent" />
                                        <span>{property.bedrooms || property.features?.beds || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bath className="w-4 h-4 text-accent" />
                                        <span>{property.bathrooms || property.features?.baths || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <SquareMenu className="w-4 h-4 text-accent" />
                                        <span>{property.surface || property.features?.area || 0} m²</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/proprietes/${property.id}`}
                                        className="relative z-20 w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Plus de détails
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProperties.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500 font-medium text-lg">Aucune propriété ne correspond à ce filtre.</p>
                        <button
                            onClick={() => setActiveFilter("Tous")}
                            className="mt-4 text-accent hover:text-primary font-medium border-b border-accent pb-1 transition-colors"
                        >
                            Afficher toutes les propriétés
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

