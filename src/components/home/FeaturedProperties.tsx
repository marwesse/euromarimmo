"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, SquareMenu, MapPin, ArrowRight } from "lucide-react";
import { getConsistentViewCount } from "@/utils/socialProof";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCurrency } from "@/context/CurrencyContext";
import { usePathname } from "next/navigation";

interface FeaturedPropertiesProps {
    properties: any[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
    const pathname = usePathname();

    const featured = properties;
    const { formatPrice } = useCurrency();
    const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
        Autoplay({ delay: 10000, stopOnInteraction: false })
    ]);

    return (
        <section className="py-32 bg-gray-50 dark:bg-[#0f131a] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="flex justify-center md:justify-start">
                            <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white dark:bg-white/10 rounded-full border border-gray-100 dark:border-white/10 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-accent"></span>
                                <span className="text-accent font-semibold tracking-widest uppercase text-xs">Notre Sélection</span>
                            </span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-3xl text-primary dark:text-white mb-6 leading-tight text-center md:text-left">
                            Propriétés <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">d&apos;Exception</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center md:justify-end w-full md:w-auto"
                    >
                        <Link
                            href={`/proprietes`}
                            className="group flex items-center gap-3 text-primary dark:text-white font-semibold border-b-2 border-primary/20 dark:border-white/20 pb-2 hover:text-accent dark:hover:text-accent hover:border-accent dark:hover:border-accent transition-all uppercase tracking-widest text-sm"
                        >
                            Voir tout le catalogue
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </motion.div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-8">
                        {featured.map((property, index) => (
                            <div key={property.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] pl-8">
                                <Link
                                    href={`/proprietes/${property.id}`}
                                    className="group relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer block shadow-lg hover:shadow-2xl transition-all duration-700"
                                >
                                    {/* Image & Overlay */}
                                    <Image
                                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}
                                        alt={property.title || 'Propriété'}
                                        fill
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                                    {/* Glassmorphism Price */}
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-xl z-10">
                                        {formatPrice(property.priceNumeric || property.price)} {property.transactiontype === 'Location' ? '/ nuit' : ''}
                                    </div>

                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
                                        {property.type || property.transactiontype || 'Propriété'}
                                    </div>

                                    {/* Cinematic Reveal Details */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col justify-end z-10">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 truncate group-hover:text-[#D4AF37] transition-colors">
                                            {property.title}
                                        </h3>

                                        <div className="text-zinc-300 text-sm mb-4 flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {property.location}
                                        </div>

                                        {/* Slide-Up Features Bar */}
                                        <div className="opacity-100 h-auto translate-y-0 lg:opacity-0 lg:h-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:h-auto lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
                                            <div className="flex justify-between items-center bg-white/15 backdrop-blur-md border border-white/10 rounded-xl p-3 mt-3 w-full">
                                                <div className="flex gap-4">
                                                    <div className="text-sm font-medium flex items-center gap-2 text-white">
                                                        <BedDouble className="w-4 h-4" />
                                                        <span>{property.features?.beds || property.bedrooms || '?'} Lits</span>
                                                    </div>
                                                    <div className="text-sm font-medium flex items-center gap-2 text-white">
                                                        <SquareMenu className="w-4 h-4" />
                                                        <span>{property.features?.area || property.surface || '?'} m²</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
