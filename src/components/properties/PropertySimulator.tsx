"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface PropertySimulatorProps {
    propertyPrice: number;
}

export function PropertySimulator({ propertyPrice }: PropertySimulatorProps) {
    const { formatPrice } = useCurrency();

    // Convert propertyPrice to number safely just in case
    const safePrice = Number(propertyPrice || 0);

    // Simulator State
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [years, setYears] = useState(15);
    const rate = 4.5; // Fixed approximate interest rate 4.5%

    // Calculations
    const downPaymentAmount = safePrice * (downPaymentPercent / 100);
    const loanAmount = safePrice - downPaymentAmount;

    // Simple amortization formula
    const calculateMonthlyPayment = () => {
        const monthlyRate = (rate / 100) / 12;
        const numberOfPayments = years * 12;
        if (loanAmount <= 0) return 0;
        if (monthlyRate === 0) return loanAmount / numberOfPayments;
        const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        return payment;
    };

    const monthlyPayment = calculateMonthlyPayment();

    return (
        <div className="bg-white dark:bg-[#1a202c]/50 rounded-2xl p-6 lg:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-white/10 mt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-primary dark:text-white">
                    Simulateur de Crédit
                </h3>
            </div>

            <div className="space-y-8">
                {/* Down Payment Slider */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                            Apport initial ({downPaymentPercent}%)
                        </label>
                        <span className="text-lg font-serif text-primary dark:text-white">
                            {formatPrice(downPaymentAmount)}
                        </span>
                    </div>
                    <div className="relative pt-2 pb-6">
                        <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                        />
                        {/* Custom progress bar visually behind the thumb */}
                        <div
                            className="absolute top-[8px] -translate-y-1/2 left-0 h-1.5 bg-accent rounded-l-lg pointer-events-none opacity-50"
                            style={{ width: `${((downPaymentPercent - 10) / (100 - 10)) * 100}%` }}
                        />
                        <div className="flex justify-between mt-2 text-[10px] font-medium text-gray-400 absolute w-full bottom-0">
                            <span>10%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>

                {/* Duration Picker */}
                <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4">
                        Durée du prêt
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {[10, 15, 20].map((y) => (
                            <button
                                key={y}
                                onClick={() => setYears(y)}
                                className={`py-2 rounded-lg text-sm font-medium transition-all border ${years === y
                                        ? "bg-accent text-white border-accent shadow-sm"
                                        : "bg-gray-50 dark:bg-black/20 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-white/10 hover:border-accent hover:text-accent"
                                    }`}
                            >
                                {y} ans
                            </button>
                        ))}
                    </div>
                </div>

                {/* Calculation Result */}
                <div className="bg-primary rounded-xl p-5 md:p-6 text-center relative overflow-hidden group mt-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-2">
                            Mensualité estimée
                        </p>
                        <p className="font-serif text-3xl md:text-3xl text-white mb-2 drop-shadow-sm">
                            {formatPrice(monthlyPayment)} <span className="text-sm font-sans text-white/60 font-medium">/ mois</span>
                        </p>
                        <p className="text-white/40 text-[10px]">
                            Taux estimatif pondéré : {rate}%
                        </p>
                    </div>
                </div>

                <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                    *Simulation donnée à titre indicatif et ne constituant pas une offre de prêt. Contactez nos conseillers pour une étude personnalisée.
                </p>
            </div>
        </div>
    );
}
