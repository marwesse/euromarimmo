"use client";

import { useTransition, useState, useEffect, use } from "react";
import { getPropertyById } from "@/app/actions/property-actions";
import { updateBasicProperty } from "@/app/actions/property";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { LuxurySelect } from "@/components/ui/LuxurySelect";

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const [property, setProperty] = useState<any>(null);
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);
    const [newImage, setNewImage] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const [amenities, setAmenities] = useState<string[]>([]);
    const [newAmenity, setNewAmenity] = useState("");

    const [status, setStatus] = useState("Disponible");
    const [type, setType] = useState("Vente");
    const [location, setLocation] = useState("");

    useEffect(() => {
        async function load() {
            const data = await getPropertyById(id);
            if (data) {
                setProperty(data);
                if (data.status) setStatus(data.status);
                if (data.type) setType(data.type);
                if (data.location) setLocation(data.location);
                if (data.images && Array.isArray(data.images)) setImages(data.images);
                if (data.amenities && Array.isArray(data.amenities)) setAmenities(data.amenities);
            }
        }
        load();
    }, [id]);

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
        formData.append("id", id);

        // Inject our array states as JSON strings before sending to Server Action
        formData.append("images", JSON.stringify(images));
        formData.append("amenities", JSON.stringify(amenities));

        // Append actual file objects
        imageFiles.forEach(file => formData.append("imageFiles", file));

        startTransition(async () => {
            const result = await updateBasicProperty(formData);
            if (result.success) {
                setMessage({ type: "success", text: "Propriété modifiée avec succès !" });
                setTimeout(() => {
                    router.push("/admin/proprietes");
                    router.refresh();
                }, 1500);
            } else {
                setMessage({ type: "error", text: result.error || "Erreur inconnue." });
            }
        });
    }

    if (!property) return <div className="p-6">Chargement...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-[#1a202c]/50 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 mb-20">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Modifier la Propriété</h1>

            {message && (
                <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
                    {message.text}
                </div>
            )}

            <form action={handleAction} className="space-y-8">

                {/* 1. Basic Info */}
                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-lg border border-gray-100 dark:border-white/10 space-y-4">
                    <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Informations Générales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre de l'annonce *</label>
                            <input type="text" name="title" defaultValue={property.title} required placeholder="Ex: Villa d'exception Vue Mer" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix (DH) *</label>
                            <input type="number" name="price" defaultValue={property.price} required placeholder="Ex: 5000000" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
                            <div className="relative">
                                <LuxurySelect
                                    name="status"
                                    value={status}
                                    onChange={setStatus}
                                    options={["Nouveau", "Disponible", "Avance Payée", "Vendu"]}
                                    buttonClassName="w-full bg-white dark:bg-[#2d3748] border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-700 dark:text-white"
                                    dropdownClassName="bg-white dark:bg-[#2d3748] border dark:border-white/10 text-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transaction *</label>
                            <div className="relative">
                                <LuxurySelect
                                    name="type"
                                    value={type}
                                    onChange={setType}
                                    options={["Vente", "Location"]}
                                    buttonClassName="w-full bg-white dark:bg-[#2d3748] border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-700 dark:text-white"
                                    dropdownClassName="bg-white dark:bg-[#2d3748] border dark:border-white/10 text-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quartier / Ville *</label>
                            <div className="relative">
                                <LuxurySelect
                                    name="location"
                                    value={location}
                                    onChange={setLocation}
                                    placeholder="Sélectionnez un quartier"
                                    options={[
                                        "Anfa Supérieur", "Maarif / Gauthier", "Bourgogne / Racine", "Californie",
                                        "Bouskoura", "Dar Bouazza", "Palmier", "France Ville", "Les Hôpitaux",
                                        "Les Princesses", "Ciel", "CFC", "Abdelmoumen", "Ghandi",
                                        "Maarif", "Anoual", "2 Mars", "Ferme Bretonne", "Route d'El Jadida",
                                        "La Corniche", "Marina", "Casa Port", "Zenata", "Ain Diab", "Belvédère"
                                    ]}
                                    buttonClassName="w-full bg-white dark:bg-[#2d3748] border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-700 dark:text-white"
                                    dropdownClassName="bg-white dark:bg-[#2d3748] border dark:border-white/10 text-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Details */}
                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-lg border border-gray-100 dark:border-white/10 space-y-4">
                    <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Caractéristiques</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chambres</label>
                            <input type="number" name="bedrooms" defaultValue={property.bedrooms} placeholder="Ex: 4" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salles de bain</label>
                            <input type="number" name="bathrooms" defaultValue={property.bathrooms} placeholder="Ex: 3" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Surface (m²)</label>
                            <input type="number" name="surface" defaultValue={property.surface} placeholder="Ex: 250" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-900 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Année</label>
                            <input type="number" name="yearbuilt" defaultValue={property.yearbuilt} placeholder="Ex: 2023" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none text-gray-900 dark:text-white" />
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                        <textarea name="description" defaultValue={property.description} required rows={5} placeholder="Description complète du bien..." className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 focus:ring-2 focus:ring-accent outline-none resize-y text-gray-900 dark:text-white"></textarea>
                    </div>
                </div>

                {/* 3. Arrays (Amenities + Images) */}
                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-lg border border-gray-100 dark:border-white/10 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Images (URLs)</h2>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="url"
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
                                placeholder="https://..."
                                className="flex-1 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-accent text-gray-900 dark:text-white"
                            />
                            <button type="button" onClick={handleAddImage} className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md font-medium flex items-center gap-1 transition-colors">
                                <Plus className="w-4 h-4" /> Ajouter
                            </button>
                        </div>
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative group rounded-md overflow-hidden border border-gray-200">
                                        <div className="h-24 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}></div>
                                        <button type="button" onClick={() => handleRemoveImage(img)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {images.length === 0 && imageFiles.length === 0 && <p className="text-gray-400 text-sm italic">Aucune image ajoutée.</p>}

                        {/* Device Files section */}
                        <div className="mt-6 border-t border-gray-100 dark:border-white/10 pt-4">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ajouter depuis l'appareil</h3>
                            <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-colors" />
                            {imageFiles.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                    {imageFiles.map((file, idx) => (
                                        <div key={idx} className="relative group rounded-md overflow-hidden border border-gray-200">
                                            <div className="h-24 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${URL.createObjectURL(file)})` }}></div>
                                            <button type="button" onClick={() => handleRemoveImageFile(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-white/10 pt-6">
                        <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Prestations (Amenities)</h2>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAmenity(); } }}
                                placeholder="Ex: Piscine Chauffée"
                                className="flex-1 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-accent text-gray-900 dark:text-white"
                            />
                            <button type="button" onClick={handleAddAmenity} className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md font-medium flex items-center gap-1 transition-colors">
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
                        {isPending ? "Modification en cours..." : "Enregistrer les modifications"}
                    </button>
                </div>
            </form>
        </div>
    );
}
