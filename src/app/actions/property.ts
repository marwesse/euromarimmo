"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addProperty(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const type = formData.get("type") as string;
        const location = formData.get("location") as string;

        const description = formData.get("description") as string;
        const status = formData.get("status") as string;
        const bedrooms = Number(formData.get("bedrooms")) || 0;
        const bathrooms = Number(formData.get("bathrooms")) || 0;
        const surface = Number(formData.get("surface")) || 0;
        const yearbuilt = Number(formData.get("yearbuilt")) || new Date().getFullYear();

        let images: string[] = [];
        try {
            const imagesRaw = formData.get("images") as string;
            if (imagesRaw) images = JSON.parse(imagesRaw);
        } catch (e) { console.error("Could not parse images array"); }

        let amenities: string[] = [];
        try {
            const amenitiesRaw = formData.get("amenities") as string;
            if (amenitiesRaw) amenities = JSON.parse(amenitiesRaw);
        } catch (e) { console.error("Could not parse amenities array"); }

        if (!title || !price || !type || !location) {
            throw new Error("Tous les champs (Titre, Prix, Type, Quartier) sont obligatoires.");
        }

        const parsedPrice = Number(price);

        console.log("Data to insert:", { title, parsedPrice, type, location, bedrooms, bathrooms, surface });

        const supabase = await createClient();

        // Handle File Uploads
        const imageFiles = formData.getAll("imageFiles") as File[];
        for (const file of imageFiles) {
            if (file.size > 0) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

                const { data, error: uploadError } = await supabase.storage
                    .from('properties')
                    .upload(fileName, file);

                if (uploadError) {
                    console.error("Error uploading image:", uploadError);
                    // attempt to create bucket if it doesn't exist
                    if (uploadError.message.includes('bucket')) {
                        console.log("Bucket might not exist, but we cannot create it safely from here without service role, skipping this image.");
                    }
                } else if (data) {
                    const { data: publicUrlData } = supabase.storage.from('properties').getPublicUrl(fileName);
                    images.push(publicUrlData.publicUrl);
                }
            }
        }

        const { error } = await supabase
            .from("properties")
            .insert({
                title,
                price: parsedPrice,
                type,
                location,
                description,
                status: status || 'Nouveau',
                bedrooms,
                bathrooms,
                surface,
                yearbuilt,
                images,
                amenities
            });

        if (error) throw error;

        revalidatePath("/admin");
        revalidatePath("/proprietes");

        return { success: true };
    } catch (error) {
        console.error("Error adding property:", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}

export async function updateBasicProperty(formData: FormData) {
    try {
        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const type = formData.get("type") as string;
        const location = formData.get("location") as string;

        const description = formData.get("description") as string;
        const status = formData.get("status") as string;
        const bedrooms = Number(formData.get("bedrooms")) || 0;
        const bathrooms = Number(formData.get("bathrooms")) || 0;
        const surface = Number(formData.get("surface")) || 0;
        const yearbuilt = Number(formData.get("yearbuilt")) || new Date().getFullYear();

        let images: string[] = [];
        try {
            const imagesRaw = formData.get("images") as string;
            if (imagesRaw) images = JSON.parse(imagesRaw);
        } catch (e) { console.error("Could not parse images array"); }

        let amenities: string[] = [];
        try {
            const amenitiesRaw = formData.get("amenities") as string;
            if (amenitiesRaw) amenities = JSON.parse(amenitiesRaw);
        } catch (e) { console.error("Could not parse amenities array"); }

        if (!id || !title || !price || !type || !location) {
            throw new Error("L'ID, Titre, Prix, Type, Quartier sont obligatoires.");
        }

        const parsedPrice = Number(price);

        console.log("Data to update:", { id, title, parsedPrice, type, location, bedrooms, bathrooms, surface });

        const supabase = await createClient();

        // Handle File Uploads
        const imageFiles = formData.getAll("imageFiles") as File[];
        for (const file of imageFiles) {
            if (file.size > 0) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

                const { data, error: uploadError } = await supabase.storage
                    .from('properties')
                    .upload(fileName, file);

                if (uploadError) {
                    console.error("Error uploading image:", uploadError);
                } else if (data) {
                    const { data: publicUrlData } = supabase.storage.from('properties').getPublicUrl(fileName);
                    images.push(publicUrlData.publicUrl);
                }
            }
        }

        const { error } = await supabase
            .from("properties")
            .update({
                title,
                price: parsedPrice,
                type,
                location,
                description,
                status: status || 'Nouveau',
                bedrooms,
                bathrooms,
                surface,
                yearbuilt,
                images,
                amenities
            })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin");
        revalidatePath("/proprietes");
        revalidatePath(`/proprietes/${id}`);

        return { success: true };
    } catch (error) {
        console.error("Error updating property:", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}
