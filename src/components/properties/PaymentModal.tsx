"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, CheckCircle2, MessageCircle } from "lucide-react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    advanceAmount: string;
    totalAmount?: string;
    propertyTitle: string;
    settings: any;
}

export function PaymentModal({ isOpen, onClose, advanceAmount, totalAmount, propertyTitle, settings }: PaymentModalProps) {
    const [copied, setCopied] = useState(false);
    const ribToCopy = "0077800003075000000051327";

    const handleCopy = () => {
        navigator.clipboard.writeText(ribToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsApp = () => {
        const message = `Bonjour EUROMAR IMMO, je viens de procéder au virement de l'avance (${advanceAmount}) pour bloquer la propriété : ${propertyTitle}. Voici mon reçu :`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${settings.whatsapp_number.replace("+", "")}?text=${encodedMessage}`, "_blank");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="bg-primary p-6 text-white relative flex-shrink-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                                    aria-label="Fermer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <h3 className="font-serif text-2xl pr-8">Sécurisez votre bien</h3>
                                <p className="text-white/80 mt-1 font-light">Paiement de l&apos;avance</p>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto">
                                <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-600">
                                    <p className="mb-2">
                                        Pour bloquer le bien <span className="font-semibold text-primary">{propertyTitle}</span>, veuillez effectuer un virement bancaire du montant de l&apos;avance sur le compte ci-dessous.
                                    </p>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-500">Montant de l&apos;avance :</span>
                                        <span className="font-bold text-lg text-primary">{advanceAmount}</span>
                                    </div>
                                    {totalAmount && (
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-500">Montant total estimé :</span>
                                            <span className="font-semibold text-gray-700">{totalAmount}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Credit Card Styled Box */}
                                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-[#2a3441] to-primary p-6 text-white shadow-lg mb-8">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="20" cy="20" r="20" fill="white" />
                                            <circle cx="40" cy="20" r="20" fill="white" />
                                        </svg>
                                    </div>
                                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Titulaire du compte</p>
                                    <p className="font-serif text-xl tracking-wide mb-4">EUROMAR IMMO SARL</p>

                                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Banque</p>
                                    <p className="font-medium tracking-wide mb-4">Attijariwafa Bank</p>

                                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">RIB</p>
                                    <p className="font-mono text-lg tracking-widest mb-4 bg-black/20 p-2 rounded inline-block">007 780 00030750000000513 27</p>

                                    {/* <p className="text-white/60 text-xs uppercase tracking-widest mb-1">SWIFT / BIC</p>
                                    <p className="font-mono font-medium tracking-widest">BCM AMA MC</p> */}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleCopy}
                                        className="w-full py-3 px-4 rounded-lg font-medium border-2 border-accent text-accent hover:bg-accent/5 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                RIB Copié !
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5" />
                                                Copier le RIB
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full py-4 px-4 rounded-lg font-medium bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md transition-colors flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Envoyer le reçu sur WhatsApp
                                    </button>
                                </div>

                                {/* Mentions Légales */}
                                <div className="border-t border-gray-200 mt-6 pt-4">
                                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                                        <strong>EUROMAR IMMO SARL</strong><br />
                                        Siège Social : 91 rue ben radi slaoui ETG 3 APPT 20 CASABLANCA<br />
                                        ICE : 003252595000049 | IF : 51850388
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
