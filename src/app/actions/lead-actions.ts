"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { sendUserConfirmationEmail, sendAdminNotification } from "@/lib/mail";
import { getSettings } from "./settings-actions";

export async function submitLead(formData: FormData) {
    const supabase = await createClient();

    const leadData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || '',
        message: (formData.get("message") as string) || '',
        source: (formData.get("source") as string) || 'Website',
        status: 'Nouveau'
    };

    const { error } = await supabase
        .from('leads')
        .insert([leadData]);

    if (error) {
        console.error("Error submitting lead:", error);
        return { error: error.message };
    }

    // Process Emails in background
    try {
        const settings = await getSettings();
        console.log("=== EMAIL DEBUG LOGGING ===");
        console.log("Settings fetched successfully?", !!settings);
        console.log("Brevo API Key present?", !!settings?.brevo_api_key);
        console.log("Contact Email (Admin) present?", !!settings?.contact_email);
        console.log("Sender Email present?", !!settings?.sender_email);

        if (settings && settings.brevo_api_key) {
            if (settings.contact_email) {
                console.log("Attempting to send Admin Notification...");
                // Admin Notification
                const adminSent = await sendAdminNotification({
                    name: leadData.name,
                    email: leadData.email,
                    phone: leadData.phone,
                    message: leadData.message,
                    source: leadData.source,
                    adminEmail: settings.contact_email,
                    brevoApiKey: settings.brevo_api_key,
                    senderEmail: settings.sender_email || "khrousmail11@gmail.com",
                    senderName: settings.sender_name || "EUROMAR IMMO"
                });

                if (!adminSent) {
                    console.error("Admin Email via Brevo failed.");
                } else {
                    console.log("Admin Email sent successfully!");
                }
            } else {
                console.warn("Skipping Admin Notification: contact_email is empty.");
            }

            console.log("Attempting to send User Confirmation...");
            // User Confirmation
            const userSent = await sendUserConfirmationEmail({
                name: leadData.name,
                email: leadData.email,
                message: leadData.message,
                whatsappNumber: settings.whatsapp_number || "+212600692922",
                adminEmail: settings.contact_email || "khrousmail11@gmail.com", // Fallback for the email footer
                brevoApiKey: settings.brevo_api_key,
                senderEmail: settings.sender_email || "khrousmail11@gmail.com",
                senderName: settings.sender_name || "EUROMAR IMMO",
                paymentMethod: formData.get("payment_method") as string,
                bankName: settings.bank_name,
                accountHolder: settings.account_holder,
                ribDetails: settings.rib_details
            });

            if (!userSent) {
                console.error("User Confirmation Email via Brevo failed.");
            } else {
                console.log("User Confirmation Email sent successfully!");
            }
        } else {
            console.warn("Skipping email execution: Missing brevo_api_key in settings.");
        }
    } catch (e) {
        console.error("Failed to fetch settings for email processing:", e);
    }

    revalidatePath("/admin/leads");
    return { success: true };
}

export async function getLeads() {
    const supabase = await createClient();
    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching leads:", error);
        return [];
    }
    return leads;
}

export async function updateLeadStatus(id: string, status: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error(`Error updating lead ${id}:`, error);
        return { error: error.message };
    }

    revalidatePath("/admin/leads");
    return { success: true };
}

export async function getUnreadLeadsCount() {
    const supabase = await createClient();
    const { count, error } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Nouveau');

    if (error) {
        console.error("Error fetching unread leads count:", error);
        return 0;
    }
    return count || 0;
}
