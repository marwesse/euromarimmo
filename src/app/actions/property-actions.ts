"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProperties() {
    const supabase = await createClient();
    const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
    return properties;
}

export async function getPropertyById(id: string) {
    const supabase = await createClient();
    const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching property ${id}:`, error);
        return null;
    }
    return property;
}

export async function createProperty(formData: FormData) {
    try {
        const supabase = await createClient();

        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const type = formData.get("type")?.toString();
        const transactiontype = formData.get("transactionType")?.toString() || formData.get("transactiontype")?.toString();
        const price = formData.get("price")?.toString();
        const priceNumericStr = formData.get("priceNumeric")?.toString() || formData.get("pricenumeric")?.toString();

        const errors: string[] = [];
        if (!title) errors.push("Le titre est requis.");
        if (!description) errors.push("La description est requise.");
        if (!type) errors.push("Le type de bien est requis.");
        if (!transactiontype) errors.push("Le type de transaction est requis.");
        if (!price) errors.push("Le prix affiché est requis.");
        if (!priceNumericStr) errors.push("La valeur numérique du prix est requise.");

        if (errors.length > 0) {
            return { success: false, error: errors.join(" ") };
        }

        const pricenumeric = Number(priceNumericStr);

        const propertyData = {
            title,
            description,
            type,
            transactiontype,
            price,
            pricenumeric,
            status: formData.get("status")?.toString(),
            location: formData.get("location")?.toString(),
            city: formData.get("city")?.toString(),
            bedrooms: Number(formData.get("bedrooms")) || null,
            bathrooms: Number(formData.get("bathrooms")) || null,
            surface: Number(formData.get("surface")) || null,
            yearbuilt: Number(formData.get("yearBuilt") || formData.get("yearbuilt")) || null,
            amenities: formData.get("amenities") ? JSON.parse(formData.get("amenities") as string) : [],
            images: formData.get("images") ? JSON.parse(formData.get("images") as string) : [],
        };

        const { data, error } = await supabase
            .from('properties')
            .insert([propertyData])
            .select();

        if (error) throw error;

        revalidatePath("/admin");
        revalidatePath("/proprietes");
        revalidatePath("/");

        return { success: true, data };
    } catch (error: any) {
        console.error("Error creating property:", error);
        return { success: false, error: error.message || "Failed to create property" };
    }
}

export async function updateProperty(formData: FormData) {
    try {
        const id = formData.get("id")?.toString();
        if (!id) throw new Error("Property ID is missing");

        const supabase = await createClient();

        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const type = formData.get("type")?.toString();
        const transactiontype = formData.get("transactionType")?.toString() || formData.get("transactiontype")?.toString();
        const price = formData.get("price")?.toString();
        const priceNumericStr = formData.get("priceNumeric")?.toString() || formData.get("pricenumeric")?.toString();

        const errors: string[] = [];
        if (!title) errors.push("Le titre est requis.");
        if (!description) errors.push("La description est requise.");
        if (!type) errors.push("Le type de bien est requis.");
        if (!transactiontype) errors.push("Le type de transaction est requis.");
        if (!price) errors.push("Le prix affiché est requis.");
        if (!priceNumericStr) errors.push("La valeur numérique du prix est requise.");

        if (errors.length > 0) {
            return { success: false, error: errors.join(" ") };
        }

        const pricenumeric = Number(priceNumericStr);

        const propertyData = {
            title,
            description,
            type,
            transactiontype,
            price,
            pricenumeric,
            status: formData.get("status")?.toString(),
            location: formData.get("location")?.toString(),
            city: formData.get("city")?.toString(),
            bedrooms: Number(formData.get("bedrooms")) || null,
            bathrooms: Number(formData.get("bathrooms")) || null,
            surface: Number(formData.get("surface")) || null,
            yearbuilt: Number(formData.get("yearBuilt") || formData.get("yearbuilt")) || null,
            amenities: formData.get("amenities") ? JSON.parse(formData.get("amenities") as string) : [],
            images: formData.get("images") ? JSON.parse(formData.get("images") as string) : [],
        };

        const { data, error } = await supabase
            .from('properties')
            .update(propertyData)
            .eq('id', id)
            .select();

        if (error) throw error;

        revalidatePath("/admin");
        revalidatePath("/proprietes");
        revalidatePath("/");
        revalidatePath(`/proprietes/${id}`);

        return { success: true, data };
    } catch (error: any) {
        console.error("Error updating property:", error);
        return { success: false, error: error.message || "Failed to update property" };
    }
}

export async function deleteProperty(id: string) {
    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);

        if (error) throw error;

        revalidatePath("/admin");
        revalidatePath("/proprietes");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error(`Error deleting property ${id}:`, error);
        return { success: false, error: error.message || "Failed to delete property" };
    }
}

export async function togglePropertyFeatured(id: string, isFeatured: boolean) {
    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from('properties')
            .update({ isFeatured })
            .eq('id', id);

        if (error) throw error;

        revalidatePath("/admin");
        revalidatePath("/proprietes");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error(`Error toggling property featured status ${id}:`, error);
        return { success: false, error: error.message || "Failed to toggle featured status" };
    }
}
