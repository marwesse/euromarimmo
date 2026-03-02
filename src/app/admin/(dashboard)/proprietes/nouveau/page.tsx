"use client";

import { useTransition, useState } from "react";
import { addProperty } from "@/app/actions/property";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export default function NewPropertyPage() {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);
    const [newImage, setNewImage] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const [amenities, setAmenities] = useState<string[]>([]);
    const [newAmenity, setNewAmenity] = useState("");

    const handleAddImage = () => {
        if (newImage.trim() && !images.includes(newImage.trim())) {
            setImages([...images, newImage.trim()]);
            setNewImage("");
        }
    };

    const handleRemoveImage = (img: string) => {
        setImages(images.filter(i => i !== img));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
        }
        // clear the input so the same file could be selected again if needed
        e.target.value = '';
    };

    const handleRemoveImageFile = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const handleAddAmenity = () => {
        if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
            setAmenities([...amenities, newAmenity.trim()]);
            setNewAmenity("");
        }
    };

    const handleRemoveAmenity = (amenity: string) => {
        setAmenities(amenities.filter(a => a !== amenity));
    };

    async function handleAction(formData: FormData) {
        setMessage(null);

        // Inject our array states as JSON strings before sending to Server Action
        formData.append("images", JSON.stringify(images));
        formData.append("amenities", JSON.stringify(amenities));

        // Append actual file objects
        imageFiles.forEach(file => formData.append("imageFiles", file));

        startTransition(async () => {
            const result = await addProperty(formData);
            if (result.success) {
                setMessage({ type: "success", text: "Propriété ajoutée avec succès !" });
                setTimeout(() => {
                    router.push("/admin/proprietes");
                    router.refresh();
                }, 1500);
            } else {
                setMessage({ type: "error", text: result.error || "Erreur inconnue." });
            }
        });
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-20">
            <h1 className="text-2xl font-bold mb-6">Ajouter une Propriété</h1>

            {message && (
                <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
                    {message.text}
                </div>
            )}

            <form action={handleAction} className="space-y-8">

                {/* 1. Basic Info */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-4">
                    <h2 className="text-lg font-semibold text-primary mb-2">Informations Générales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'annonce *</label>
                            <input type="text" name="title" required placeholder="Ex: Villa d'exception Vue Mer" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (DH) *</label>
                            <input type="number" name="price" required placeholder="Ex: 5000000" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                            <select name="status" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none bg-white">
                                <option value="Nouveau">Nouveau</option>
                                <option value="Disponible">Disponible</option>
                                <option value="Avance Payée">Avance Payée</option>
                                <option value="Vendu">Vendu/Loué</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction *</label>
                            <select name="type" required className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none bg-white">
                                <option value="Vente">Vente</option>
                                <option value="Location">Location</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quartier / Ville *</label>
                            <input type="text" name="location" required placeholder="Quartier (ex: Anfa)" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                    </div>
                </div>

                {/* 2. Details */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-4">
                    <h2 className="text-lg font-semibold text-primary mb-2">Caractéristiques</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
                            <input type="number" name="bedrooms" placeholder="Ex: 4" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salles de bain</label>
                            <input type="number" name="bathrooms" placeholder="Ex: 3" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²)</label>
                            <input type="number" name="surface" placeholder="Ex: 250" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                            <input type="number" name="yearbuilt" placeholder="Ex: 2023" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none" />
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea name="description" required rows={5} placeholder="Description complète du bien..." className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none resize-y"></textarea>
                    </div>
                </div>

                {/* 3. Arrays (Amenities + Images) */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-primary mb-2">Images (URLs)</h2>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="url"
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
                                placeholder="https://..."
                                className="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button type="button" onClick={handleAddImage} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium flex items-center gap-1 transition-colors">
                                <Plus className="w-4 h-4" /> Ajouter
                            </button>
                        </div>
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative group rounded-md overflow-hidden border border-gray-200">
                                        <div className="h-24 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}></div>
                                        <button type="button" onClick={() => handleRemoveImage(img)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {images.length === 0 && imageFiles.length === 0 && <p className="text-gray-400 text-sm italic">Aucune image ajoutée.</p>}

                        {/* Device Files section */}
                        <div className="mt-6 border-t border-gray-100 pt-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Ajouter depuis l'appareil</h3>
                            <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-colors" />
                            {imageFiles.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                    {imageFiles.map((file, idx) => (
                                        <div key={idx} className="relative group rounded-md overflow-hidden border border-gray-200">
                                            <div className="h-24 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${URL.createObjectURL(file)})` }}></div>
                                            <button type="button" onClick={() => handleRemoveImageFile(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-primary mb-2">Prestations (Amenities)</h2>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAmenity(); } }}
                                placeholder="Ex: Piscine Chauffée"
                                className="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button type="button" onClick={handleAddAmenity} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium flex items-center gap-1 transition-colors">
                                <Plus className="w-4 h-4" /> Ajouter
                            </button>
                        </div>
                        {amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {amenities.map((amenity, idx) => (
                                    <span key={idx} className="bg-accent/10 border border-accent/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {amenity}
                                        <button type="button" onClick={() => handleRemoveAmenity(amenity)} className="text-gray-500 hover:text-red-500">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        {amenities.length === 0 && <p className="text-gray-400 text-sm italic">Aucune prestation ajoutée.</p>}
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary hover:bg-gray-800 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-50 text-lg shadow-lg"
                    >
                        {isPending ? "Sauvegarde..." : "Publier la Propriété"}
                    </button>
                </div>
            </form>
        </div>
    );
}
