import { Suspense } from "react";
import { getLeads } from "@/app/actions/lead-actions";
import { LeadsClient } from "./LeadsClient";

export const dynamic = 'force-dynamic';

async function LeadsData() {
    const leads = await getLeads();
    return <LeadsClient leads={leads} />;
}

function LeadsSkeleton() {
    return (
        <div className="bg-white dark:bg-[#1a202c]/50 rounded-xl border border-gray-100 dark:border-white/10 shadow-sm p-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
            </div>
            <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-white/5"></div>
                ))}
            </div>
        </div>
    );
}

export default function LeadsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leads & Contacts</h1>
            </div>

            <Suspense fallback={<LeadsSkeleton />}>
                <LeadsData />
            </Suspense>
        </div>
    );
}
