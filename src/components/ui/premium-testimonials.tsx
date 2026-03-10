"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { getTestimonials } from '@/app/actions/testimonial-actions';

const defaultTestimonials = [
    {
        id: "1",
        name: "Karim T.",
        role: "Investisseur",
        company: "Paris",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Un service irréprochable du début à la fin. EUROMAR IMMO a su trouver la villa parfaite pour ma résidence secondaire à Marrakech en un temps record.",
        results: ["Recherche rapide", "Meilleur prix négocié"]
    },
    {
        id: "2",
        name: "Sophie L.",
        role: "Directrice Générale",
        company: "Casablanca",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "L'expertise et la discrétion de l'agence m'ont permis de vendre mon penthouse au meilleur prix dans un délai record. Une expérience vraiment exceptionnelle.",
        results: ["Vente rapide", "Discrétion absolue"]
    },
    {
        id: "3",
        name: "Youssef M.",
        role: "Expatrié",
        company: "Dubaï",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "L'accompagnement pour mon installation au Maroc a été complet. De la recherche du bien aux démarches administratives, un véritable service 5 étoiles.",
        results: ["Installation fluide", "Zéro paperasse"]
    }
];

export function PremiumTestimonials() {
    const [testimonials, setTestimonials] = useState(defaultTestimonials);

    useEffect(() => {
        async function loadTests() {
            const data = await getTestimonials();
            if (data && data.length > 0) {
                const formatted = data.map(t => ({
                    id: t.id,
                    name: t.client_name,
                    role: t.role,
                    company: "EUROMAR IMMO",
                    avatar: t.image_url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
                    rating: t.rating || 5,
                    text: t.content,
                    results: ["Satisfaction Garantie", "Accompagnement VIP"]
                })).slice(0, 3); // Take top 3 for the grid layout
                setTestimonials(formatted);
            }
        }
        loadTests();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="relative py-12">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id || index}
                            variants={cardVariants}
                            className="relative group bg-white dark:bg-[#141a23] border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/10 group-hover:text-accent/20 transition-colors" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent/20">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        fill
                                        sizes="(max-width: 768px) 64px, 64px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg font-bold text-primary dark:text-white leading-tight">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-accent text-sm font-medium">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>

                            <blockquote className="text-gray-600 dark:text-gray-300 flex-1 mb-6 leading-relaxed font-light italic">
                                "{testimonial.text}"
                            </blockquote>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {testimonial.results.map((res, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-full text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        {res}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-primary dark:bg-[#0a0f16] rounded-[2rem] p-8 md:p-12 text-white overflow-hidden relative shadow-lg">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10 dark:divide-white/5">
                        {[
                            { number: "500+", label: "Clients Heureux" },
                            { number: "100%", label: "Discrétion Assurée" },
                            { number: "50M+", label: "Volume Ventes (MAD)" },
                            { number: "24/7", label: "Accompagnement VIP" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center px-4">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-200 mb-2 font-serif">
                                    {stat.number}
                                </div>
                                <div className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
