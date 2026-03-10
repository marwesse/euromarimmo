"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Star } from "lucide-react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions/testimonial-actions";

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: any[] }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        if (editingId) {
            await updateTestimonial(editingId, formData);
            setEditingId(null);
        } else {
            await createTestimonial(formData);
            setIsAdding(false);
        }
        setIsSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
            await deleteTestimonial(id);
        }
    };

    const TestimonialForm = ({ testimonial, onSubmit, onCancel }: { testimonial?: any, onSubmit: any, onCancel: any }) => (
        <form onSubmit={onSubmit} className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm mb-8 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif font-semibold">{testimonial ? "Modifier le Témoignage" : "Nouveau Témoignage"}</h3>
                <button type="button" onClick={onCancel} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom du Client</label>
                    <input type="text" name="client_name" required defaultValue={testimonial?.client_name} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rôle (ex: Investisseur)</label>
                    <input type="text" name="role" required defaultValue={testimonial?.role} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea name="content" required rows={3} defaultValue={testimonial?.content} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note (1 à 5)</label>
                    <input type="number" name="rating" min="1" max="5" required defaultValue={testimonial?.rating || 5} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de l'image (optionnel)</label>
                    <input type="url" name="image_url" defaultValue={testimonial?.image_url} placeholder="https://..." className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2" />
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={onCancel} className="px-5 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">Annuler</button>
                <button type="submit" disabled={isSaving} className="bg-primary hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                    {isSaving ? "Enregistrement..." : (testimonial ? "Mettre à jour" : "Créer")}
                </button>
            </div>
        </form>
    );

    return (
        <div>
            {!isAdding && !editingId && (
                <div className="mb-6 flex justify-end">
                    <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-primary hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                        <Plus className="w-5 h-5" /> Ajouter un Témoignage
                    </button>
                </div>
            )}

            {isAdding && <TestimonialForm onSubmit={handleSubmit} onCancel={() => setIsAdding(false)} />}

            <div className="bg-white dark:bg-[#1a202c]/50 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                                <th className="py-4 px-6">Client</th>
                                <th className="py-4 px-6">Rôle</th>
                                <th className="py-4 px-6">Note</th>
                                <th className="py-4 px-6 max-w-md">Message</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                            {initialTestimonials.map((t) => (
                                editingId === t.id ? (
                                    <tr key={t.id}>
                                        <td colSpan={5} className="p-0 border-b-0">
                                            <TestimonialForm testimonial={t} onSubmit={handleSubmit} onCancel={() => setEditingId(null)} />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            {t.image_url ? (
                                                <img src={t.image_url} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{t.client_name.charAt(0)}</div>
                                            )}
                                            <span className="font-medium text-gray-900 dark:text-white">{t.client_name}</span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600 dark:text-gray-300 text-sm">{t.role}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex text-accent">
                                                {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate" title={t.content}>
                                            {t.content}
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <button onClick={() => setEditingId(t.id)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors inline-block"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors inline-block"><Trash2 className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                )
                            ))}
                            {initialTestimonials.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">Aucun témoignage pour le moment.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
