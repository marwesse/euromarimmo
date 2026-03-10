"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MinusCircle, MapPin, BedDouble, Bath, SquareMenu } from "lucide-react";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { useCurrency } from "@/context/CurrencyContext";

const ALL_AMENITIES = [
    "Piscine",
    "Jardin",
    "Garage",
    "Sécurité 24/7",
    "Vue Mer",
    "Climatisation Centrale",
    "Cheminée",
    "Terrasse",
    "Chambre de personnel",
    "Ascenseur privatif"
];

export function CompareModal() {
    const { selectedProperties, isComparing, setIsComparing, removeProperty } = useCompare();
    const { formatPrice } = useCurrency();

    if (!isComparing || selectedProperties.length === 0) return null;

    const parsePrice = (price: string | number | undefined): number => {
        if (!price) return 0;
        if (typeof price === 'number') return price;
        return Number(price.replace(/[^0-9.-]+/g, ""));
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 md:p-8"
                onClick={() => setIsComparing(false)}
            >
                <div
                    className="bg-white dark:bg-[#0f131a] w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative border border-gray-100 dark:border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 sm:p-6 md:p-8 border-b border-gray-100 dark:border-white/10 shrink-0">
                        <div>
                            <span className="text-secondary font-semibold uppercase tracking-widest text-xs mb-1 block">Analyse Experte</span>
                            <h2 className="font-serif text-2xl md:text-3xl text-primary dark:text-white">Comparaison de Biens</h2>
                        </div>
                        <button
                            onClick={() => setIsComparing(false)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content (Scrollable Table) */}
                    <div className="overflow-auto flex-grow p-4 sm:p-6 md:p-8 custom-scrollbar">
                        <div className="min-w-[800px]">
                            {/* Images & Basic Info */}
                            <div className="grid border-b border-gray-100 dark:border-white/10 pb-8" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                <div className="pr-4 flex items-end pb-4 font-serif text-gray-400">
                                    Aperçu
                                </div>
                                {selectedProperties.map(property => (
                                    <div key={property.id} className="px-4 border-l border-gray-100 dark:border-white/10 relative group">
                                        <button
                                            onClick={() => removeProperty(property.id)}
                                            className="absolute top-2 right-6 bg-white/80 hover:bg-red-500 text-gray-500 hover:text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10 backdrop-blur-sm shadow-sm"
                                            title="Retirer"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-md">
                                            <Image
                                                src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=60'}
                                                alt={property.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                                <h3 className="font-serif text-lg leading-tight line-clamp-2 drop-shadow-md">{property.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Details Rows */}
                            <div className="flex flex-col">
                                {/* Prix Actuel */}
                                <div className="grid py-6 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                    <div className="pr-4 font-medium text-gray-500 dark:text-gray-400 flex items-center">Prix demandé</div>
                                    {selectedProperties.map(property => (
                                        <div key={property.id} className="px-4 border-l border-gray-50 dark:border-white/5 font-serif text-2xl text-primary dark:text-white flex items-center">
                                            {formatPrice(property.priceNumeric || property.price)}
                                        </div>
                                    ))}
                                </div>

                                {/* Localisation */}
                                <div className="grid py-6 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                    <div className="pr-4 font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2"><MapPin className="w-4 h-4" /> Quartier</div>
                                    {selectedProperties.map(property => (
                                        <div key={property.id} className="px-4 border-l border-gray-50 dark:border-white/5 text-gray-700 dark:text-gray-300 flex items-center font-medium">
                                            {property.location}
                                        </div>
                                    ))}
                                </div>

                                {/* Surface */}
                                <div className="grid py-6 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                    <div className="pr-4 font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2"><SquareMenu className="w-4 h-4" /> Surface (m²)</div>
                                    {selectedProperties.map(property => {
                                        const area = property.surface || property.features?.area || 0;
                                        return (
                                            <div key={property.id} className="px-4 border-l border-gray-50 dark:border-white/5 text-gray-700 dark:text-gray-300 flex items-center">
                                                {area > 0 ? <span className="font-semibold text-lg">{area} m²</span> : <span className="text-gray-400 italic">Non spécifié</span>}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Prix / m² */}
                                <div className="grid py-6 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                    <div className="pr-4 font-medium text-gray-500 dark:text-gray-400 flex items-center">Prix au m²</div>
                                    {selectedProperties.map(property => {
                                        const area = property.surface || property.features?.area || 0;
                                        const priceValue = parsePrice(property.priceNumeric || property.price);
                                        const pricePerSqm = (area > 0 && priceValue > 0) ? Math.round(priceValue / area) : 0;
                                        return (
                                            <div key={property.id} className="px-4 border-l border-gray-50 dark:border-white/5 text-secondary font-medium flex items-center">
                                                {pricePerSqm > 0 ? `${new Intl.NumberFormat('fr-MA').format(pricePerSqm)} MAD/m²` : <span className="text-gray-400 text-sm italic">N/A</span>}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Chambres */}
                                <div className="grid py-6 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                    <div className="pr-4 font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2"><BedDouble className="w-4 h-4" /> Chambres</div>
                                    {selectedProperties.map(property => (
                                        <div key={property.id} className="px-4 border-l border-gray-50 dark:border-white/5 text-gray-700 dark:text-gray-300 flex items-center text-lg">
                                            {property.bedrooms || property.features?.beds || '-'}
                                        </div>
                                    ))}
                                </div>

                                {/* Salles de bain */}
                                <div className="grid py-6 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                    <div className="pr-4 font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2"><Bath className="w-4 h-4" /> Salles de bain</div>
                                    {selectedProperties.map(property => (
                                        <div key={property.id} className="px-4 border-l border-gray-50 dark:border-white/5 text-gray-700 dark:text-gray-300 flex items-center text-lg">
                                            {property.bathrooms || property.features?.baths || '-'}
                                        </div>
                                    ))}
                                </div>

                                {/* Commodités (Amenities) */}
                                <div className="pt-8 pb-4">
                                    <span className="font-serif text-xl text-primary dark:text-white">Prestations & Commodités</span>
                                </div>
                                {ALL_AMENITIES.map(amenity => (
                                    <div key={amenity} className="grid py-4 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, minmax(0, 1fr))` }}>
                                        <div className="pr-4 text-sm text-gray-600 dark:text-gray-400 flex items-center">{amenity}</div>
                                        {selectedProperties.map(property => {
                                            // Mock check: in a real scenario, this would check the property's specific amenities array.
                                            // Since we have limited mock data, we will randomly assign some or use title matching for demonstration.
                                            const hasAmenity = property.amenities?.includes(amenity) || (
                                                (amenity === "Piscine" && property.title.toLowerCase().includes("piscine")) ||
                                                (amenity === "Vue Mer" && property.title.toLowerCase().includes("mer")) ||
                                                (amenity === "Terrasse" && property.title.toLowerCase().includes("terrasse")) ||
                                                (property.id.toString().charCodeAt(0) % 2 === 0 && Math.random() > 0.3) // Faux check if not explicitly set
                                            );
                                            return (
                                                <div key={property.id} className="px-4 border-l border-gray-50 dark:border-white/5 flex items-center justify-center bg-gray-50/10">
                                                    {hasAmenity ? (
                                                        <CheckCircle2 className="w-5 h-5 text-accent" />
                                                    ) : (
                                                        <MinusCircle className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
