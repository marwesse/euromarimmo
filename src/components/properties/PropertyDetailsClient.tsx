"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, Bath, SquareMenu, Calendar, Check, ArrowLeft, Phone, Mail, User, ChevronLeft, ChevronRight, CalendarDays, MessageCircle, CreditCard, Landmark, Users, Clock, Plus, Minus } from "lucide-react";
import { PaymentModal } from "@/components/properties/PaymentModal";
import { submitLead } from "@/app/actions/lead-actions";
import { getConsistentViewCount } from "@/utils/socialProof";
import { useCurrency } from "@/context/CurrencyContext";
import { PropertySimulator } from "@/components/properties/PropertySimulator";

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

    // Additional Reservation Details
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [arrivalTime, setArrivalTime] = useState("");

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
                <div className="mb-8 bg-orange-50/80 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 rounded-xl p-3 flex items-center justify-center gap-2 text-sm text-orange-800 dark:text-orange-400 font-medium shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
                    <span className="text-lg animate-pulse inline-block text-orange-500">⚡</span>
                    Ne manquez pas cette opportunité. <strong className="font-bold">{getConsistentViewCount(property.id || property.title)}</strong> personnes ont regardé ce bien aujourd'hui.
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${property.status === 'Nouveau' ? 'bg-accent' :
                                property.status === 'Vendu' ? 'bg-red-800' : 'bg-primary/80 backdrop-blur-sm'
                                } `}>
                                {property.status || 'Nouveau'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black/50 border border-white/20 backdrop-blur-md">
                                {property.transactiontype === 'Vente' || property.type === 'Vente' ? 'À Vendre' : 'À Louer'}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">{property.type}</span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl text-primary dark:text-white mb-2 leading-tight">{property.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg flex items-center gap-2">
                            {property.location}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                            {property.transactiontype === 'Vente' || property.type === 'Vente' ? 'Prix de vente' : 'Prix par nuit'}
                        </p>
                        <p className="font-serif text-3xl md:text-4xl text-accent">{formatPrice(property.priceNumeric || property.price)}</p>
                    </div>
                </div>

                {/* Image Slider */}
                <div className="relative mb-8 md:mb-12 h-[400px] sm:h-[500px] md:h-[700px] lg:h-[80vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group w-full max-w-[1600px] mx-auto">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out hover:scale-105"
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setCurrentImageIndex(idx);
                                        }}
                                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                        aria-label={`Aller à l'image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Content & Sidebar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                    <div className="lg:col-span-2 space-y-8 md:space-y-12">
                        {/* Key Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-200 dark:border-white/10">
                            <div className="flex flex-col gap-2">
                                <BedDouble className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Chambres</span>
                                <span className="font-bold text-primary dark:text-white text-xl">{property.bedrooms || property.features?.beds || 0}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Bath className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Salles de bain</span>
                                <span className="font-bold text-primary dark:text-white text-xl">{property.bathrooms || property.features?.baths || 0}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <SquareMenu className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Surface</span>
                                <span className="font-bold text-primary dark:text-white text-xl">{property.surface || property.features?.area || 0} m²</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Calendar className="w-6 h-6 text-accent" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Année</span>
                                <span className="font-bold text-primary dark:text-white text-xl">{property.yearBuilt || property.features?.yearBuilt || '-'}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="font-serif text-2xl text-primary dark:text-white mb-6">À propos de ce bien</h2>
                            <div className="prose prose-lg text-gray-600 dark:text-gray-300">
                                <p className="leading-relaxed whitespace-pre-line">{property.description}</p>
                            </div>
                        </div>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div>
                                <h2 className="font-serif text-2xl text-primary dark:text-white mb-6">Prestations & Équipements</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {property.amenities.map((amenity: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                                <Check className="w-4 h-4 text-accent" />
                                            </div>
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Mortgage Simulator (Only for Vente) */}
                        {(property.transactiontype === 'Vente' || property.type === 'Vente') && (property.price || property.priceNumeric) && (
                            <div>
                                <PropertySimulator propertyPrice={property.priceNumeric || property.price} />
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 border border-transparent">
                        <div id="reservation-section" className="bg-white dark:bg-[#1a202c]/50 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-white/10 sticky top-24 md:top-28 scroll-mt-24 md:scroll-mt-28">
                            <h3 className="font-serif text-xl sm:text-2xl text-primary dark:text-white mb-6">
                                {property.transactiontype === 'Vente' || property.type === 'Vente' ? 'Intéressé(e) ?' : 'Réserver ce bien'}
                            </h3>

                            {/* Booking Widget for Rentals */}
                            {(property.transactiontype === 'Location' || property.type === 'Location') && (
                                <div className="mb-8 p-5 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/10">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Arrivée</label>
                                            <div className="relative">
                                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                    className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 dark:text-white rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-text appearance-none"
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Départ</label>
                                            <div className="relative">
                                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                    className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 dark:text-white rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-text appearance-none"
                                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>

                                        {/* New Fields: Arrival Time & Guests */}
                                        <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Détails du séjour</label>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Adultes</span>
                                                    <div className="flex items-center justify-between bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-lg p-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdults(Math.max(1, adults - 1))}
                                                            className="p-1 text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="font-medium text-sm dark:text-white">{adults}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdults(adults + 1)}
                                                            className="p-1 text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Enfants</span>
                                                    <div className="flex items-center justify-between bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-lg p-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => setChildren(Math.max(0, children - 1))}
                                                            className="p-1 text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="font-medium text-sm dark:text-white">{children}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setChildren(children + 1)}
                                                            className="p-1 text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Heure d&apos;arrivée estimée</span>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                    <input
                                                        type="time"
                                                        value={arrivalTime}
                                                        onChange={(e) => setArrivalTime(e.target.value)}
                                                        className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 dark:text-white rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-text appearance-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-start gap-1">
                                            <span className="text-accent">*</span>
                                            La réservation d&apos;une journée se termine à {settings?.checkout_time || "12:00"} chaque jour.
                                        </p>

                                        {/* Dynamic Price Summary */}
                                        {nights > 0 && totalPrice !== null && (
                                            <div className="mt-2 pt-4 border-t border-gray-200 dark:border-white/10">
                                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                    <span>{formatPrice(property.priceNumeric || property.price)} x {nights} {nights > 1 ? 'nuits' : 'nuit'}</span>
                                                    <span className={discountedTotal !== null ? "line-through text-gray-400" : ""}>{formatPrice(totalPrice)}</span>
                                                </div>
                                                {discountedTotal !== null && (
                                                    <div className="flex justify-between items-center text-sm text-accent mb-2">
                                                        <span>Remise long séjour ({settings.discount_percentage}%)</span>
                                                        <span>-{(totalPrice - discountedTotal).toLocaleString()} DH</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-center font-bold text-primary dark:text-white mt-3">
                                                    <span>Total</span>
                                                    <span>{(discountedTotal ?? totalPrice).toLocaleString()} DH</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Form Input Data - Moved Above CTA */}
                            <form className="space-y-4 mb-8" id="reservation-form" onSubmit={(e) => {
                                e.preventDefault();
                                // Basic validation before revealing payment methods
                                const form = e.currentTarget;
                                if (form.checkValidity()) {
                                    setIsPaymentRevealed(true);
                                    // Scroll slightly down to show the payment options if on small screens
                                    setTimeout(() => {
                                        document.getElementById('payment-options')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    }, 100);
                                } else {
                                    form.reportValidity();
                                }
                            }}>
                                <input type="hidden" name="source" value={nights > 0 ? `Réservation - ${property.title}` : `Contact - ${property.title}`} />
                                <div>
                                    <label className="sr-only">Nom complet</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type="text" name="name" id="userName" placeholder="Nom complet" required readOnly={isPaymentRevealed || submitSuccess} className="w-full bg-bg-offwhite dark:bg-black/20 border border-transparent dark:border-white/10 dark:text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-accent focus:bg-white dark:focus:bg-black/40 transition-colors read-only:opacity-50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="sr-only">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type="email" name="email" id="userEmail" placeholder="Adresse email" required readOnly={isPaymentRevealed || submitSuccess} className="w-full bg-bg-offwhite dark:bg-black/20 border border-transparent dark:border-white/10 dark:text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-accent focus:bg-white dark:focus:bg-black/40 transition-colors read-only:opacity-50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="sr-only">Téléphone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input type="tel" name="phone" id="userPhone" placeholder="Téléphone" readOnly={isPaymentRevealed || submitSuccess} className="w-full bg-bg-offwhite dark:bg-black/20 border border-transparent dark:border-white/10 dark:text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-accent focus:bg-white dark:focus:bg-black/40 transition-colors read-only:opacity-50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="sr-only">Message</label>
                                    <textarea name="message" id="userMessage" rows={4} readOnly={isPaymentRevealed || submitSuccess} placeholder="Je souhaite obtenir plus d'informations sur ce bien..." required className="w-full bg-bg-offwhite dark:bg-black/20 border border-transparent dark:border-white/10 dark:text-white rounded-lg py-3 px-4 focus:outline-none focus:border-accent focus:bg-white dark:focus:bg-black/40 transition-colors resize-none read-only:opacity-50"></textarea>
                                </div>

                                {!isPaymentRevealed && !submitSuccess && (
                                    <button type="submit" className="w-full bg-primary dark:bg-accent hover:bg-primary/90 dark:hover:opacity-90 text-white font-medium py-4 rounded-lg transition-all shadow-md">
                                        Passer au paiement
                                    </button>
                                )}
                            </form>

                            {/* Final Success Message */}
                            {submitSuccess && finalMessage && (
                                <div className="mt-6 p-6 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h4 className="text-lg font-serif text-green-800 dark:text-green-400 mb-2">Demande Confirmée</h4>
                                    <p className="text-sm text-green-700 dark:text-green-500/80 leading-relaxed font-medium">
                                        {finalMessage}
                                    </p>
                                </div>
                            )}

                            {/* Payment Options - Revealed after initial form validation */}
                            {isPaymentRevealed && !submitSuccess && (
                                <div id="payment-options" className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out mt-6 pt-6 border-t border-gray-100 dark:border-white/10">
                                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center mb-4">Choisissez un moyen de paiement</h4>

                                    {settings?.enable_cash !== false && (
                                        <button
                                            onClick={async () => {
                                                const form = document.getElementById("reservation-form") as HTMLFormElement;
                                                const formData = new FormData(form);
                                                formData.append("payment_method", "Cash");

                                                setIsSubmitting(true);
                                                const message = formData.get("message") as string;
                                                const dateInfo = nights > 0 ? `\nDu : ${checkIn}\nAu : ${checkOut}\nTotal Nuits : ${nights}` : "";
                                                const guestInfo = nights > 0 ? `\nAdultes: ${adults}, Enfants: ${children}\nHeure d'arrivée: ${arrivalTime || "Non précisée"}` : "";
                                                formData.set("message", `[Concernant ${property.title}][Paiement: Sur Place]${dateInfo}${guestInfo}\n\n` + message);

                                                const result = await submitLead(formData);
                                                setIsSubmitting(false);

                                                if (result?.success) {
                                                    setSubmitSuccess(true);
                                                    setFinalMessage("Demande de réservation confirmée. Une réponse vous sera envoyée dans moins de 2 heures.");
                                                }
                                            }}
                                            disabled={isSubmitting}
                                            className="w-full bg-white dark:bg-[#1a202c]/50 hover:bg-gray-50 dark:hover:bg-white/5 text-primary dark:text-white border-2 border-primary/20 dark:border-white/20 font-medium py-3.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                        >
                                            <Landmark className="w-5 h-5 text-primary/70 dark:text-white/70 group-hover:text-primary dark:group-hover:text-white" />
                                            {isSubmitting ? "Envoi..." : "Payer sur place"}
                                        </button>
                                    )}

                                    {settings?.enable_rib !== false && (
                                        <button
                                            onClick={async () => {
                                                const form = document.getElementById("reservation-form") as HTMLFormElement;
                                                const formData = new FormData(form);
                                                formData.append("payment_method", "RIB");

                                                setIsSubmitting(true);
                                                const message = formData.get("message") as string;
                                                const dateInfo = nights > 0 ? `\nDu : ${checkIn}\nAu : ${checkOut}\nTotal Nuits : ${nights}` : "";
                                                const guestInfo = nights > 0 ? `\nAdultes: ${adults}, Enfants: ${children}\nHeure d'arrivée: ${arrivalTime || "Non précisée"}` : "";
                                                formData.set("message", `[Concernant ${property.title}][Paiement: Virement Bancaire]${dateInfo}${guestInfo}\n\n` + message);

                                                const result = await submitLead(formData);
                                                setIsSubmitting(false);

                                                if (result?.success) {
                                                    setSubmitSuccess(true);
                                                    // Also open the modal to show RIB instantly
                                                    setIsPaymentModalOpen(true);
                                                    setFinalMessage("Demande enregistrée. Vous avez également reçu nos coordonnées bancaires par email pour procéder au paiement.");
                                                }
                                            }}
                                            disabled={isSubmitting}
                                            className="w-full bg-white dark:bg-[#1a202c]/50 hover:bg-gray-50 dark:hover:bg-white/5 text-primary dark:text-white border border-gray-200 dark:border-white/10 font-medium py-3.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                        >
                                            <Landmark className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                                            {isSubmitting ? "Envoi..." : "Virement Bancaire (RIB)"}
                                        </button>
                                    )}

                                    {settings?.enable_card !== false && (
                                        <button
                                            onClick={() => alert("Le paiement par carte bancaire sera bientôt disponible.")}
                                            disabled={isSubmitting}
                                            className="w-full bg-primary relative overflow-hidden dark:bg-gray-800 hover:bg-primary/90 dark:hover:bg-gray-700 text-white font-medium py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <CreditCard className="w-5 h-5 relative z-10" />
                                            <span className="relative z-10">Payer par carte bancaire</span>
                                            <div className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
                                        </button>
                                    )}

                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => setIsPaymentRevealed(false)}
                                            className="text-xs text-gray-400 hover:text-primary dark:hover:text-white underline"
                                        >
                                            Modifier mes coordonnées
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-gray-200 dark:border-white/10">
                        <h2 className="font-serif text-3xl text-primary dark:text-white mb-8">Biens Similaires</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {similarProperties.map((similar: any) => (
                                <div key={similar.id} className="relative bg-white dark:bg-[#1a202c]/50 rounded-xl overflow-hidden shadow-sm dark:shadow-none dark:border dark:border-white/10 group">
                                    <Link href={`/proprietes/${similar.id}`} className="relative h-56 overflow-hidden block">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url('${similar.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80'}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gray-200 dark:bg-black/50 -z-10 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500">[Image]</div>
                                        <div className="absolute bottom-3 left-4 text-white drop-shadow-md">
                                            <p className="font-serif text-xl">{formatPrice(similar.priceNumeric || similar.price)}</p>
                                        </div>
                                    </Link>
                                    <div className="p-5">
                                        <h3 className="font-serif text-lg text-primary dark:text-white mb-1 group-hover:text-accent transition-colors">
                                            <Link href={`/proprietes/${similar.id}`}>
                                                {similar.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{similar.location}</p>
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
                    onClick={() => {
                        document.getElementById('reservation-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-primary dark:bg-accent text-white font-medium py-3 sm:py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    <Landmark className="w-5 h-5" />
                    Voir Réservation / Contact
                </button>
            </div>
        </div>
    );
}
