import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load from .env.local instead of just .env
dotenv.config({ path: '.env.local' });

async function uploadLogoAndSetDB() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing supabase env vars!");
        process.exit(1);
    }

    // Attempt with whichever key we have
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const logoPath = '/Users/marouanekdidou/.gemini/antigravity/brain/2da29ae0-fb61-4886-ad2e-9072a5a0d29a/euromar_luxury_logo_1772472024601.png';

    if (!fs.existsSync(logoPath)) {
        console.error("Logo file not found at", logoPath);
        process.exit(1);
    }

    const fileBuffer = fs.readFileSync(logoPath);
    const fileName = `generated_logo_${Date.now()}.png`;

    console.log("Uploading logo to Supabase Storage...");
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('properties')
        .upload(fileName, fileBuffer, {
            contentType: 'image/png'
        });

    if (uploadError) {
        console.error("Storage upload error:", uploadError);
        process.exit(1);
    }

    const { data: publicUrlData } = supabase.storage.from('properties').getPublicUrl(fileName);
    const publicUrl = publicUrlData.publicUrl;

    console.log("Uploaded! Public URL:", publicUrl);

    console.log("Updating settings table...");
    // Just find the single row
    const { data: settingsRow } = await supabase.from('settings').select('id').limit(1).single();

    if (settingsRow) {
        const { error: updateError } = await supabase
            .from('settings')
            .update({ logo_url: publicUrl })
            .eq('id', settingsRow.id);

        if (updateError) {
            console.error("DB update error:", updateError);
        } else {
            console.log("SUCCESS! Database updated with new logo.");
        }
    } else {
        console.log("No settings row found. Consider saving from dashboard UI first.");
    }
}

uploadLogoAndSetDB().catch(console.error);
