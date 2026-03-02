import { getLeads, updateLeadStatus } from "@/app/actions/lead-actions";

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const leads = await getLeads();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Leads & Contacts</h1>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Aucun lead pour le moment.
                                    </td>
                                </tr>
                            ) : leads.map((lead: any) => (
                                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                        {new Intl.DateTimeFormat('fr-FR', {
                                            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        }).format(new Date(lead.created_at))}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{lead.name}</div>
                                        <div className="text-sm text-gray-500">{lead.email}</div>
                                        {lead.phone && <div className="text-sm text-gray-500">{lead.phone}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {lead.source}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={lead.message}>
                                        {lead.message || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === 'Nouveau' ? 'bg-green-100 text-green-800' :
                                            lead.status === 'Traité' ? 'bg-gray-100 text-gray-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {lead.status || 'Nouveau'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <form action={async () => {
                                            "use server";
                                            const newStatus = lead.status === 'Nouveau' || !lead.status ? 'Traité' : 'Nouveau';
                                            await updateLeadStatus(lead.id, newStatus);
                                        }}>
                                            <button
                                                type="submit"
                                                className="text-[#d4af37] hover:text-[#b8952b] bg-transparent border-none cursor-pointer p-0 m-0 text-sm font-semibold"
                                            >
                                                {lead.status === 'Nouveau' ? 'Marquer Traité' : 'Marquer Nouveau'}
                                            </button>
                                        </form>
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
