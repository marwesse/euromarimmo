import { notFound } from "next/navigation";
import { PropertyDetailsClient } from "@/components/properties/PropertyDetailsClient";
import { getPropertyById, getProperties } from "@/app/actions/property-actions";
import { getSettings } from "@/app/actions/settings-actions";

export const dynamic = 'force-dynamic';

export default async function PropertyDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const property = await getPropertyById(params.id);

    if (!property) {
        notFound();
    }

    const allProperties = await getProperties();
    const similarProperties = allProperties
        .filter(p => (p.type === property.type || p.location === property.location) && p.id !== property.id)
        .slice(0, 3);

    const settings = await getSettings();

    return (
        <PropertyDetailsClient
            property={property}
            similarProperties={similarProperties}
            settings={settings}
        />
    );
}
