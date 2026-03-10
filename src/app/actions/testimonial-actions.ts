"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
    return data;
}

export async function createTestimonial(formData: FormData) {
    const supabase = await createClient();

    // We expect image uploading to happen client-side or we pass an existing URL
    const dataObj = {
        client_name: formData.get("client_name")?.toString() || "Anonyme",
        role: formData.get("role")?.toString() || "Client",
        content: formData.get("content")?.toString() || "",
        rating: parseInt(formData.get("rating")?.toString() || "5"),
        image_url: formData.get("image_url")?.toString() || null,
    };

    const { error } = await supabase.from("testimonials").insert([dataObj]);

    if (error) {
        console.error("Error creating testimonial:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
    const supabase = await createClient();

    const dataObj = {
        client_name: formData.get("client_name")?.toString(),
        role: formData.get("role")?.toString(),
        content: formData.get("content")?.toString(),
        rating: formData.get("rating") ? parseInt(formData.get("rating")!.toString()) : undefined,
        image_url: formData.get("image_url")?.toString() || null, // null out if empty
    };

    // Remove undefined fields
    Object.keys(dataObj).forEach(key => dataObj[key as keyof typeof dataObj] === undefined && delete dataObj[key as keyof typeof dataObj]);

    const { error } = await supabase
        .from("testimonials")
        .update(dataObj)
        .eq("id", id);

    if (error) {
        console.error("Error updating testimonial:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting testimonial:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}
