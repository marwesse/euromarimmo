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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Paramètres Globaux</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {/* Logo Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary mb-6">Logo du site</h2>
                    <div className="flex items-start gap-6">
                        <div className="shrink-0 w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
                            ) : (
                                <span className="text-gray-400 text-sm">Aucun logo</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Importer un nouveau logo</label>
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
                    <h2 className="text-xl font-serif text-primary mb-6">Contact & WhatsApp</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Numéro WhatsApp (avec indicatif)</label>
                            <input
                                type="text"
                                name="whatsapp_number"
                                defaultValue={settings.whatsapp_number}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                placeholder="+212600692922"
                            />
                            <p className="text-xs text-gray-500 mt-1">Utilisé pour le bouton flottant et les modals de paiement.</p>
                        </div>
                    </div>
                </div>

                {/* Bank Details Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary mb-6">Coordonnées Bancaires (RIB)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Titulaire du compte</label>
                            <input
                                type="text"
                                name="account_holder"
                                defaultValue={settings.account_holder}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la Banque</label>
                            <input
                                type="text"
                                name="bank_name"
                                defaultValue={settings.bank_name}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">RIB Complet</label>
                            <input
                                type="text"
                                name="rib_details"
                                defaultValue={settings.rib_details}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                    <h2 className="text-xl font-serif text-primary mb-6">Contenu Page d'Accueil</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Titre Principal (Hero)</label>
                            <input
                                type="text"
                                name="hero_title"
                                defaultValue={settings.hero_title}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 flex items-center justify-between rounded-b-xl">
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
