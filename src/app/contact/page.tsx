"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, MessageCircle } from "lucide-react";
import { submitLead } from "@/app/actions/lead-actions";
import { motion } from "framer-motion";
import { LuxurySelect } from "@/components/ui/LuxurySelect";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [subject, setSubject] = useState("");

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover -z-20"
            >
                <source src="https://videos.pexels.com/video-files/7578546/7578546-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 -z-10"></div>

            {/* Split Layout Container */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto px-4 py-24 md:py-32 z-10 relative text-white w-full overflow-y-auto">

                {/* Left Column: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col justify-center"
                >
                    <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 w-fit">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="font-semibold tracking-widest uppercase text-xs">Contact</span>
                    </span>
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 leading-tight drop-shadow-xl">
                        Discutons de <br />votre prochain <br /><span className="text-accent italic">investissement</span>
                    </h1>
                    <p className="text-white/80 text-base md:text-xl font-light leading-relaxed mb-10 md:mb-12 max-w-lg">
                        Nos conseillers sont à votre disposition pour vous accompagner dans vos projets immobiliers les plus ambitieux, avec l'attention et la discrétion que vous méritez.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-5 group">
                            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-white/60 tracking-widest uppercase font-semibold mb-1">Téléphone</p>
                                <a href="tel:+212600692922" className="text-xl font-medium hover:text-accent transition-colors">+212 600-692922</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 group">
                            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-white/60 tracking-widest uppercase font-semibold mb-1">Email</p>
                                <a href="mailto:contact@euromarimmo.ma" className="text-xl font-medium hover:text-accent transition-colors">contact@euromarimmo.ma</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 group">
                            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-white/60 tracking-widest uppercase font-semibold mb-1">Siège Social</p>
                                <p className="text-lg font-medium">91 rue ben radi slaoui, Casablanca</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Glassmorphism Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col justify-center pt-8 md:pt-0"
                >
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-[32px] p-6 sm:p-8 md:p-10 relative overflow-hidden">

                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                        <h3 className="font-serif text-2xl sm:text-3xl mb-6 md:mb-8 relative z-10 text-center md:text-left">Envoyez-nous un message</h3>

                        <form className="space-y-4 md:space-y-6 relative z-10">
                            <input type="hidden" name="source" value="Contact Cinematic" />

                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">Nom complet *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Votre nom"
                                    className="w-full bg-white/5 border border-white/30 text-white placeholder-white/40 py-4 px-5 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">Téléphone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+212 ..."
                                        className="w-full bg-white/5 border border-white/30 text-white placeholder-white/40 py-4 px-5 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">Adresse email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="vous@email.com"
                                        className="w-full bg-white/5 border border-white/30 text-white placeholder-white/40 py-4 px-5 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">Objet de votre demande *</label>
                                <div className="relative">
                                    <LuxurySelect
                                        name="subject"
                                        value={subject}
                                        onChange={setSubject}
                                        placeholder="Sélectionnez un sujet"
                                        options={[
                                            { value: "achat", label: "Je souhaite acheter un bien" },
                                            { value: "vente", label: "Je souhaite vendre mon bien" },
                                            { value: "estimation", label: "Demande d'estimation" },
                                            { value: "autre", label: "Autre demande" }
                                        ]}
                                        buttonClassName="w-full bg-white/5 border border-white/30 text-white py-4 px-5 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm text-center md:text-left placeholder-white/40 min-h-[56px]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">Votre message *</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    className="w-full bg-white/5 border border-white/30 text-white placeholder-white/40 py-4 px-5 rounded-xl focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    formAction={async (formData) => {
                                        setIsSubmitting(true);
                                        setSubmitSuccess(false);

                                        const name = formData.get("name") as string;
                                        const phone = formData.get("phone") as string;
                                        const subject = formData.get("subject") as string;
                                        const message = formData.get("message") as string;

                                        formData.set("message", `[Sujet: ${subject}]\n${message}`);
                                        const result = await submitLead(formData);

                                        setIsSubmitting(false);
                                        if (result?.success) {
                                            setSubmitSuccess(true);
                                        }
                                    }}
                                    className="w-full bg-white text-primary hover:bg-gray-100 font-bold tracking-widest uppercase py-4 md:py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 disabled:bg-white/50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-sm min-h-[56px]"
                                >
                                    {isSubmitting ? (
                                        "Envoi en cours..."
                                    ) : submitSuccess ? (
                                        "Message envoyé !"
                                    ) : (
                                        <>
                                            Envoyer la demande
                                            <Send className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-white/50 mt-6 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    Confidentialité absolue garantie.
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
