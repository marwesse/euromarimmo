import { createClient } from "@supabase/supabase-js";
import { properties } from "../src/data/properties";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("Starting seed...");

    // Clear existing
    await supabase.from("properties").delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const mappedProps = properties.map(p => ({
        // Do not provide 'id' here so Supabase generates a UUID for us, 
        // or provide UUIDs instead of "p1". Supabase id is UUID. "p1" will fail.
        title: p.title,
        description: p.description,
        type: p.type,
        transactionType: p.transactionType,
        price: p.price,
        priceNumeric: p.priceNumeric,
        status: p.status,
        location: p.location,
        city: p.city,
        bedrooms: p.features.beds,
        bathrooms: p.features.baths,
        surface: p.features.area,
        yearBuilt: p.features.yearBuilt,
        amenities: p.amenities,
        images: p.images,
    }));

    const { data, error } = await supabase.from("properties").insert(mappedProps).select();

    if (error) {
        console.error("Error inserting properties:", error);
    } else {
        console.log(`Successfully seeded ${data.length} properties.`);
    }
}

seed();
