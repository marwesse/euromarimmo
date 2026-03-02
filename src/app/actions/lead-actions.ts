"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
