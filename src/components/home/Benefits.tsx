"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Handshake } from "lucide-react";

const benefits = [
    {
        icon: <Award className="w-8 h-8 text-accent" />,
        title: "Expertise Locale",
        description: "Une connaissance absolue du marché immobilier luxueux marocain, de la Médina aux villas contemporaines."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-accent" />,
        title: "Confidentialité Absolue",
        description: "Vos transactions et recherches sont traitées avec la plus grande discrétion et un professionnalisme exemplaire."
    },
    {
        icon: <Handshake className="w-8 h-8 text-accent" />,
        title: "Accompagnement Sur-Mesure",
        description: "Un service de conciergerie complet, de la négociation à l&apos;assistance juridique et fiscale."
    }
];

export function Benefits() {
    return (
        <section className="py-32 bg-gray-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Pourquoi EUROMAR IMMO</span>
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">L&apos;Excellence à <br className="hidden md:block" />Chaque Étape</h2>
                        <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
                            Nous avons redéfini les standards de l&apos;immobilier de prestige au Maroc pour vous offrir une expérience sans friction, sécurisée et sur-mesure.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-white rounded-[30px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-2 border border-gray-100/50"></div>

                            <div className="relative p-10 flex flex-col items-center text-center">
                                {/* Enhanced Icon Container */}
                                <div className="relative w-20 h-20 mb-8 mt-2">
                                    <div className="absolute inset-0 bg-accent/5 rounded-full scale-150 transition-transform duration-500 group-hover:scale-125 opacity-0 group-hover:opacity-100"></div>
                                    <div className="relative w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:border-accent group-hover:-translate-y-1">
                                        <div className="transition-colors duration-500 group-hover:text-white group-hover:[&>svg]:text-white">
                                            {benefit.icon}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-serif text-2xl text-primary mb-4 transition-colors duration-300 group-hover:text-accent">{benefit.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-light">
                                    {benefit.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
