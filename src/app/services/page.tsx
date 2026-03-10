"use client";

import { motion } from "framer-motion";
import {
    Car,
    Scale,
    Paintbrush,
    Search,
    Key,
    ShieldCheck,
    Handshake,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ServicesPage() {
    const pathname = usePathname();
    return (
        <div className="min-h-screen bg-white dark:bg-[#0f131a] pb-20 overflow-hidden font-sans">

            {/* SECTION 1: HERO & CONCIERGERIE VIP */}
            <div className="relative bg-[#0a0f18] text-white pt-36 pb-32 mb-20 overflow-hidden">
                {/* Background Aesthetics */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl text-center mx-auto mb-20"
                    >
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">White-Glove Services</span>
                        </span>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 leading-[1.15]">
                            Plus qu&apos;une agence, <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover italic font-light">
                                votre partenaire de vie.
                            </span>
                        </h1>
                        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                            L&apos;excellence EUROMAR IMMO s&apos;étend au-delà de la transaction. Découvrez notre service de conciergerie VIP sur-mesure pour une expérience immobilière sans compromis.
                        </p>
                    </motion.div>

                    {/* VIP Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <Car className="w-8 h-8 text-accent" strokeWidth={1.5} />,
                                title: "Accueil VIP & Transfert",
                                desc: "Dès votre arrivée, notre chauffeur privé assure vos déplacements vers les propriétés de prestige dans un confort absolu."
                            },
                            {
                                icon: <Scale className="w-8 h-8 text-accent" strokeWidth={1.5} />,
                                title: "Conseil Juridique & Fiscal",
                                desc: "Nos experts sécurisent votre investissement : assistance notariale, structuration patrimoniale et optimisation fiscale."
                            },
                            {
                                icon: <Paintbrush className="w-8 h-8 text-accent" strokeWidth={1.5} />,
                                title: "Design d'Intérieur & Rénovation",
                                desc: "De la conception à la réalisation, nos architectes d'intérieur subliment votre bien selon vos exigences les plus pointues."
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative bg-[#131b26]/60 backdrop-blur-xl border border-white/5 hover:border-accent/30 rounded-[2rem] p-8 md:p-10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent/10 transition-colors duration-500 border border-white/5">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 2: LA ROADMAP INTERACTIVE */}
            <div className="py-24 bg-gray-50 dark:bg-[#0b0e14] relative">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-accent font-semibold tracking-widest uppercase text-xs mb-4 block">Processus Exclusif</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-white mb-6">Votre Parcours d&apos;Investissement <br className="hidden md:block" />avec EUROMAR IMMO</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light">Une méthodologie éprouvée et transparente pour acquérir votre bien d&apos;exception en toute sérénité.</p>
                    </div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-accent/20 md:-translate-x-1/2"></div>

                        {/* Steps */}
                        {[
                            {
                                step: "01",
                                title: "Consultation Privée",
                                desc: "Analyse approfondie de votre cahier des charges, de vos aspirations de style de vie et de vos cibles d'investissement lors d'un rendez-vous confidentiel.",
                                icon: <Search className="w-5 h-5 text-white" />
                            },
                            {
                                step: "02",
                                title: "Sélection Off-Market",
                                desc: "Présentation d'un portfolio sur-mesure incluant des propriétés discrètes et exclusives qui ne sont pas répertoriées sur le marché public.",
                                icon: <ShieldCheck className="w-5 h-5 text-white" />
                            },
                            {
                                step: "03",
                                title: "Visite & Négociation",
                                desc: "Organisation de visites privées, évaluation rigoureuse de la propriété et négociation experte pour défendre vos intérêts aux meilleures conditions.",
                                icon: <Handshake className="w-5 h-5 text-white" />
                            },
                            {
                                step: "04",
                                title: "Remise des Clés",
                                desc: "Accompagnement jusqu'à la signature de l'acte authentique et au-delà avec notre service de conciergerie pour votre emménagement.",
                                icon: <Key className="w-5 h-5 text-white" />
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.15 }}
                                className={`relative flex items-center mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
                            >
                                <div className="hidden md:flex absolute left-1/2 w-12 h-12 rounded-full bg-accent border-4 border-gray-50 dark:border-[#0b0e14] items-center justify-center transform -translate-x-1/2 z-10 shadow-lg shadow-accent/30">
                                    {item.icon}
                                </div>

                                {/* Content Box */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                                    <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-white/5 hover:border-accent/30 transition-colors duration-500">
                                        <span className="text-accent font-serif text-xl italic mb-2 block">Étape {item.step}</span>
                                        <h3 className="text-2xl font-serif text-primary dark:text-white mb-3">{item.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 3: PACK VENDEUR PREMIUM */}
            <div className="py-24 bg-white dark:bg-[#0f131a] overflow-hidden">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Content Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 mb-6 text-accent font-semibold tracking-widest uppercase text-xs">
                                <span className="w-8 h-px bg-accent"></span>
                                Pack Vendeur Premium
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl text-primary dark:text-white mb-8 leading-tight">
                                Vendez votre propriété <br />
                                <span className="italic font-light">au meilleur prix.</span>
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed mb-10">
                                Pour les demeures d'exception, nous déployons un arsenal technologique et marketing inégalé pour captiver les acheteurs du monde entier.
                            </p>

                            <ul className="space-y-6 mb-12">
                                {[
                                    "Photographie par Drone 4K & Vidéos Cinématographiques",
                                    "Visite Virtuelle 3D et Plans Interactifs",
                                    "Marketing Ciblé (Social, Google Ads, Presse Spécialisée)",
                                    "Mise en avant sur les portails internationaux de standing"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-accent" />
                                        </div>
                                        <span className="text-primary dark:text-gray-200 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/contact`}
                                className="inline-flex items-center justify-center gap-3 bg-primary dark:bg-white text-white dark:text-primary px-8 md:px-10 py-4 md:py-5 rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] w-full md:w-auto"
                            >
                                Faire estimer mon bien
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                        </motion.div>

                        {/* Image Right */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl">
                                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                                <Image
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
                                    alt="Villa de luxe survolée par un drone"
                                    fill
                                    className="object-cover transition-transform duration-[2s] hover:scale-110"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute -bottom-8 -left-8 md:left-auto md:-right-12 bg-white dark:bg-[#1a222e] p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 max-w-[240px] z-20"
                            >
                                <div className="text-accent mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><path d="m16 19 2 2 4-4" /></svg>
                                </div>
                                <h4 className="font-serif text-lg text-primary dark:text-white mb-1">Qualité Cinéma</h4>
                                <p className="text-sm text-gray-500 font-light">Des visuels époustouflants pour des clients exigeants.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
}
