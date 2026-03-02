"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Karim T.",
        role: "Investisseur, Paris",
        textFr: "Un service irréprochable du début à la fin. L'équipe d'EUROMAR IMMO a su trouver la villa parfaite pour ma résidence secondaire à Marrakech en moins d'un mois.",
        textDarija: "Saraha service makaynch bhalou. L'équipe dial EUROMAR IMMO lqaw lya la villa li knt kanqleb 3liha à Marrakech f a9al men chher."
    },
    {
        name: "Sophie L.",
        role: "Directrice Générale, Casablanca",
        textFr: "L'expertise et la discrétion de l'agence m'ont permis de vendre mon penthouse au meilleur prix dans un délai record. Une stratégie marketing exceptionnelle.",
        textDarija: "L'expérience w l'ihtirafiya dialhom khlawni nbi3 l'penthouse diali b a7ssan taman w f waqt qyassi. Stratégie marketing niveau 3ali."
    },
    {
        name: "Youssef M.",
        role: "Expatrié, Dubaï",
        textFr: "L'accompagnement pour mon installation au Maroc a été complet. De la recherche du bien aux démarches administratives, un véritable service 5 étoiles.",
        textDarija: "M3ahom mabin tqal wa7el. Men l'teqlab 3la ddar tal l'wraq w l'idara, wqfou m3aya f kolchi. Service 5 étoiles dyal bseh."
    }
];

export function Testimonials() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-offwhite to-transparent pointer-events-none" />
            <div className="absolute top-20 right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Témoignages</span>
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">Confiance & Discrétion</h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            className="relative group h-full"
                        >
                            <div className="absolute inset-0 bg-white rounded-[32px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-2 border border-gray-100"></div>

                            <div className="relative p-8 md:p-10 flex flex-col h-full">
                                <Quote className="w-12 h-12 text-accent/10 absolute top-8 right-8 rotate-180" />

                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} className="w-4 h-4 fill-accent text-accent" />
                                    ))}
                                </div>

                                <div className="space-y-4 mb-10 flex-grow">
                                    <p className="text-gray-600 italic leading-relaxed font-light">
                                        &quot;{t.textFr}&quot;
                                    </p>
                                    <div className="w-12 h-px bg-gray-200"></div>
                                    <p className="text-gray-500/80 italic leading-relaxed text-sm">
                                        &quot;{t.textDarija}&quot;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                                    <div className="w-12 h-12 rounded-full bg-bg-offwhite flex items-center justify-center text-primary font-serif font-bold text-lg border border-gray-100 group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-sm">{t.name}</p>
                                        <p className="text-xs text-accent tracking-wide uppercase mt-0.5">{t.role}</p>
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
