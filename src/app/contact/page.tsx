"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, MessageCircle } from "lucide-react";
import { submitLead } from "@/app/actions/lead-actions";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

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
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Contact</span>
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight drop-shadow-lg">Parlons de <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">votre projet</span></h1>
                        <p className="text-gray-300 mt-6 max-w-2xl text-xl font-light leading-relaxed">
                            Nos conseillers sont à votre disposition pour répondre à toutes vos questions avec l&apos;attention et la discrétion que vous méritez.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="font-serif text-4xl text-primary mb-6">Contactez-nous</h2>
                            <p className="text-gray-500 text-lg font-light leading-relaxed mb-10">
                                Pour une demande d&apos;estimation, une recherche spécifique, ou une information sur l&apos;un de nos biens, n&apos;hésitez pas à nous solliciter.
                            </p>

                            <ul className="space-y-8">
                                <li className="flex items-start gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                                        <Phone className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="pt-1">
                                        <strong className="block text-primary font-serif text-xl mb-2">Téléphone</strong>
                                        <a href="tel:+212661755716" className="text-gray-500 hover:text-accent font-medium transition-colors text-lg">+212 661-755716</a>
                                        <p className="inline-block px-3 py-1 mt-3 text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 rounded-full border border-accent/20">Ligne Directe VIP 24/7</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                                        <Mail className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="pt-1">
                                        <strong className="block text-primary font-serif text-xl mb-2">Email</strong>
                                        <a href="mailto:contact@euromarimmo.ma" className="text-gray-500 hover:text-accent font-medium transition-colors text-lg">contact@euromarimmo.ma</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                                        <Clock className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="pt-1">
                                        <strong className="block text-primary font-serif text-xl mb-2">Disponibilité</strong>
                                        <div className="inline-flex items-center gap-3 mt-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
                                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 z-10"></span>
                                            </span>
                                            <span className="text-primary text-xs font-bold tracking-widest uppercase">Ouvert 24h/24 & 7j/7</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-10 border-t border-gray-200">
                            <h3 className="font-serif text-3xl text-primary mb-8">Notre Siège</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gray-600 bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-base font-medium">91 rue ben radi slaoui ETG 3 APPT 20<br />Casablanca, Maroc</p>
                                    </div>
                                </div>

                                {/* Carte Google Maps (Iframe) */}
                                <div className="w-full h-64 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative group">
                                    <iframe
                                        src="https://maps.google.com/maps?q=91%20rue%20ben%20radi%20slaoui,%20Casablanca&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        aria-hidden="false"
                                        tabIndex={0}
                                        title="Carte Google Maps Siège EUROMAR IMMO"
                                        className="transition-transform duration-1000 group-hover:scale-105"
                                    ></iframe>
                                    <div className="absolute inset-0 bg-primary/5 pointer-events-none transition-opacity group-hover:opacity-0" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="https://wa.me/212600692922?text=Bonjour%20EUROMAR%20IMMO..." target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#20bd5a] transition-all hover:shadow-lg hover:-translate-y-1">
                                <MessageCircle className="w-6 h-6" />
                                <span>WhatsApp</span>
                            </a>
                            <a href="#" className="flex-1 flex items-center justify-center gap-3 bg-[#1877F2] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#166fe5] transition-all hover:shadow-lg hover:-translate-y-1">
                                <Facebook className="w-6 h-6" />
                                <span>Messenger</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                            <h3 className="font-serif text-3xl text-primary mb-8 relative z-10">Envoyez-nous un message</h3>

                            <form className="space-y-8 relative z-10">
                                <input type="hidden" name="source" value="Contact" />
                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Nom complet *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Votre nom"
                                        className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 py-4 px-5 focus:outline-none focus:border-accent focus:bg-white transition-colors rounded-t-xl"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Téléphone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+212 ..."
                                            className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 py-4 px-5 focus:outline-none focus:border-accent focus:bg-white transition-colors rounded-t-xl"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Adresse email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="vous@email.com"
                                            className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 py-4 px-5 focus:outline-none focus:border-accent focus:bg-white transition-colors rounded-t-xl"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Objet de votre demande *</label>
                                    <div className="relative">
                                        <select name="subject" defaultValue="" required className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 py-4 px-5 pr-10 focus:outline-none focus:border-accent focus:bg-white transition-colors appearance-none cursor-pointer rounded-t-xl text-gray-700">
                                            <option value="" disabled>Sélectionnez un sujet</option>
                                            <option value="achat">Je souhaite acheter un bien</option>
                                            <option value="vente">Je souhaite vendre mon bien</option>
                                            <option value="estimation">Demande d&apos;estimation</option>
                                            <option value="autre">Autre demande</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Votre message *</label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        placeholder="Comment pouvons-nous vous aider ?"
                                        className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 py-4 px-5 focus:outline-none focus:border-accent focus:bg-white transition-colors resize-none rounded-t-xl"
                                        required
                                    ></textarea>
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        formAction={async (formData) => {
                                            setIsSubmitting(true);
                                            setSubmitSuccess(false);

                                            const name = formData.get("name") as string;
                                            const phone = formData.get("phone") as string;
                                            const email = formData.get("email") as string;
                                            const subject = formData.get("subject") as string;
                                            const message = formData.get("message") as string;

                                            // Send lead to backend
                                            formData.set("message", `[Sujet: ${subject}]\n${message}`);
                                            const result = await submitLead(formData);

                                            setIsSubmitting(false);
                                            if (result?.success) {
                                                setSubmitSuccess(true);

                                                // Redirect to WhatsApp with filled info
                                                const waMessage = `Bonjour EUROMAR IMMO,\n\nNouveau message depuis le formulaire de contact:\n*Nom:* ${name}\n*Téléphone:* ${phone}\n*Sujet:* ${subject}\n\n*Message:*\n${message}`;
                                                window.open(`https://wa.me/212661755716?text=${encodeURIComponent(waMessage)}`, "_blank");
                                            }
                                        }}
                                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.4)] hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-lg"
                                    >
                                        {isSubmitting ? (
                                            "Envoi en cours..."
                                        ) : submitSuccess ? (
                                            "Message envoyé avec succès !"
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Envoyer le message
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        Vos données sont traitées avec la plus stricte confidentialité.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
