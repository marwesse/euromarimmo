import { Suspense } from "react";
import { getProperties, deleteProperty } from "@/app/actions/property-actions";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic';

async function PropertiesTable() {
    const properties = await getProperties();

    return (
        <div className="bg-white dark:bg-[#1a202c]/50 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <th className="px-6 py-4">Bien</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Prix</th>
                            <th className="px-6 py-4">Statut</th>
                            <th className="px-6 py-4">En Avant</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                        {properties.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    Aucune propriété n&apos;a été ajoutée pour le moment.
                                </td>
                            </tr>
                        ) : properties.map((prop: any) => (
                            <tr key={prop.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-16 h-12 bg-gray-200 dark:bg-white/10 rounded-lg bg-cover bg-center shrink-0 border border-gray-100 dark:border-white/10"
                                            style={{ backgroundImage: `url('${prop.images?.[0] || ""}')` }}
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white max-w-xs truncate" title={prop.title}>
                                                {prop.title}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{prop.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 dark:text-white">{prop.type}</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {Number(prop.price || 0).toLocaleString()} DH
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${(prop.status || 'Disponible') === 'Disponible' || (prop.status || 'Disponible') === 'Nouveau' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' :
                                        (prop.status || 'Disponible') === 'Avance Payée' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800' :
                                            'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                                        }`}>
                                        {prop.status || 'Disponible'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <form action={async () => {
                                        "use server";
                                        const formData = new FormData();
                                        formData.append("id", prop.id);
                                        await import("@/app/actions/property-actions").then(m => m.togglePropertyFeatured(prop.id, !prop.isFeatured));
                                    }}>
                                        <button type="submit" className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${prop.isFeatured ? 'bg-accent' : 'bg-gray-200'}`}>
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${prop.isFeatured ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </form>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/proprietes/edit/${prop.id}`}
                                            className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30"
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
                                                className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
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
    );
}

function TableSkeleton() {
    return (
        <div className="bg-white dark:bg-[#1a202c]/50 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden animate-pulse">
            <div className="h-14 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10"></div>
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-20 border-b border-gray-100 dark:border-white/10 p-6 flex items-center gap-6">
                    <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default async function PropertiesAdminPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Propriétés</h1>
                <Link
                    href="/admin/proprietes/nouveau"
                    className="bg-primary hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter un bien
                </Link>
            </div>

            <Suspense fallback={<TableSkeleton />}>
                <PropertiesTable />
            </Suspense>
        </div>
    );
}
