import { Suspense } from "react";
import { ProprietesClient } from "@/components/properties/ProprietesClient";
import { getProperties } from "@/app/actions/property-actions";

export const dynamic = 'force-dynamic';

export default async function ProprietesPage() {
    const properties = await getProperties();

    return (
        <Suspense fallback={
            <div className="pt-24 pb-20 min-h-screen bg-bg-offwhite dark:bg-[#0f131a] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-white"></div>
            </div>
        }>
            <ProprietesClient properties={properties} />
        </Suspense>
    );
}
