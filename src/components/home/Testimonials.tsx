"use client";

import { motion } from "framer-motion";
import { PremiumTestimonials } from "@/components/ui/premium-testimonials";

export function Testimonials() {
    return (
        <section className="py-24 md:py-32 bg-white dark:bg-[#0f131a] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-offwhite dark:from-[#0f131a] to-transparent pointer-events-none" />
            <div className="absolute top-20 right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-50 dark:bg-white/10 rounded-full border border-gray-100 dark:border-white/10 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Témoignages</span>
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-white mb-6 leading-tight">L'Excellence Reconnue</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                            Découvrez pourquoi nos clients nous font confiance pour leurs projets immobiliers les plus ambitieux.
                        </p>
                    </motion.div>
                </div>

                <div className="w-full">
                    <PremiumTestimonials />
                </div>
            </div>
        </section>
    );
}
