import { getLeads } from "@/app/actions/lead-actions";
import { LeadsClient } from "./LeadsClient";

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const leads = await getLeads();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leads & Contacts</h1>
            </div>

            {/* Injected Client Component for Search, Sorting and Modals */}
            <LeadsClient leads={leads} />
        </div>
    );
}
