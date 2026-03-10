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

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % dynamicTestimonials.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [dynamicTestimonials.length]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45
        })
    };

    const fadeInUp: any = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.23, 0.86, 0.39, 0.96]
            }
        }
    };

    const staggerContainer: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
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
        <div className="relative py-20 bg-primary dark:bg-black text-white overflow-hidden rounded-[40px] shadow-2xl">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                {/* Animated gradient mesh */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-amber-500/[0.02] to-primary/[0.08]"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundSize: '400% 400%'
                    }}
                />

                {/* Moving light orbs */}
                <motion.div
                    className="absolute top-1/3 left-1/5 w-72 h-72 bg-accent/20 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 150, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-white/10 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-accent/40 rounded-full"
                        style={{
                            left: `${15 + (i * 7)}%`,
                            top: `${25 + (i * 5)}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 2, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>

            <motion.div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Main Testimonial Display */}
                <div className="relative max-w-6xl mx-auto mb-16">
                    <div className="relative h-[650px] sm:h-[500px] md:h-[450px] perspective-1000">
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
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 },
                                    rotateY: { duration: 0.6 }
                                }}
                                className="absolute inset-0"
                            >
                                <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 md:p-12 overflow-hidden group">
                                    {/* Animated background gradient */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-white/[0.05] rounded-3xl"
                                        animate={{
                                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                        }}
                                        transition={{
                                            duration: 15,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        style={{ backgroundSize: '300% 300%' }}
                                    />

                                    {/* Quote icon */}
                                    <motion.div
                                        className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-20"
                                        animate={{ rotate: [0, 10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-accent" />
                                    </motion.div>

                                    <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                                        {/* User Info */}
                                        <div className="flex-shrink-0 text-center md:text-left mt-2 sm:mt-0">
                                            <motion.div
                                                className="relative mb-4 sm:mb-6 mx-auto md:mx-0 w-24 h-24 sm:w-32 sm:h-32"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-accent/20 relative">
                                                    <Image
                                                        src={dynamicTestimonials[currentIndex].avatar}
                                                        alt={dynamicTestimonials[currentIndex].name}
                                                        width={128}
                                                        height={128}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-br from-accent/20 to-white/10"
                                                        animate={{ opacity: [0, 0.3, 0] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                    />
                                                </div>

                                                {/* Floating ring animation */}
                                                <motion.div
                                                    className="absolute inset-0 border border-accent/30 rounded-full"
                                                    animate={{
                                                        scale: [1, 1.4, 1],
                                                        opacity: [0.5, 0, 0.5]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            </motion.div>

                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 font-serif">
                                                {dynamicTestimonials[currentIndex].name}
                                            </h3>
                                            <p className="text-accent mb-1 font-medium text-sm sm:text-base">
                                                {dynamicTestimonials[currentIndex].role}
                                            </p>
                                            <p className="text-white/60 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
                                                {dynamicTestimonials[currentIndex].company}
                                            </p>

                                            {/* Star Rating */}
                                            <div className="flex justify-center md:justify-start gap-1 sm:mb-6">
                                                {[...Array(dynamicTestimonials[currentIndex].rating)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.1, duration: 0.3 }}
                                                    >
                                                        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                                            <motion.blockquote
                                                className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed mb-6 sm:mb-8 font-light italic"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3, duration: 0.8 }}
                                            >
                                                &quot;{dynamicTestimonials[currentIndex].text}&quot;
                                            </motion.blockquote>

                                            {/* Results */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-auto">
                                                {dynamicTestimonials[currentIndex].results.map((result: string, i: number) => (
                                                    <motion.div
                                                        key={i}
                                                        className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm shadow-sm"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(212,175,55,0.3)" }}
                                                    >
                                                        <span className="text-xs sm:text-sm text-white/90 font-medium">
                                                            {result}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
                        <motion.button
                            onClick={prevTestimonial}
                            className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-white/10 hover:text-accent transition-all"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.button>

                        {/* Dots Indicator */}
                        <div className="flex gap-2 sm:gap-3">
                            {dynamicTestimonials.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentIndex
                                        ? 'bg-accent scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>

                        <motion.button
                            onClick={nextTestimonial}
                            className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-white/10 hover:text-accent transition-all"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 md:pt-12 border-t border-white/10"
                    variants={staggerContainer}
                >
                    {[
                        { number: "500+", label: "Clients Heureux" },
                        { number: "100%", label: "Discrétion Assurée" },
                        { number: "50M+", label: "Volume Ventes (MAD)" },
                        { number: "24/7", label: "Accompagnement VIP" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-200 mb-1 sm:mb-3 font-serif"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            >
                                {stat.number}
                            </motion.div>
                            <div className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider group-hover:text-white/90 transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
