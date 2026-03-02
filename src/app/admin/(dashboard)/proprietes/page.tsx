import { getProperties, updateProperty, deleteProperty } from "@/app/actions/property-actions";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PropertiesAdminPage() {
    const properties = await getProperties();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Propriétés</h1>
                <Link
                    href="/admin/proprietes/nouveau"
                    className="bg-primary hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter un bien
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Bien</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Prix</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4">En Avant</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {properties.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Aucune propriété n'a été ajoutée pour le moment.
                                    </td>
                                </tr>
                            ) : properties.map((prop: any) => (
                                <tr key={prop.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-16 h-12 bg-gray-200 rounded-lg bg-cover bg-center shrink-0 border border-gray-100"
                                                style={{ backgroundImage: `url('${prop.images?.[0] || ""}')` }}
                                            />
                                            <div>
                                                <div className="font-medium text-gray-900 max-w-xs truncate" title={prop.title}>
                                                    {prop.title}
                                                </div>
                                                <div className="text-sm text-gray-500">{prop.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{prop.type}</div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {Number(prop.price || 0).toLocaleString()} DH
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${(prop.status || 'Disponible') === 'Disponible' || (prop.status || 'Disponible') === 'Nouveau' ? 'bg-green-50 text-green-700 border-green-200' :
                                            (prop.status || 'Disponible') === 'Avance Payée' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {prop.status || 'Disponible'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <form action={async () => {
                                            "use server";
                                            const formData = new FormData();
                                            formData.append("id", prop.id);
                                            // Provide required fields if we are reusing updateProperty which validates them
                                            // Wait, updateProperty now requires ALL those fields. We need a separate toggle function!
                                            // Let's create a dedicated togglePropertyFeatured action in property-actions.ts instead of forcing this here.
                                            // For now we will call the new function togglePropertyFeatured
                                            await import("@/app/actions/property-actions").then(m => m.togglePropertyFeatured(prop.id, !prop.isFeatured));
                                        }}>
                                            <button type="submit" className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prop.isFeatured ? 'bg-accent' : 'bg-gray-200'}`}>
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${prop.isFeatured ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </form>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/proprietes/edit/${prop.id}`}
                                                className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded hover:bg-blue-50"
                                                title="Modifier"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <form action={async () => {
                                                "use server";
                                                await deleteProperty(prop.id);
                                            }}>
                                                <button
                                                    type="submit"
                                                    className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded hover:bg-red-50"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
