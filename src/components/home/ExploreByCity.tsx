"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const neighborhoods = [
    {
        name: "Anfa Supérieur",
        image: "/images/neighborhoods/anfa.png",
        properties: "12",
        colSpan: "md:col-span-2 md:row-span-2"
    },
    {
        name: "Bouskoura",
        image: "/images/neighborhoods/bouskoura.png",
        properties: "8",
        colSpan: "col-span-1 row-span-1"
    },
    {
        name: "Gauthier / Racine",
        image: "/images/neighborhoods/gauthier.png",
        properties: "15",
        colSpan: "col-span-1 row-span-1"
    },
    {
        name: "Dar Bouazza",
        image: "/images/neighborhoods/darbouazza.png",
        properties: "10",
        colSpan: "md:col-span-2 row-span-1"
    }
];

export function ExploreByCity() {
    return (
        <section className="py-32 bg-primary text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Explorer par Quartier</span>
                        </span>

                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-light">
                            L&apos;Excellence <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover font-normal">Casablancaise</span>
                        </h2>

                        <p className="text-gray-400 text-base md:text-lg lg:text-xl font-light leading-relaxed px-4">
                            Découvrez nos propriétés exclusives dans les quartiers les plus prisés de la métropole.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-rows-[auto_auto] gap-4 md:gap-6 md:h-[700px]">
                    {neighborhoods.map((ns, index) => (
                        <motion.div
                            key={ns.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.15 }}
                            className={`relative overflow-hidden group rounded-[32px] ${ns.colSpan} min-h-[300px] border border-white/10`}
                        >
                            <Link href={`/proprietes?quartier=${encodeURIComponent(ns.name)}`} className="absolute inset-0 block">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                                    style={{ backgroundImage: `url('${ns.image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 group-hover:opacity-80" />

                                <div className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:-translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 border border-white/20">
                                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>

                                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 transform md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-accent text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 md:mb-2 opacity-100 md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">{ns.properties} Propriétés</p>
                                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-1 text-white drop-shadow-lg">{ns.name}</h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
