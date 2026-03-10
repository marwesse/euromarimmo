"use client";

import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/app/actions/settings-actions";

export default function SettingsPage() {
    const [settings, setSettings] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    useEffect(() => {
        async function loadSettings() {
            const data = await getSettings();
            setSettings(data);
            if (data?.logo_url) {
                setLogoPreview(data.logo_url);
            }
        }
        loadSettings();
    }, []);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage("");

        const formData = new FormData(e.currentTarget);
        const result = await updateSettings(formData);

        if (result?.success) {
            setMessage("Paramètres sauvegardés avec succès !");
        } else {
            setMessage("Erreur lors de la sauvegarde.");
        }
        setIsSaving(false);
    };

    if (!settings) return <div className="text-gray-500">Chargement des paramètres...</div>;

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Paramètres Globaux</h1>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a202c]/50 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 divide-y divide-gray-100 dark:divide-white/10">
                {/* Logo Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Logo du site</h2>
                    <div className="flex items-start gap-6">
                        <div className="shrink-0 w-32 h-32 bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
                            ) : (
                                <span className="text-gray-400 dark:text-gray-500 text-sm">Aucun logo</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Importer un nouveau logo</label>
                            <input
                                type="file"
                                name="logoFile"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-2">Format recommandé : PNG avec fond transparent. Max 2MB.</p>
                            {/* Hidden input to keep track of current URL if not replaced by file */}
                            <input type="hidden" name="logo_url" value={settings.logo_url || ""} />
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Contact & WhatsApp</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Numéro WhatsApp (avec indicatif)</label>
                            <input
                                type="text"
                                name="whatsapp_number"
                                defaultValue={settings.whatsapp_number}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                                placeholder="+212600692922"
                            />
                            <p className="text-xs text-gray-500 mt-1">Utilisé pour le bouton flottant et les modals de paiement.</p>
                        </div>
                    </div>
                </div>

                {/* Bank Details Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Coordonnées Bancaires (RIB)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titulaire du compte</label>
                            <input
                                type="text"
                                name="account_holder"
                                defaultValue={settings.account_holder}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom de la Banque</label>
                            <input
                                type="text"
                                name="bank_name"
                                defaultValue={settings.bank_name}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">RIB Complet</label>
                            <input
                                type="text"
                                name="rib_details"
                                defaultValue={settings.rib_details}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Email Settings Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Configuration Email (Brevo)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Administrateur (Réception)</label>
                            <input
                                type="email"
                                name="contact_email"
                                defaultValue={settings.contact_email}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                                placeholder="votre_email@domaine.com"
                            />
                            <p className="text-xs text-gray-500 mt-1">L'email sur lequel vous recevrez les notifications de réservations/contacts.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Clé API Brevo (v3)</label>
                            <input
                                type="text"
                                name="brevo_api_key"
                                defaultValue={settings.brevo_api_key}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                                placeholder="xkeysib-..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Utilisée pour l'envoi des formulaires de contact.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email d'Expéditeur (Brevo)</label>
                            <input
                                type="email"
                                name="sender_email"
                                defaultValue={settings.sender_email}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                                placeholder="khrousmail11@gmail.com"
                            />
                            <p className="text-xs text-gray-500 mt-1">L'email utilisé pour envoyer les messages depuis Brevo.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom d'Expéditeur</label>
                            <input
                                type="text"
                                name="sender_name"
                                defaultValue={settings.sender_name}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                                placeholder="EUROMAR IMMO"
                            />
                            <p className="text-xs text-gray-500 mt-1">Le nom qui apparaîtra comme expéditeur de l'email.</p>
                        </div>
                    </div>
                </div>

                {/* Reservation Settings Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Configuration des Réservations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seuil de remise (nuits)</label>
                            <input
                                type="number"
                                name="discount_days_threshold"
                                defaultValue={settings.discount_days_threshold}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                                placeholder="10"
                                min="1"
                            />
                            <p className="text-xs text-gray-500 mt-1">Nuits requises pour déclencher la remise.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pourcentage de remise (%)</label>
                            <input
                                type="number"
                                name="discount_percentage"
                                defaultValue={settings.discount_percentage}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                                placeholder="10"
                                min="0"
                                max="100"
                            />
                            <p className="text-xs text-gray-500 mt-1">Le montant de la réduction à appliquer.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Heure de départ par défaut</label>
                            <input
                                type="time"
                                name="checkout_time"
                                defaultValue={settings.checkout_time}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">Affiché sur la page de réservation.</p>
                        </div>
                    </div>
                </div>

                {/* Payment Methods Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Méthodes de Paiement</h2>
                    <p className="text-sm text-gray-500 mb-6">Activez ou désactivez les moyens de paiement disponibles lors de la réservation.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                name="enable_cash"
                                defaultChecked={settings.enable_cash ?? true}
                                className="w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent dark:border-gray-600 dark:bg-gray-700"
                            />
                            <div>
                                <span className="block text-sm font-medium text-gray-900 dark:text-white">Payer sur place</span>
                                <span className="block text-xs text-gray-500">Paiement à l'arrivée</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                name="enable_rib"
                                defaultChecked={settings.enable_rib ?? true}
                                className="w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent dark:border-gray-600 dark:bg-gray-700"
                            />
                            <div>
                                <span className="block text-sm font-medium text-gray-900 dark:text-white">Virement Bancaire</span>
                                <span className="block text-xs text-gray-500">Envoie le RIB par email</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors opacity-75">
                            <input
                                type="checkbox"
                                name="enable_card"
                                defaultChecked={settings.enable_card ?? true}
                                className="w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent dark:border-gray-600 dark:bg-gray-700"
                            />
                            <div>
                                <span className="block text-sm font-medium text-gray-900 dark:text-white">Carte Bancaire</span>
                                <span className="block text-xs text-gray-500">Paiement en ligne</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Contenu Page d'Accueil</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre Principal (Hero)</label>
                            <input
                                type="text"
                                name="hero_title"
                                defaultValue={settings.hero_title}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Marketing & SEO Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Marketing & SEO</h2>
                    <p className="text-sm text-gray-500 mb-6">Configurez vos identifiants de suivi pour Google Analytics et Facebook (Meta) Pixel. Laissez vide pour désactiver.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Google Analytics ID</label>
                            <input
                                type="text"
                                name="google_analytics_id"
                                defaultValue={settings.google_analytics_id}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                                placeholder="G-XXXXXXXXXX"
                            />
                            <p className="text-xs text-gray-500 mt-1">L'ID de votre flux de données Google Analytics 4.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Pixel ID</label>
                            <input
                                type="text"
                                name="meta_pixel_id"
                                defaultValue={settings.meta_pixel_id}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                                placeholder="123456789012345"
                            />
                            <p className="text-xs text-gray-500 mt-1">L'ID de votre pixel Facebook.</p>
                        </div>
                    </div>
                </div>

                {/* Notifications API (WhatsApp) Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary dark:text-white mb-6">Notifications & API (WhatsApp)</h2>
                    <p className="text-sm text-gray-500 mb-6">Configurez l'API UltraMsg pour les notifications WhatsApp automatiques.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instance ID (UltraMsg)</label>
                            <input
                                type="text"
                                name="ultramsg_instance_id"
                                defaultValue={settings.ultramsg_instance_id}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                                placeholder="instance12345"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Token (UltraMsg)</label>
                            <input
                                type="password"
                                name="ultramsg_token"
                                defaultValue={settings.ultramsg_token}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                                placeholder="••••••••••••••••"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Numéro WhatsApp Administrateur</label>
                            <input
                                type="text"
                                name="admin_whatsapp_number"
                                defaultValue={settings.admin_whatsapp_number}
                                className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-900 dark:text-white"
                                placeholder="+212600000000"
                            />
                            <p className="text-xs text-gray-500 mt-1">Numéro qui recevra les notifications de nouvelles réservations/leads.</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 dark:bg-black/20 flex items-center justify-between rounded-b-xl border-t border-gray-100 dark:border-white/10 mt-0">
                    <div className="text-sm font-medium max-w-sm truncate">
                        {message && (
                            <span className={message.includes("Erreur") ? "text-red-600" : "text-green-600"}>
                                {message}
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-primary hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:bg-gray-400"
                    >
                        {isSaving ? "Sauvegarde..." : "Sauvegarder les modifications"}
                    </button>
                </div>
            </form>
        </div>
    );
}
