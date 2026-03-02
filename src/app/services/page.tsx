"use client";

import { motion } from "framer-motion";
import { Camera, BarChart3, TrendingUp, Compass, Scale, LayoutList, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 overflow-hidden">

            {/* Header */}
            <div className="relative bg-primary text-white pt-36 pb-24 mb-24 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Notre Expertise</span>
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight drop-shadow-lg">Services <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">d&apos;Excellence</span></h1>
                        <p className="text-gray-300 mt-6 max-w-2xl text-xl font-light leading-relaxed">
                            Un accompagnement sur-mesure pour donner vie à vos projets immobiliers les plus ambitieux.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8">

                {/* Section 1: Sellers */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">Vendez au meilleur prix</h2>
                            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
                                Confiez-nous la vente de votre bien d&apos;exception. Nous mettons en œuvre des stratégies sur-mesure pour atteindre une clientèle internationale qualifiée.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/contact" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors uppercase tracking-widest text-sm group">
                                Estimer mon bien
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BarChart3 className="w-8 h-8 text-accent" />,
                                title: "Estimation Gratuite",
                                desc: "Une évaluation précise, discrète et argumentée de votre bien par nos experts locaux, basée sur les dernières transactions du marché du luxe."
                            },
                            {
                                icon: <Camera className="w-8 h-8 text-accent" />,
                                title: "Photographie Pro",
                                desc: "Shooting photo, vidéo drone et visite virtuelle 3D réalisés par des professionnels pour sublimer votre propriété et déclencher le coup de cœur."
                            },
                            {
                                icon: <LayoutList className="w-8 h-8 text-accent" />,
                                title: "Marketing Premium",
                                desc: "Diffusion sur les réseaux internationaux exclusifs, relations publiques, et présentation à notre portefeuille de clients privés (Off-Market)."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-2 border border-gray-100"></div>
                                <div className="relative p-10 flex flex-col h-full">
                                    <div className="w-16 h-16 bg-bg-offwhite rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-500 [&>svg]:transition-colors [&>svg]:duration-500 group-hover:[&>svg]:text-white">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-serif text-2xl text-primary mb-4">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Buyers / Expats */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">Trouvez votre chez-vous</h2>
                            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
                                Que ce soit pour une résidence principale, secondaire, ou un investissement, nous simplifions votre parcours d&apos;acquisition au Maroc.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/proprietes" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors uppercase tracking-widest text-sm group">
                                Voir le catalogue
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Compass className="w-8 h-8 text-primary" />,
                                title: "Accompagnement Relocation",
                                desc: "Un service de bout en bout pour les expatriés : découverte des quartiers, sélection de biens (Home Hunting), inscriptions scolaires, logistique du déménagement."
                            },
                            {
                                icon: <Scale className="w-8 h-8 text-primary" />,
                                title: "Assistance Juridique",
                                desc: "Mise en relation avec notre réseau de notaires et d'experts juridiques pour sécuriser votre transaction et garantir la conformité (VNA, transferts, etc.)."
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8 text-primary" />,
                                title: "Conseil en Investissement",
                                desc: "Analyse de rentabilité, conseils sur les zones d'avenir, montage de projets fonciers ou commerciaux pour bâtir un patrimoine solide et pérenne."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-2 border-t-4 border-t-primary"></div>
                                <div className="relative p-10 flex flex-col h-full">
                                    <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 transition-transform duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-serif text-2xl text-primary mb-4">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-primary rounded-[32px] md:rounded-[40px] p-8 md:p-20 text-center text-white overflow-hidden relative shadow-2xl mx-4 md:mx-0"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
                            Notre Engagement
                        </span>
                        <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight drop-shadow-lg">
                            Un projet unique demande <br className="hidden md:block" />une écoute unique.
                        </h2>
                        <p className="text-gray-300 mb-12 text-lg md:text-xl font-light">
                            Contactez nos conseillers pour une première consultation strictement confidentielle.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-accent text-white px-10 py-5 rounded-xl font-medium hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 text-lg">
                            Nous Contacter
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
