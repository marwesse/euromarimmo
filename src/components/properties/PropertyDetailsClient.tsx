"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BedDouble, Bath, SquareMenu, Calendar, Check, ArrowLeft, Phone, Mail, User, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { PaymentModal } from "@/components/properties/PaymentModal";
import { submitLead } from "@/app/actions/lead-actions";

interface PropertyDetailsProps {
    property: any;
    similarProperties: any[];
    settings: any;
}

export function PropertyDetailsClient({ property, similarProperties, settings }: PropertyDetailsProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Booking & Payment State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [nights, setNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Effect to calculate nights and total price for rentals
    useEffect(() => {
        if (property?.type === 'Location' && checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            if (end > start) {
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setNights(diffDays);
                setTotalPrice(diffDays * Number(property.price || 0));
            } else {
                setNights(0);
                setTotalPrice(null);
            }
        }
    }, [checkIn, checkOut, property]);

    const nextImage = () => {
        if (!property.images?.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = () => {
        if (!property.images?.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    const whatsappMessage = `Bonjour EUROMAR IMMO, je suis intéressé(e) par le bien "${property.title}".`;
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="pt-24 pb-20 bg-bg-offwhite min-h-screen">
            <div className="container mx-auto px-4 md:px-8">

                {/* Back Button */}
                <Link href="/proprietes" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Retour au catalogue
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${property.status === 'Nouveau' ? 'bg-accent' :
                                property.status === 'Vendu' ? 'bg-red-800' : 'bg-primary'
                                } `}>
                                {property.status || 'Nouveau'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black/50 border border-white/20">
                                {property.type === 'Vente' ? 'À Vendre' : 'À Louer'}
                            </span>
                            <span className="text-gray-500 font-medium">{property.type}</span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-2 leading-tight">{property.title}</h1>
                        <p className="text-gray-500 text-lg flex items-center gap-2">
                            {property.location}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">
                            {property.type === 'Vente' ? 'Prix de vente' : 'Prix par nuit'}
                        </p>
                        <p className="font-serif text-3xl md:text-4xl text-accent">{Number(property.price || 0).toLocaleString('fr-FR')} DH</p>
                    </div>
                </div>

                {/* Image Slider */}
                <div className="relative mb-12 h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg group">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                        style={{ backgroundImage: `url('${property.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}')` }}
                    />

                    {/* Gradient overlay for better button visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Navigation Buttons */}
                    {(property.images?.length || 0) > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white text-white hover:text-primary p-3 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                aria-label="Image précédente"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white text-white hover:text-primary p-3 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                aria-label="Image suivante"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {property.images.map((_: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                        aria-label={`Aller à l'image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Content & Sidebar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-12">
                        {/* Key Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-200">
                            <div className="flex flex-col gap-2">
                                <BedDouble className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 text-sm">Chambres</span>
                                <span className="font-bold text-primary text-xl">{property.bedrooms || property.features?.beds || 0}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Bath className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 text-sm">Salles de bain</span>
                                <span className="font-bold text-primary text-xl">{property.bathrooms || property.features?.baths || 0}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <SquareMenu className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 text-sm">Surface</span>
                                <span className="font-bold text-primary text-xl">{property.surface || property.features?.area || 0} m²</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Calendar className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 text-sm">Année</span>
                                <span className="font-bold text-primary text-xl">{property.yearBuilt || property.features?.yearBuilt || '-'}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="font-serif text-2xl text-primary mb-6">À propos de ce bien</h2>
                            <div className="prose prose-lg text-gray-600">
                                <p className="leading-relaxed whitespace-pre-line">{property.description}</p>
                            </div>
                        </div>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div>
                                <h2 className="font-serif text-2xl text-primary mb-6">Prestations & Équipements</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {property.amenities.map((amenity: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-600">
                                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                                <Check className="w-4 h-4 text-accent" />
                                            </div>
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 border border-transparent">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-28">
                            <h3 className="font-serif text-2xl text-primary mb-6">
                                {property.type === 'Vente' ? 'Intéressé(e) ?' : 'Réserver ce bien'}
                            </h3>

                            {/* Booking Widget for Rentals */}
                            {property.type === 'Location' && (
                                <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Arrivée</label>
                                            <div className="relative">
                                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-text appearance-none"
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Départ</label>
                                            <div className="relative">
                                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                    className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-text appearance-none"
                                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>

                                        {/* Dynamic Price Summary */}
                                        {nights > 0 && totalPrice !== null && (
                                            <div className="mt-2 pt-4 border-t border-gray-200">
                                                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                                    <span>{Number(property.price || 0).toLocaleString('fr-FR')} DH x {nights} {nights > 1 ? 'nuits' : 'nuit'}</span>
                                                    <span>{totalPrice.toLocaleString()} DH</span>
                                                </div>
                                                <div className="flex justify-between items-center font-bold text-primary mt-3">
                                                    <span>Total</span>
                                                    <span>{totalPrice.toLocaleString()} DH</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CTA Reserve / Contact */}
                            <div className="mb-8 border-b border-gray-100 pb-8">
                                {property.type === 'Vente' ? (
                                    <button
                                        onClick={() => setIsPaymentModalOpen(true)}
                                        className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-4 rounded-lg shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 mb-4"
                                    >
                                        Réserver (Payer l&apos;avance)
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsPaymentModalOpen(true)}
                                        disabled={!totalPrice || nights === 0}
                                        className={`w-full font-medium py-4 rounded-lg flex items-center justify-center gap-2 mb-4 transition-all ${(!totalPrice || nights === 0) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20'}`}
                                    >
                                        {!totalPrice || nights === 0 ? 'Sélectionnez vos dates' : 'Réserver (Payer l\'avance)'}
                                    </button>
                                )}
                            </div>

                            <form className="space-y-4">
                                <input type="hidden" name="source" value="Contact" />
                                <div>
                                    <label className="sr-only">Nom complet</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type="text" name="name" placeholder="Nom complet" required className="w-full bg-bg-offwhite border border-transparent rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-accent focus:bg-white transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="sr-only">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type="email" name="email" placeholder="Adresse email" required className="w-full bg-bg-offwhite border border-transparent rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-accent focus:bg-white transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="sr-only">Téléphone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type="tel" name="phone" placeholder="Téléphone" className="w-full bg-bg-offwhite border border-transparent rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-accent focus:bg-white transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="sr-only">Message</label>
                                    <textarea name="message" rows={4} placeholder="Je souhaite obtenir plus d'informations sur ce bien..." required className="w-full bg-bg-offwhite border border-transparent rounded-lg py-3 px-4 focus:outline-none focus:border-accent focus:bg-white transition-colors resize-none"></textarea>
                                </div>
                                <button type="submit" formAction={async (formData) => {
                                    setIsSubmitting(true);
                                    setSubmitSuccess(false);

                                    // Append property info to the message
                                    const message = formData.get("message") as string;
                                    formData.set("message", `[Concernant ${property.title}] \n` + message);

                                    const result = await submitLead(formData);

                                    setIsSubmitting(false);
                                    if (result?.success) {
                                        setSubmitSuccess(true);
                                    }
                                }} disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {isSubmitting ? "Envoi en cours..." : submitSuccess ? "Demande envoyée !" : "Envoyer la demande"}
                                </button>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 rounded-lg transition-colors mt-4">
                                    Contacter par WhatsApp
                                </a>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-gray-200">
                        <h2 className="font-serif text-3xl text-primary mb-8">Biens Similaires</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {similarProperties.map((similar: any) => (
                                <div key={similar.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
                                    <div className="relative h-56 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url('${similar.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gray-200 -z-10 flex items-center justify-center text-xs text-gray-400">[Image]</div>
                                        <div className="absolute bottom-3 left-4 text-white drop-shadow-md">
                                            <p className="font-serif text-xl">{Number(similar.price || 0).toLocaleString('fr-FR')} DH</p>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-serif text-lg text-primary mb-1 group-hover:text-accent transition-colors">
                                            <Link href={`/proprietes/${similar.id}`} className="absolute inset-0 z-10">
                                                <span className="sr-only">Voir</span>
                                            </Link>
                                            {similar.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{similar.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Payment Modal */}
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    propertyTitle={property.title}
                    advanceAmount={property.type === 'Vente'
                        ? `${(Number(property.price || 0) * 0.1).toLocaleString('fr-FR')} DH (10%)`
                        : `${((totalPrice || 0) * 0.1).toLocaleString('fr-FR')} DH (10% du séjour)`}
                    totalAmount={property.type === 'Location' && totalPrice ? `${totalPrice.toLocaleString('fr-FR')} DH` : undefined}
                    settings={settings}
                />
            </div>
        </div>
    );
}
