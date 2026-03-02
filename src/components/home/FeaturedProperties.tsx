"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BedDouble, Bath, SquareMenu, ArrowRight } from "lucide-react";

interface FeaturedPropertiesProps {
    properties: any[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
    const featured = properties;

    return (
        <section className="py-32 bg-gray-50 relative overflow-hidden">
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
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Notre Sélection</span>
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-6 leading-tight">Propriétés <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">d&apos;Exception</span></h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/proprietes"
                            className="group flex items-center gap-3 text-primary font-semibold border-b-2 border-primary/20 pb-2 hover:text-accent hover:border-accent transition-all uppercase tracking-widest text-sm"
                        >
                            Voir tout le catalogue
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                    {featured.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: index * 0.15 }}
                            className="relative group rounded-[32px] overflow-hidden h-[420px] sm:h-[450px] md:h-[500px] cursor-pointer shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-700 flex flex-col justify-end"
                        >
                            <Link href={`/proprietes/${property.id}`} className="absolute inset-0 z-0">
                                <span className="sr-only">Voir {property.title}</span>
                            </Link>

                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 pointer-events-none"
                                style={{ backgroundImage: `url('${property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent transition-opacity duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" />

                            <div className="absolute top-6 left-6 right-6 flex justify-between z-10 pointer-events-none">
                                <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-sm border border-white/10 ${property.status === 'Nouveau' ? 'bg-accent/90' :
                                    property.status === 'Vendu' ? 'bg-red-800/90' : 'bg-primary/80'
                                    }`}>
                                    {property.status || 'Nouveau'}
                                </span>
                                <span className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md bg-black/40 border border-white/20 shadow-sm">
                                    {property.type === 'Vente' ? 'À Vendre' : 'À Louer'}
                                </span>
                            </div>

                            <div className="relative p-6 md:p-8 z-10 text-white transform md:translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pb-8 md:pb-10">
                                <div className="overflow-hidden mb-3">
                                    <Link href={`/proprietes/${property.id}`} className="hover:text-accent transition-colors">
                                        <h3 className="font-serif text-2xl md:text-3xl leading-tight translate-y-0">{property.title}</h3>
                                    </Link>
                                </div>
                                <p className="text-gray-300 text-xs md:text-sm font-light mb-6 md:mb-8 flex items-center gap-2 uppercase tracking-wider">
                                    <span className="w-4 md:w-6 h-[1px] bg-accent inline-block" /> {property.location}
                                </p>

                                <div className="flex flex-wrap items-end justify-between pt-5 md:pt-6 border-t border-white/20 relative opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity duration-700 gap-4">
                                    <div>
                                        <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Prix demandé</p>
                                        <p className="font-serif text-2xl md:text-3xl text-accent">{Number(property.price || 0).toLocaleString('fr-FR')} DH</p>
                                    </div>

                                    <div className="flex items-center gap-5 text-sm font-medium bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md border border-white/10">
                                        <div className="flex items-center gap-2">
                                            <BedDouble className="w-4 h-4 text-white/70" />
                                            <span>{property.features?.beds || property.bedrooms || '?'}</span>
                                        </div>
                                        <div className="w-px h-4 bg-white/20"></div>
                                        <div className="flex items-center gap-2">
                                            <SquareMenu className="w-4 h-4 text-white/70" />
                                            <span>{property.features?.area || property.surface || '?'} m²</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
