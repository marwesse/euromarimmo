"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getTestimonials } from '@/app/actions/testimonial-actions';

const testimonials = [
    {
        name: "Karim T.",
        role: "Investisseur",
        company: "Paris",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Un service irréprochable du début à la fin. EUROMAR IMMO a su trouver la villa parfaite pour ma résidence secondaire à Marrakech en un temps record. Saraha service makaynch bhalou.",
        results: ["Recherche rapide", "Meilleur prix négocié", "Accompagnement VIP"]
    },
    {
        name: "Sophie L.",
        role: "Directrice Générale",
        company: "Casablanca",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "L'expertise et la discrétion de l'agence m'ont permis de vendre mon penthouse au meilleur prix dans un délai record. L'expérience w l'ihtirafiya dialhom khlawni nbi3 mzyan.",
        results: ["Vente rapide", "Discrétion absolue", "Réseau exclusif"]
    },
    {
        name: "Youssef M.",
        role: "Expatrié",
        company: "Dubaï",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "L'accompagnement pour mon installation au Maroc a été complet. De la recherche du bien aux démarches administratives, un véritable service 5 étoiles. M3ahom kolchi daze mzyan.",
        results: ["Installation fluide", "Zéro paperasse", "Expertise locale"]
    },
    {
        name: "Marie C.",
        role: "CFO",
        company: "TechMaroc",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Nous avions des exigences très pointues pour nos bureaux d'entreprise. Ils ont trouvé la perle rare au cœur de CFC. Kano 3endna chourout s3ab w homa dbro lina.",
        results: ["Locaux premium", "Négociation B2B", "Emplacement prime"]
    },
    {
        name: "Hicham B.",
        role: "Entrepreneur",
        company: "Tanger",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Le suivi après-vente est exceptionnel, je recommande EUROMAR IMMO les yeux fermés pour tout investissement au Maroc. Lmtab3a men be3d lbi3 nadya.",
        results: ["Suivi d'experts", "Conseil fiscal", "Confiance totale"]
    }
];

export function PremiumTestimonials() {
    const [dynamicTestimonials, setDynamicTestimonials] = useState(testimonials);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

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
                    results: ["Satisfaction Garantie", "Confiance totale", "Accompagnement VIP"]
                }));
                setDynamicTestimonials(formatted);
            }
        }
        loadTests();
    }, []);

    // 5 second slider interval
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % dynamicTestimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [dynamicTestimonials.length]);

    // Simplified animation variants to prevent lag
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 400 : -400,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 400 : -400,
            opacity: 0,
            scale: 0.95
        })
    };

    const nextTestimonial = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % dynamicTestimonials.length);
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + dynamicTestimonials.length) % dynamicTestimonials.length);
    };

    return (
        <div className="relative py-16 bg-primary dark:bg-[#0a0a0a] text-white overflow-hidden rounded-[30px] shadow-2xl">
            {/* Optimized Background - removed heavy particles and excessive blurs */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-primary/[0.05] pointer-events-none" />

            <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* Main Testimonial Display */}
                <div className="relative max-w-5xl mx-auto mb-12">
                    <div className="relative h-[600px] sm:h-[450px] md:h-[400px]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.3 }
                                }}
                                className="absolute inset-0 w-full"
                            >
                                <div className="h-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10 shadow-lg">

                                    <Quote className="absolute top-6 right-6 w-10 h-10 sm:w-16 sm:h-16 text-accent/20" />

                                    {/* User Info */}
                                    <div className="flex-shrink-0 text-center md:text-left mt-2 md:mt-0 z-10">
                                        <div className="mx-auto md:mx-0 w-24 h-24 sm:w-32 sm:h-32 mb-4">
                                            <Image
                                                src={dynamicTestimonials[currentIndex].avatar}
                                                alt={dynamicTestimonials[currentIndex].name}
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover rounded-full border-4 border-accent/20 shadow-md"
                                                priority
                                            />
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 font-serif">
                                            {dynamicTestimonials[currentIndex].name}
                                        </h3>
                                        <p className="text-accent mb-1 font-medium text-sm sm:text-base">
                                            {dynamicTestimonials[currentIndex].role}
                                        </p>
                                        <p className="text-white/60 mb-3 text-xs uppercase tracking-wider">
                                            {dynamicTestimonials[currentIndex].company}
                                        </p>

                                        {/* Star Rating */}
                                        <div className="flex justify-center md:justify-start gap-1">
                                            {[...Array(dynamicTestimonials[currentIndex].rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-center text-center md:text-left z-10 w-full">
                                        <blockquote className="text-lg sm:text-2xl text-white/90 leading-relaxed mb-8 font-light italic">
                                            &quot;{dynamicTestimonials[currentIndex].text}&quot;
                                        </blockquote>

                                        {/* Results Tags */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                                            {dynamicTestimonials[currentIndex].results.map((result: string, i: number) => (
                                                <div
                                                    key={i}
                                                    className="bg-white/5 rounded-xl p-3 border border-white/10 text-center sm:text-left transition-colors hover:border-accent/40 hover:bg-white/10"
                                                >
                                                    <span className="text-xs sm:text-sm text-white/90 font-medium">
                                                        {result}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-6 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-accent transition-all active:scale-95"
                            aria-label="Previous Testimonial"
                        >
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex gap-3">
                            {dynamicTestimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                                        ? 'bg-accent scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-accent transition-all active:scale-95"
                            aria-label="Next Testimonial"
                        >
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>

                {/* Stats Section - Static for better performance */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
                    {[
                        { number: "500+", label: "Clients Heureux" },
                        { number: "100%", label: "Discrétion Assurée" },
                        { number: "50M+", label: "Volume Ventes (MAD)" },
                        { number: "24/7", label: "Accompagnement VIP" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-200 mb-2 font-serif">
                                {stat.number}
                            </div>
                            <div className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider group-hover:text-white/90 transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
