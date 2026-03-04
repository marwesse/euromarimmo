"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const pillars = [
    {
        title: "Curation Rigoureuse",
        description: "Seuls les biens d'exception, répondant à nos critères stricts d'excellence architecturale et de localisation, intègrent notre portfolio confidentiel."
    },
    {
        title: "Service Gant Blanc",
        description: "Un accompagnement sur-mesure à chaque instant. De l'estimation à la signature, notre équipe dévouée anticipe vos moindres exigences."
    },
    {
        title: "Discrétion Absolue",
        description: "La confidentialité de nos clients est notre priorité absolue. Nous opérons dans le plus grand secret pour protéger vos intérêts."
    }
];

export function Benefits() {
    return (
        <section className="py-24 md:py-32 bg-[#0a0f18] text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Image Area */}
                    <div className="order-2 lg:order-1 relative group w-full h-[500px] md:h-[700px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute inset-0 rounded-[2rem] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                            <Image
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                alt="Villa de prestige à Casablanca"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>

                        {/* Floating Metric Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute -bottom-8 -right-4 md:-right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[1.5rem] shadow-2xl z-20 max-w-[200px] md:max-w-xs"
                        >
                            <div className="text-3xl md:text-5xl font-serif text-accent mb-2">15+</div>
                            <div className="text-sm md:text-base font-light tracking-wide text-white/90">Années d&apos;expertise dans la vente de propriétés de luxe à Casablanca.</div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content Area */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <span className="inline-flex items-center gap-2 mb-6 text-accent font-semibold tracking-widest uppercase text-xs">
                                <span className="w-8 h-px bg-accent"></span>
                                L&apos;Excellence Inégalée
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.15]">
                                Plus qu&apos;une Agence,<br />
                                <span className="text-white/80 italic font-light">Votre Partenaire de Prestige.</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                                Chez EUROMAR IMMO, nous transcendons la simple transaction immobilière. Nous sommes les curateurs de votre art de vivre, vous ouvrant les portes des propriétés les plus confidentielles du Royaume.
                            </p>
                        </motion.div>

                        <div className="space-y-8 md:space-y-10 mb-12">
                            {pillars.map((pillar, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                                    className="flex gap-4 md:gap-6 group"
                                >
                                    <div className="shrink-0 mt-1">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 transition-colors duration-500 group-hover:bg-accent group-hover:border-accent">
                                            <Check className="w-4 h-4 md:w-5 md:h-5 text-accent group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-serif text-white mb-2 transition-colors duration-300 group-hover:text-accent">{pillar.title}</h3>
                                        <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-4 group"
                            >
                                <span className="text-sm font-semibold tracking-widest uppercase text-white group-hover:text-accent transition-colors">Découvrir notre expertise</span>
                                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                                    <ArrowRight className="w-5 h-5 text-accent group-hover:text-white transition-colors group-hover:translate-x-1 duration-300 transform" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
