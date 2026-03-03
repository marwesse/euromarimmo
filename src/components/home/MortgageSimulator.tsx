"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";

export function MortgageSimulator() {
    const [amount, setAmount] = useState(5000000); // 5M DH
    const [rate, setRate] = useState(4.5); // 4.5%
    const [years, setYears] = useState(15);

    // Simple amortization formula
    const calculateMonthlyPayment = () => {
        const monthlyRate = (rate / 100) / 12;
        const numberOfPayments = years * 12;
        if (monthlyRate === 0) return amount / numberOfPayments;
        const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        return payment.toFixed(0);
    };

    const formatCurrency = (val: number | string) => {
        return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(Number(val));
    };

    return (
        <section className="py-32 bg-white dark:bg-[#0f131a] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 rounded-l-full blur-[120px] -z-10 pointer-events-none hidden lg:block" />

            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-4/12"
                    >
                        <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            <span className="text-accent font-semibold tracking-widest uppercase text-xs">Financement</span>
                        </span>

                        <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-white mb-6 leading-tight">
                            Simulez votre <br className="hidden lg:block" />Projet Immobilier
                        </h2>

                        <div className="space-y-6">
                            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                                Estimez le financement de votre future propriété. Cet outil vous donne une première approche de votre capacité d&apos;emprunt.
                            </p>

                            <div className="flex items-start gap-4 p-5 bg-bg-offwhite dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                                    <Calculator className="w-5 h-5 text-accent" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                    Cette simulation est donnée à titre indicatif et ne constitue pas une offre de prêt. Contactez nos conseillers pour une étude personnalisée.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:w-8/12 w-full"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-white dark:bg-[#1a202c]/50 rounded-[40px] shadow-[0_20px_60px_rgb(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-white/10 h-full w-full"></div>

                            <div className="relative bg-white dark:bg-transparent rounded-[40px] p-8 md:p-12">
                                <div className="space-y-10">

                                    {/* Montant slider */}
                                    <div>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
                                            <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Montant du prêt</label>
                                            <span className="text-3xl font-serif text-primary dark:text-white">{formatCurrency(amount)}</span>
                                        </div>
                                        <div className="relative py-4">
                                            <input
                                                type="range"
                                                min="1000000"
                                                max="50000000"
                                                step="500000"
                                                value={amount}
                                                onChange={(e) => setAmount(Number(e.target.value))}
                                                className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                                            />
                                            {/* Custom progress bar visually behind the thumb */}
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-accent rounded-l-lg pointer-events-none opacity-50"
                                                style={{ width: `${((amount - 1000000) / (50000000 - 1000000)) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            <span>1M DH</span>
                                            <span>50M DH</span>
                                        </div>
                                    </div>

                                    {/* Taux et Durée en ligne */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-6 border-t border-gray-100 dark:border-white/10">
                                        <div className="group">
                                            <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4 transition-colors group-focus-within:text-accent">Taux d&apos;intérêt (%)</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    type="number"
                                                    value={rate}
                                                    onChange={(e) => setRate(Number(e.target.value))}
                                                    step="0.1"
                                                    className="w-full bg-transparent border-b-2 border-gray-100 dark:border-white/10 py-3 text-primary dark:text-white font-serif text-2xl focus:outline-none focus:border-accent transition-colors"
                                                />
                                                <span className="absolute right-0 text-xl text-gray-400 font-serif pointer-events-none">%</span>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4 transition-colors group-focus-within:text-accent">Durée (Années)</label>
                                            <div className="relative flex items-center">
                                                <input
                                                    type="number"
                                                    value={years}
                                                    onChange={(e) => setYears(Number(e.target.value))}
                                                    max="30"
                                                    min="1"
                                                    className="w-full bg-transparent border-b-2 border-gray-100 dark:border-white/10 py-3 text-primary dark:text-white font-serif text-2xl focus:outline-none focus:border-accent transition-colors"
                                                />
                                                <span className="absolute right-0 text-lg text-gray-400 font-light pointer-events-none">Ans</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Résultat */}
                                    <div className="bg-primary rounded-3xl p-8 md:p-10 text-center mt-6 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative z-10">
                                            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">Mensualité Estimée</p>
                                            <p className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight drop-shadow-sm">{formatCurrency(calculateMonthlyPayment())}</p>

                                            <div className="inline-flex items-center justify-center gap-2 text-white/40 text-xs px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                                                *Simulation non contractuelle
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
