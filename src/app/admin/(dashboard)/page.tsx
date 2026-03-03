import { Suspense } from "react";
import { getProperties } from "@/app/actions/property-actions";
import { getLeads } from "@/app/actions/lead-actions";

async function DashboardStats() {
    // In parallel, fetch actual counts
    const [properties, leads] = await Promise.all([
        getProperties(),
        getLeads()
    ]);

    // Calculate simple stats
    const activeProperties = properties.length;
    const totalLeads = leads.length;
    // Just an example, maybe count leads from this month
    const thisMonth = new Date().getMonth();
    const salesThisMonth = leads.filter(l => new Date(l.created_at).getMonth() === thisMonth).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-center">
                <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Total Propriétés</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeProperties}</p>
            </div>
            <div className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-center">
                <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Total Leads VIP</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalLeads}</p>
            </div>
            <div className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-center">
                <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Contacts (Mois)</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{salesThisMonth}</p>
            </div>
        </div>
    );
}

function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-[#1a202c]/50 p-6 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm h-28 animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tableau de Bord</h1>
            <Suspense fallback={<StatsSkeleton />}>
                <DashboardStats />
            </Suspense>
        </div>
    );
}
