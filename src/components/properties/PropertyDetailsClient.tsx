"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, Bath, SquareMenu, Calendar, Check, ArrowLeft, Phone, Mail, User, ChevronLeft, ChevronRight, CalendarDays, MessageCircle, CreditCard, Landmark, Users, Clock, Plus, Minus, MapPin, CheckCircle2, Maximize, X, Building } from "lucide-react";
import { PaymentModal } from "@/components/properties/PaymentModal";
import { submitLead } from "@/app/actions/lead-actions";
import { getConsistentViewCount } from "@/utils/socialProof";
import { useCurrency } from "@/context/CurrencyContext";
import { PropertySimulator } from "@/components/properties/PropertySimulator";
import { SimilarProperties } from "@/components/properties/SimilarProperties";

interface PropertyDetailsProps {
    property: any;
    similarProperties: any[];
    settings: any;
}

export function PropertyDetailsClient({ property, similarProperties, settings }: PropertyDetailsProps) {
    const pathname = usePathname();

    const { formatPrice, currency } = useCurrency();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Booking & Payment State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [nights, setNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isPaymentRevealed, setIsPaymentRevealed] = useState(false);
    const [finalMessage, setFinalMessage] = useState<string | null>(null);

    // VIP Reservation Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('sur_place');

    const today = new Date().toISOString().split('T')[0];

    // Additional Reservation Details
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [arrivalTime, setArrivalTime] = useState("");

    const isStudio = property?.type?.toLowerCase() === 'studio';
    const maxGuests = isStudio ? 2 : (property?.capacity || 8);

    // Effect to calculate nights and total price for rentals
    useEffect(() => {
        const isRental = property?.transactiontype === 'Location' || property?.type === 'Location';
        if (isRental && checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            if (end > start) {
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setNights(diffDays);
                const rawTotal = diffDays * Number(property.price || 0);
                setTotalPrice(rawTotal);

                // Apply Discount logic
                if (settings?.discount_days_threshold && diffDays >= settings.discount_days_threshold) {
                    const discount = rawTotal * (settings.discount_percentage / 100);
                    setDiscountedTotal(rawTotal - discount);
                } else {
                    setDiscountedTotal(null);
                }
            } else {
                setNights(0);
                setTotalPrice(null);
                setDiscountedTotal(null);
            }
        }
    }, [checkIn, checkOut, property, settings]);

    const nextImage = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (!property.images?.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (!property.images?.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    const whatsappMessage = `Bonjour EUROMAR IMMO, je suis intéressé(e) par le bien "${property.title}".`;
    const whatsappUrl = `https://wa.me/${settings.whatsapp_number.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="pt-24 md:pt-32 pb-24 md:pb-32 bg-bg-offwhite dark:bg-[#0f131a] min-h-screen relative">
            <div className="container mx-auto px-4 md:px-8">

                {/* Back Button */}
                <Link href={`/proprietes`} className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-6 text-sm font-medium relative z-10">
                    <ArrowLeft className="w-4 h-4" />
                    Retour au catalogue
                </Link>

                {/* Scarcity Banner */}
                <div className="mb-6 md:mb-8 bg-orange-50/80 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm text-center sm:text-left text-orange-800 dark:text-orange-400 font-medium shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
                    <span className="text-xl sm:text-lg animate-pulse inline-block text-orange-500">⚡</span>
                    <span>Ne manquez pas cette opportunité. <strong className="font-bold">{getConsistentViewCount(property.id || property.title)}</strong> personnes ont regardé ce bien aujourd&apos;hui.</span>
                </div>

                {/* Header Section (Moved down) */}

                {/* Editorial Museum Frame Image Slider */}
                <div className="max-w-4xl mx-auto w-full p-2 md:p-3 bg-white/5 md:bg-white border border-zinc-200 dark:border-white/10 shadow-2xl rounded-2xl md:rounded-[2rem] mt-6 md:mt-8 mb-4 md:mb-6">
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl md:rounded-[1.5rem] overflow-hidden group">
                        {/* Main Images with Crossfade */}
                        {property.images && property.images.length > 0 ? (
                            property.images.map((img: string, idx: number) => (
                                <img
                                    key={idx}
                                    src={img || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}
                                    alt={`Image ${idx + 1} de la propriété`}
                                    className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${currentImageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                        }`}
                                />
                            ))
                        ) : (
                            <img
                                src={'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}
                                alt="Image par défaut"
                                className="absolute inset-0 object-cover w-full h-full"
                            />
                        )}

                        {/* Gradient overlay for better button visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

                        {/* Navigation Buttons */}
                        {(property.images?.length || 0) > 1 && (
                            <div className="z-30">
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 disabled:opacity-50 z-30"
                                    aria-label="Image précédente"
                                >
                                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 disabled:opacity-50 z-30"
                                    aria-label="Image suivante"
                                >
                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Interactive Thumbnails (Boutique Style) */}
                {(property.images?.length || 0) > 1 && (
                    <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-2 max-w-4xl mx-auto overflow-x-auto pb-4 scrollbar-hide px-2">
                        {property.images.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setCurrentImageIndex(idx);
                                }}
                                className={`flex-shrink-0 transition-all duration-300 border-b-2 pb-1.5 ${currentImageIndex === idx
                                    ? 'border-[#D4AF37] opacity-100'
                                    : 'border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                                    }`}
                                aria-label={`Voir miniature ${idx + 1}`}
                            >
                                <div className="w-16 h-12 md:w-24 md:h-[72px] rounded-md md:rounded-lg overflow-hidden shadow-sm">
                                    <img
                                        src={img || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=60'}
                                        alt={`Miniature ${idx + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Content & Sidebar Grid (70/30) */}
                <div className="max-w-7xl mx-auto mt-12 mb-24 max-w-[1600px]">
                    <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-12 relative">
                        {/* 70% Left Column */}
                        <div className="lg:col-span-2">
                            {/* Header Section (Moved here) */}
                            <div className="mb-8">
                                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                                    <span className={`px-2.5 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-white ${property.status === 'Nouveau' ? 'bg-accent' :
                                        property.status === 'Vendu' ? 'bg-red-800' : 'bg-primary/80 backdrop-blur-sm'
                                        } `}>
                                        {property.status || 'Nouveau'}
                                    </span>
                                    <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-white bg-black/50 border border-white/20 backdrop-blur-md">
                                        {property.transactiontype === 'Vente' || property.type === 'Vente' ? 'À Vendre' : 'À Louer'}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 font-medium text-xs md:text-sm">{property.type}</span>
                                </div>
                                <h1 className="font-serif text-4xl md:text-5xl font-light text-zinc-900 dark:text-white mb-2 leading-tight break-words">{property.title}</h1>
                                <p className="text-zinc-500 dark:text-gray-400 text-lg flex items-center gap-2 mt-2">
                                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                                    {property.location}
                                </p>
                            </div>

                            {/* Minimalist Specs Bar */}
                            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-zinc-200 dark:border-white/10 mt-8 mb-8">
                                <div className="flex items-center gap-3">
                                    <BedDouble className="w-5 h-5 text-zinc-400" />
                                    <span className="font-medium text-zinc-900 dark:text-white text-lg">{property.bedrooms || property.features?.beds || 0} <span className="text-zinc-500 font-normal">Chambres</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Bath className="w-5 h-5 text-zinc-400" />
                                    <span className="font-medium text-zinc-900 dark:text-white text-lg">{property.bathrooms || property.features?.baths || 0} <span className="text-zinc-500 font-normal">Bains</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Maximize className="w-5 h-5 text-zinc-400" />
                                    <span className="font-medium text-zinc-900 dark:text-white text-lg">{property.surface || property.features?.area || 0} <span className="text-zinc-500 font-normal">m²</span></span>
                                </div>
                            </div>

                            {/* Description - Magazine Typography */}
                            <div className="w-full max-w-full overflow-hidden mb-12">
                                <h2 className="font-serif text-2xl md:text-3xl text-zinc-900 dark:text-white mb-6">À propos de ce bien</h2>
                                <div className="text-zinc-600 dark:text-gray-300 w-full">
                                    <p className="text-lg leading-relaxed whitespace-pre-line break-words w-full hyphens-auto first-letter:text-5xl first-letter:font-bold first-letter:text-[#D4AF37] first-letter:mr-3 first-letter:float-left">{property.description}</p>
                                </div>
                            </div>

                            {/* Amenities Box Grid */}
                            {property.amenities && property.amenities.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="font-serif text-2xl text-zinc-900 dark:text-white mb-6">Prestations & Équipements</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {property.amenities.map((amenity: string, index: number) => (
                                            <div key={index} className="bg-zinc-50 dark:bg-white/5 p-4 rounded-xl flex items-center gap-3 border border-transparent dark:border-white/10">
                                                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                                                <span className="text-zinc-700 dark:text-gray-300 font-medium text-sm sm:text-base">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Mortgage Simulator (Only for Vente) */}
                            {(property.transactiontype === 'Vente' || property.type === 'Vente') && (property.price || property.priceNumeric) && (
                                <div>
                                    <PropertySimulator propertyPrice={property.priceNumeric || property.price} />
                                </div>
                            )}
                        </div>

                        {/* 30% Right Column: VIP Sticky Card */}
                        <div className="lg:col-span-1 border border-transparent">
                            <div className="sticky top-32 bg-white dark:bg-[#1a202c]/50 border border-zinc-200 dark:border-white/10 shadow-2xl rounded-[2rem] p-8 h-fit z-10 w-full">
                                {/* Price */}
                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-zinc-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                                        {property.transactiontype === 'Vente' || property.type === 'Vente' ? 'Prix de vente' : 'À partir de'}
                                    </p>
                                    <p className="font-serif text-3xl font-bold text-zinc-900 dark:text-white break-words">
                                        {formatPrice(property.priceNumeric || property.price)}
                                        {(property.transactiontype === 'Location' || property.type === 'Location') && <span className="text-lg text-zinc-500 font-normal"> / nuit</span>}
                                    </p>
                                </div>

                                <hr className="border-zinc-200 dark:border-white/10 mb-6" />

                                {/* Agent Section */}
                                <div className="mb-6">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Votre Conseiller VIP</p>
                                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-white/5 p-4 rounded-xl border border-transparent dark:border-white/10">
                                        <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-[#D4AF37] font-serif text-xl border border-[#D4AF37]/30">
                                            E
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-white">Euromar Immo</p>
                                            <p className="text-xs text-zinc-500">Service d&apos;excellence 24/7</p>
                                        </div>
                                    </div>
                                </div>

                                {/* VIP CTA Button */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded-xl hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-white transition-colors flex justify-center items-center gap-2 group shadow-lg"
                                >
                                    Réserver ce bien
                                </button>

                                <p className="text-sm text-zinc-500 dark:text-gray-400 text-center mt-4">
                                    Accompagnement confidentiel de A à Z.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Similar Properties */}
                <SimilarProperties similarProperties={similarProperties} />

                {/* Payment Modal */}
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    propertyTitle={property.title}
                    advanceAmount={property.transactiontype === 'Vente' || property.type === 'Vente'
                        ? `${formatPrice((property.priceNumeric || property.price || 0) * 0.1)} (10%)`
                        : `${formatPrice(((discountedTotal ?? totalPrice) || 0) * 0.1)} (10% du séjour)`}
                    totalAmount={(property.transactiontype === 'Location' || property.type === 'Location') && totalPrice ? formatPrice(discountedTotal ?? totalPrice) : undefined}
                    settings={settings}
                />
            </div>

            {/* Mobile Sticky Reservation Button */}
            <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/95 dark:bg-[#0f131a]/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10 lg:hidden z-40 transform transition-transform duration-300">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-3 sm:py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-colors"
                >
                    Réserver ce bien
                </button>
            </div>

            {/* VIP Reservation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
                    <div className="bg-white dark:bg-[#0f131a] w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-300">
                        {/* Close button */}
                        <button
                            onClick={() => { setIsModalOpen(false); setIsSuccess(false); }}
                            className="absolute top-4 right-4 p-2 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-zinc-600 dark:text-gray-300" />
                        </button>

                        <div className="p-6 md:p-8">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                                    <CheckCircle2 className="w-20 h-20 text-[#D4AF37] animate-bounce mb-6" />
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">Demande de Réservation Envoyée</h3>
                                    <p className="text-zinc-500 dark:text-gray-400 mt-4 leading-relaxed">
                                        Notre service de conciergerie vous contactera dans les plus brefs délais pour confirmer les détails.
                                    </p>
                                    <button
                                        onClick={() => { setIsSuccess(false); setIsModalOpen(false); }}
                                        className="mt-8 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-8 py-3 rounded-xl font-bold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-colors"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Demande de Réservation</h3>
                                    <p className="text-zinc-500 dark:text-gray-400 mb-6 font-medium">Réservez votre séjour d'exception</p>

                                    {/* Form */}
                                    <form onSubmit={(e) => {
                                        e.preventDefault();

                                        const form = e.currentTarget;
                                        const formData = new FormData(form);
                                        formData.append("payment_method", paymentMethod === 'sur_place' ? "Sur Place" : "RIB");
                                        // Append new fields
                                        formData.append("checkIn", checkIn);
                                        formData.append("checkOut", checkOut);
                                        formData.append("adults", adults.toString());
                                        formData.append("children", children.toString());

                                        setIsSubmitting(true);

                                        submitLead(formData).then((result) => {
                                            setIsSubmitting(false);
                                            if (result?.success) {
                                                setSubmitSuccess(true);
                                                setIsSuccess(true);
                                            }
                                        }).catch(() => {
                                            setIsSubmitting(false);
                                            alert("Une erreur est survenue.");
                                        });
                                    }} className="space-y-4">

                                        <input type="hidden" name="source" value={`Réservation Modal - ${property.title}`} />
                                        <input type="hidden" name="message" value={`Demande VIP pour ${property.title}.\nDu: ${checkIn} Au: ${checkOut}\nVoyageurs: ${adults} Adultes, ${children} Enfants`} />

                                        {/* Validation Badge */}
                                        {isStudio && (
                                            <div className="text-xs text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5 rounded-full w-fit mb-4 mt-2 font-medium flex items-center gap-2">
                                                <User className="w-3.5 h-3.5" /> Capacité max : 2 personnes (Studio)
                                            </div>
                                        )}

                                        {/* Dates */}
                                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                            <div className="w-full">
                                                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Arrivée</label>
                                                <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} required
                                                    className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 dark:text-white rounded-xl p-3 w-full focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 block">Départ</label>
                                                <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} required
                                                    className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 dark:text-white rounded-xl p-3 w-full focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Guests */}
                                        <div className="flex items-center justify-between bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-3 rounded-xl mb-3">
                                            <div>
                                                <p className="font-semibold text-zinc-900 dark:text-white text-sm">Adultes</p>
                                                <p className="text-xs text-zinc-500 mt-0.5">13 ans et plus</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button type="button" onClick={() => setAdults(prev => Math.max(1, prev - 1))} className="p-1.5 rounded-full border border-zinc-300 dark:border-white/20 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 transition-colors">
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-4 text-center font-medium text-zinc-900 dark:text-white text-sm">{adults}</span>
                                                <button type="button" disabled={adults + children >= maxGuests} onClick={() => setAdults(prev => Math.min(maxGuests - children, prev + 1))} className="p-1.5 rounded-full border border-zinc-300 dark:border-white/20 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 transition-colors bg-white dark:bg-white/5 shadow-sm">
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-3 rounded-xl mb-6">
                                            <div>
                                                <p className="font-semibold text-zinc-900 dark:text-white text-sm">Enfants</p>
                                                <p className="text-xs text-zinc-500 mt-0.5">2 - 12 ans</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button type="button" onClick={() => setChildren(prev => Math.max(0, prev - 1))} className="p-1.5 rounded-full border border-zinc-300 dark:border-white/20 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 transition-colors">
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-4 text-center font-medium text-zinc-900 dark:text-white text-sm">{children}</span>
                                                <button type="button" disabled={adults + children >= maxGuests} onClick={() => setChildren(prev => Math.min(maxGuests - adults, prev + 1))} className="p-1.5 rounded-full border border-zinc-300 dark:border-white/20 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 transition-colors bg-white dark:bg-white/5 shadow-sm">
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quick Fields */}
                                        <div>
                                            <input type="text" name="name" placeholder="Nom complet" required
                                                className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 dark:text-white rounded-xl p-3 w-full focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <input type="tel" name="phone" placeholder="Téléphone" required
                                                className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 dark:text-white rounded-xl p-3 w-full focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <input type="email" name="email" placeholder="Adresse email" required
                                                className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 dark:text-white rounded-xl p-3 w-full focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                                            />
                                        </div>

                                        {/* Payment Methods */}
                                        <div className="space-y-3 pt-2">
                                            <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Méthode de Paiement</h4>

                                            {/* Option 1: Sur place */}
                                            <div
                                                onClick={() => setPaymentMethod('sur_place')}
                                                className={`p-4 rounded-xl cursor-pointer transition-all flex items-start gap-4 ${paymentMethod === 'sur_place'
                                                    ? 'border-2 border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                                                    : 'border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#D4AF37]/50'
                                                    }`}
                                            >
                                                <div className={`p-2 rounded-lg ${paymentMethod === 'sur_place' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-gray-400'}`}>
                                                    <Building className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className={`font-bold ${paymentMethod === 'sur_place' ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-gray-300'}`}>Payer à l'agence</p>
                                                    <p className="text-xs text-zinc-500 dark:text-gray-400 mt-0.5">Prenez rendez-vous pour finaliser sur place</p>
                                                </div>
                                            </div>

                                            {/* Option 2: Virement Bancaire */}
                                            <div
                                                onClick={() => setPaymentMethod('virement')}
                                                className={`p-4 rounded-xl cursor-pointer transition-all flex items-start gap-4 ${paymentMethod === 'virement'
                                                    ? 'border-2 border-[#D4AF37] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10'
                                                    : 'border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#D4AF37]/50'
                                                    }`}
                                            >
                                                <div className={`p-2 rounded-lg ${paymentMethod === 'virement' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-gray-400'}`}>
                                                    <Landmark className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className={`font-bold ${paymentMethod === 'virement' ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-gray-300'}`}>Virement Bancaire (RIB)</p>
                                                    <p className="text-xs text-zinc-500 dark:text-gray-400 mt-0.5">Recevez notre RIB pour un transfert sécurisé</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded-xl hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-white transition-colors mt-6 disabled:opacity-70 flex justify-center items-center"
                                        >
                                            {isSubmitting ? "Traitement..." : "Confirmer la Réservation"}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}
