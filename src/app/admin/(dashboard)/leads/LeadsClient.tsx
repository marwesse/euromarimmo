"use client";

import { useState } from "react";
import { CheckCircle, RotateCcw, Search, Eye, X, Mail, Phone, Calendar as CalendarIcon, Tag, MapPin, Trash2 } from "lucide-react";
import { updateLeadStatus, deleteLead } from "@/app/actions/lead-actions";

interface LeadsClientProps {
    leads: any[];
}

export function LeadsClient({ leads }: LeadsClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<'All' | 'Reservations' | 'Contacts'>('All');
    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    // Derived state for filtering
    const filteredLeads = leads.filter(lead => {
        // Filter by Type
        const sourceStr = (lead.source || "").toLowerCase();
        if (filterType === 'Reservations' && !sourceStr.includes('réservation')) return false;
        if (filterType === 'Contacts' && !sourceStr.includes('contact')) return false;

        // Filter by Search Query
        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            return (
                (lead.name || "").toLowerCase().includes(query) ||
                (lead.email || "").toLowerCase().includes(query) ||
                (lead.phone || "").toLowerCase().includes(query) ||
                sourceStr.includes(query) ||
                (lead.message || "").toLowerCase().includes(query)
            );
        }

        return true;
    });

    const handleUpdateStatus = async (leadId: string, currentStatus: string) => {
        setIsUpdating(leadId);
        const newStatus = currentStatus === 'Nouveau' || !currentStatus ? 'Traité' : 'Nouveau';
        await updateLeadStatus(leadId, newStatus);
        setIsUpdating(null);
    };

    const handleDeleteLead = async (leadId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce lead ? Cette action est irréversible.")) {
            setIsDeleting(leadId);
            await deleteLead(leadId);
            setIsDeleting(null);
            if (selectedLead?.id === leadId) {
                setSelectedLead(null);
            }
        }
    };

    return (
        <div>
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                <div className="flex bg-white dark:bg-[#1a202c]/50 p-1 rounded-lg border border-gray-100 dark:border-white/10 w-full md:w-auto overflow-x-auto">
                    {(['All', 'Reservations', 'Contacts'] as const).map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${filterType === type
                                ? 'bg-primary text-white dark:bg-accent dark:text-black shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                        >
                            {type === 'All' ? 'Tous les leads' :
                                type === 'Reservations' ? 'Réservations uniques' : 'Simple Contacts'}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher (nom, email...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-[#1a202c]/50 border border-gray-100 dark:border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all dark:text-white"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#1a202c]/50 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Message / Détails</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="w-10 h-10 mb-4 opacity-20" />
                                            <p className="text-lg">Aucun résultat trouvé.</p>
                                            <p className="text-sm mt-1">Modifiez vos filtres ou votre recherche.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLeads.map((lead: any) => (
                                <tr key={lead.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {new Intl.DateTimeFormat('fr-FR', {
                                            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        }).format(new Date(lead.created_at))}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                                        {lead.phone && <div className="text-sm text-gray-500 dark:text-gray-400">{lead.phone}</div>}
                                    </td>
                                    <td className="px-6 py-4 max-w-[150px]">
                                        <div className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-lg border ${lead.source?.toLowerCase().includes('réservation')
                                            ? 'bg-accent/10 text-accent border-accent/20'
                                            : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                                            }`}>
                                            {lead.source}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate mb-2">
                                            {lead.message || '-'}
                                        </div>
                                        <button
                                            onClick={() => setSelectedLead(lead)}
                                            className="text-xs font-medium text-primary dark:text-accent hover:underline flex items-center gap-1"
                                        >
                                            <Eye className="w-3.5 h-3.5" /> Voir les détails
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === 'Nouveau' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                            lead.status === 'Traité' ? 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-300' :
                                                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                            }`}>
                                            {lead.status || 'Nouveau'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium flex justify-end gap-2">
                                        <button
                                            onClick={() => handleUpdateStatus(lead.id, lead.status)}
                                            disabled={isUpdating === lead.id || isDeleting === lead.id}
                                            className="text-[#d4af37] hover:text-[#b8952b] dark:hover:text-white transition-colors p-2 rounded hover:bg-[#d4af37]/10 disabled:opacity-50"
                                            title={lead.status === 'Nouveau' ? 'Marquer Traité' : 'Marquer Nouveau'}
                                        >
                                            {lead.status === 'Nouveau' ? (
                                                <CheckCircle className={`w-5 h-5 ${isUpdating === lead.id ? 'animate-pulse' : ''}`} />
                                            ) : (
                                                <RotateCcw className={`w-5 h-5 ${isUpdating === lead.id ? 'animate-spin' : ''}`} />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLead(lead.id)}
                                            disabled={isDeleting === lead.id || isUpdating === lead.id}
                                            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
                                            title="Supprimer"
                                        >
                                            <Trash2 className={`w-5 h-5 ${isDeleting === lead.id ? 'animate-pulse opacity-50' : ''}`} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Lead Details Modal */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#0f131a] rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10">
                            <h2 className="text-xl font-serif text-primary dark:text-white font-semibold">
                                {selectedLead.source?.toLowerCase().includes('réservation') ? 'Détails de la Réservation' : 'Détails du Contact'}
                            </h2>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1"><Mail className="w-5 h-5 text-gray-400" /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Client</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{selectedLead.name}</p>
                                            <p className="text-sm text-primary dark:text-accent font-mono">{selectedLead.email}</p>
                                        </div>
                                    </div>
                                    {selectedLead.phone && (
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1"><Phone className="w-5 h-5 text-gray-400" /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Téléphone</p>
                                                <p className="text-gray-900 dark:text-white">{selectedLead.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1"><Tag className="w-5 h-5 text-gray-400" /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Source</p>
                                            <div className="mt-1 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded inline-block text-sm font-medium">
                                                {selectedLead.source}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1"><CalendarIcon className="w-5 h-5 text-gray-400" /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Reçu le</p>
                                            <p className="text-gray-900 dark:text-white">
                                                {new Intl.DateTimeFormat('fr-FR', {
                                                    day: '2-digit', month: 'long', year: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                }).format(new Date(selectedLead.created_at))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Message Brut
                                </h3>
                                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono leading-relaxed">
                                    {selectedLead.message}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-between items-center flex-shrink-0">
                            <button
                                onClick={() => handleDeleteLead(selectedLead.id)}
                                disabled={isDeleting === selectedLead.id}
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Supprimer</span>
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-lg transition-colors border border-gray-200 dark:border-white/10"
                                >
                                    Fermer
                                </button>
                                {selectedLead.status === 'Nouveau' && (
                                    <button
                                        onClick={() => {
                                            handleUpdateStatus(selectedLead.id, selectedLead.status);
                                            setSelectedLead(null);
                                        }}
                                        className="px-5 py-2.5 text-sm font-medium bg-[#d4af37] text-white hover:bg-[#b8952b] rounded-lg shadow-md transition-all flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" /> <span className="hidden sm:inline">Marquer comme Traité</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
