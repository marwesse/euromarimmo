import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendLuxuryReservationEmail } from '@/lib/mail';
import { getSettings } from '@/app/actions/settings-actions';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { leadId } = body;

        if (!leadId) {
            return NextResponse.json({ error: 'leadId est requis' }, { status: 400 });
        }

        const supabase = await createClient();

        // 1. Fetch lead
        const { data: lead, error: fetchError } = await supabase
            .from('leads')
            .select('*')
            .eq('id', leadId)
            .single();

        if (fetchError || !lead) {
            return NextResponse.json({ error: 'Lead non trouvé' }, { status: 404 });
        }

        // 2. Fetch settings
        const settings = await getSettings();
        if (!settings || !settings.brevo_api_key) {
            return NextResponse.json({ error: 'Clé API Brevo manquante dans les paramètres' }, { status: 500 });
        }

        // 3. Update status to "Confirmé"
        const { error: updateError } = await supabase
            .from('leads')
            .update({ status: 'Confirmé' })
            .eq('id', leadId);

        if (updateError) {
            return NextResponse.json({ error: 'Erreur lors de la mise à jour du statut' }, { status: 500 });
        }

        // 4. Dispatch Official Confirmation Email using Brevo
        // We inject the payment block "RIB" to ensure the client receives bank details as requested
        try {
            const userSent = await sendLuxuryReservationEmail({
                name: lead.name,
                email: lead.email,
                message: "Votre réservation est maintenant officiellement confirmée par notre équipe.",
                whatsappNumber: settings.whatsapp_number,
                adminEmail: settings.contact_email || "khrousmail11@gmail.com",
                brevoApiKey: settings.brevo_api_key || process.env.BREVO_API_KEY || "",
                senderEmail: settings.sender_email || "khrousmail11@gmail.com",
                senderName: settings.sender_name || "EUROMAR IMMO",
                paymentMethod: "RIB",
                bankName: settings.bank_name,
                accountHolder: settings.account_holder,
                ribDetails: settings.rib_details
            });

            if (!userSent) {
                console.warn("L'email a échoué mais le statut de réservation a été confirmé (Code 200 renvoyé quand même).");
            }
        } catch (mailError) {
            console.error("Erreur critique lors de l'envoi de l'email Brevo. Ignorée pour fail-safe:", mailError);
        }

        return NextResponse.json({ success: true, message: 'Réservation confirmée avec succès' });

    } catch (error: any) {
        console.error('API /reservations/confirm error:', error);
        return NextResponse.json({ error: 'Erreur Serveur Interne' }, { status: 500 });
    }
}
