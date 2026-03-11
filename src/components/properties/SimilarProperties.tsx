"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface SimilarPropertiesProps {
    similarProperties: any[];
}

export function SimilarProperties({ similarProperties }: SimilarPropertiesProps) {
    const { formatPrice } = useCurrency();

    if (!similarProperties || similarProperties.length === 0) return null;

    return (
        <div className="w-full bg-[#0a0a0a] py-24 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-light text-white text-center relative">
                    Découvrez Également
                    <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {similarProperties.map((property) => (
                        <Link
                            key={property.id}
                            href={`/proprietes/${property.id}`}
                            className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer block"
                        >
                            {/* Background Image with Cinematic Scale */}
                            <img
                                src={property.images?.[0] || '/images/placeholder.jpg'}
                                alt={property.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                            {/* Top Badge: Type de Bien */}
                            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 z-10">
                                {property.type || property.transactiontype || 'Propriété'}
                            </div>

                            {/* Bottom Info: Title, Price & Invisible Arrow */}
                            <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
                                <h3 className="text-2xl font-semibold text-white mb-2 truncate drop-shadow-lg">
                                    {property.title}
                                </h3>
                                <p className="text-xl text-[#D4AF37] font-bold mb-4 drop-shadow-md">
                                    {formatPrice(property.priceNumeric || property.price || 0)} {property.transactiontype === 'Location' ? '/ nuit' : ''}
                                </p>
                                <div className="flex items-center gap-2 text-white/0 group-hover:text-white transition-colors duration-500 font-medium">
                                    Voir les détails <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
