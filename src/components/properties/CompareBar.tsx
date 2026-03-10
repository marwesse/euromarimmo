"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { CompareModal } from "./CompareModal";

export function CompareBar() {
    const { selectedProperties, removeProperty, clearCompare, setIsComparing } = useCompare();

    if (selectedProperties.length === 0) return null;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 w-full z-40 bg-white/80 dark:bg-[#0f131a]/80 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] py-4 px-4 sm:px-8"
                >
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                                {selectedProperties.length}/3 <span className="hidden sm:inline">Sélectionnées</span>
                            </span>

                            <div className="flex items-center gap-3">
                                {selectedProperties.map((property) => (
                                    <div key={property.id} className="relative group">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-accent relative">
                                            <Image
                                                src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=60'}
                                                alt={property.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeProperty(property.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md z-10"
                                            title="Retirer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}

                                {Array.from({ length: Math.max(0, 3 - selectedProperties.length) }).map((_, i) => (
                                    <div key={`empty-${i}`} className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-black/20">
                                        <span className="text-gray-300 dark:text-gray-600 font-medium">+</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
                            <button
                                onClick={clearCompare}
                                className="text-gray-500 hover:text-red-500 transition-colors text-sm font-medium"
                            >
                                Vider
                            </button>
                            <button
                                onClick={() => setIsComparing(true)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors shadow-lg
                                    ${selectedProperties.length > 1
                                        ? 'bg-primary text-white hover:bg-accent dark:bg-white dark:text-primary dark:hover:bg-accent hover:text-white'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800'}`}
                                disabled={selectedProperties.length < 2}
                            >
                                <ArrowRightLeft className="w-4 h-4" />
                                Comparer les biens
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <CompareModal />
        </>
    );
}
