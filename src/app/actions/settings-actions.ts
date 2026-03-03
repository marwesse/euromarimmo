"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { readEmailConfig, writeEmailConfig } from "@/utils/email-config";
import { readReservationConfig, writeReservationConfig } from "@/utils/reservation-config";
import { readPaymentConfig, writePaymentConfig } from "@/utils/payment-config";

export async function getSettings() {
    const supabase = await createClient();
    const { data: settings, error } = await supabase
        .from('settings')
        .select('*')
        .limit(1)
        .single();

    const emailConfig = readEmailConfig();
    const reservationConfig = readReservationConfig();
    const paymentConfig = readPaymentConfig();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error("Error fetching settings:", Object.keys(error).length === 0 ? "Unknown fetch/connection error" : error);
        return { ...emailConfig, ...reservationConfig, ...paymentConfig };
    }

    // Fallback default structure if no settings exist yet
    return settings ? { ...settings, ...emailConfig, ...reservationConfig, ...paymentConfig } : {
        whatsapp_number: "+212661755716",
        rib_details: "007 780 00030750000000513 27",
        bank_name: "Attijariwafa Bank",
        account_holder: "EUROMAR IMMO SARL",
        hero_title: "Découvrez l'Exception. Vivez l'Exclusivité.",
        ...emailConfig,
        ...reservationConfig,
        ...paymentConfig
    };
}

export async function updateSettings(formData: FormData) {
    const supabase = await createClient();

    let logo_url = formData.get("logo_url")?.toString() || undefined;

    // Handle File Uploads
    const logoFile = formData.get("logoFile") as File;
    if (logoFile && logoFile.size > 0) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `logo-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
            .from('properties') // Using the same bucket since it exists
            .upload(fileName, logoFile);

        if (uploadError) {
            console.error("Error uploading logo image:", uploadError);
        } else if (data) {
            const { data: publicUrlData } = supabase.storage.from('properties').getPublicUrl(fileName);
            logo_url = publicUrlData.publicUrl;
        }
    }

    const contact_email = formData.get("contact_email")?.toString() || "";
    const brevo_api_key = formData.get("brevo_api_key")?.toString() || "";
    const sender_email = formData.get("sender_email")?.toString() || "khrousmail11@gmail.com";
    const sender_name = formData.get("sender_name")?.toString() || "EUROMAR IMMO";

    // Extract Reservation Config Data
    const discount_days_threshold = parseInt(formData.get("discount_days_threshold")?.toString() || "10");
    const discount_percentage = parseInt(formData.get("discount_percentage")?.toString() || "10");
    const checkout_time = formData.get("checkout_time")?.toString() || "12:00";

    // Extract Payment Config Data (Checkboxes are "on" if checked, otherwise null)
    const enable_cash = formData.get("enable_cash") === "on";
    const enable_rib = formData.get("enable_rib") === "on";
    const enable_card = formData.get("enable_card") === "on";

    // Save Configs Locally
    writeEmailConfig(contact_email, brevo_api_key, sender_email, sender_name);
    writeReservationConfig(discount_days_threshold, discount_percentage, checkout_time);
    writePaymentConfig(enable_cash, enable_rib, enable_card);

    const dataObj: any = {
        whatsapp_number: formData.get("whatsapp_number")?.toString(),
        rib_details: formData.get("rib_details")?.toString(),
        bank_name: formData.get("bank_name")?.toString(),
        account_holder: formData.get("account_holder")?.toString(),
        hero_title: formData.get("hero_title")?.toString(),
    };

    if (logo_url) {
        dataObj.logo_url = logo_url;
    }

    // First, check if a settings row exists
    const { data: existing } = await supabase.from('settings').select('id').limit(1).single();

    let result;
    if (existing) {
        result = await supabase
            .from('settings')
            .update(dataObj)
            .eq('id', existing.id)
            .select();
    } else {
        result = await supabase
            .from('settings')
            .insert([dataObj])
            .select();
    }

    if (result.error) {
        console.error("Error updating settings:", result.error);
        return { success: false, error: result.error.message };
    }

    revalidatePath("/", "layout"); // Revalidate all paths relying on global settings
    revalidatePath("/admin/settings");
    return { success: true, data: result.data };
}
