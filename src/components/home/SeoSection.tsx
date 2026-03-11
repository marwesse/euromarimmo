"use client";

import { motion } from "framer-motion";

export function SeoSection() {
    return (
        <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl md:text-3xl font-serif text-primary mb-6 text-center md:text-left">
                        L&apos;Investissement Immobilier d&apos;Excellence au Maroc
                    </h2>

                    <div className="space-y-4 text-gray-600 font-light text-sm md:text-base leading-relaxed">
                        <p>
                            Bienvenue chez EUROMAR IMMO, votre <strong className="font-medium text-gray-800">agence immobilière Casablanca</strong> de référence, spécialisée dans la transaction de biens de très haut standing. Depuis plusieurs années, nous nous imposons comme le partenaire de choix pour concrétiser votre idéal, que vous envisagiez un <strong className="font-medium text-gray-800">achat villa de luxe</strong> aux finitions irréprochables ou que vous planifiez un <strong className="font-medium text-gray-800">investissement immobilier Maroc</strong> à fort potentiel de valorisation. Notre métier est de transformer vos ambitions en réalité.
                        </p>
                        <p>
                            Notre portefeuille, rigoureusement sélectionné et souvent confidentiel, met en lumière des <strong className="font-medium text-gray-800">propriétés exclusives</strong>. Il se compose de demeures majestueuses nichées dans les quartiers les plus prestigieux tels qu&apos;Anfa Supérieur, Californie ou Dar Bouazza, ainsi que de somptueux <strong className="font-medium text-gray-800">appartements haut standing</strong> offrant des panoramas imprenables, du cœur battant du Maarif jusqu&apos;au front de mer de la Corniche.
                        </p>
                        <p>
                            Nous savons que les attentes d&apos;une clientèle d&apos;élite nécessitent une parfaite intelligence du <strong className="font-medium text-gray-800">marché immobilier marocain</strong>, en constante évolution. C&apos;est pourquoi nous analysons chaque opportunité sous l&apos;angle de la pérennité architecturale et du rendement financier. Nous offrons bien plus qu&apos;une simple mise en relation ; nous délivrons un <strong className="font-medium text-gray-800">accompagnement sur mesure</strong>, global et en toute discrétion. De la recherche personnalisée jusqu&apos;a la signature finale, nos conseillers dévoués orchestrent chaque détail pour vous garantir une expérience sécurisée, fluide et empreinte d&apos;une élégance absolue.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
