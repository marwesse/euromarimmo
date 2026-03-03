/**
 * Utility file for sending emails using the Brevo V3 API.
 */

interface AdminNotificationParams {
    name: string;
    email: string;
    phone: string;
    message: string;
    source: string;
    adminEmail: string;
    brevoApiKey: string;
    senderEmail: string;
    senderName: string;
}

interface UserConfirmationParams {
    name: string;
    email: string;
    message: string;
    whatsappNumber: string;
    adminEmail: string;
    brevoApiKey: string;
    senderEmail: string;
    senderName: string;
    paymentMethod?: string;
    bankName?: string;
    accountHolder?: string;
    ribDetails?: string;
}

// Ensure safe strings for HTML insertion
const sanitizeHtmlParams = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Sends a notification email to the administrator when a new lead is captured.
 */
export async function sendAdminNotification(params: AdminNotificationParams): Promise<boolean> {
    const { name, email, phone, message, source, adminEmail, brevoApiKey, senderEmail, senderName } = params;

    const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-w-2xl mx-auto; background-color: #0f131a; padding: 40px 20px; color: #f3f4f6; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: 300; letter-spacing: 2px; margin: 0; text-transform: uppercase;">EUROMAR <span style="color: #d4af37;">IMMO</span></h1>
                <p style="color: #d4af37; font-size: 14px; letter-spacing: 1px; margin-top: 5px;">NOUVEAU CONTACT - ADMINISTRATION</p>
            </div>
            
            <div style="background-color: #1a202c; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 30px; margin-bottom: 30px;">
                <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">Détails du Lead (${sanitizeHtmlParams(source)})</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af; width: 120px;">Nom Complet</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: 500;">${sanitizeHtmlParams(name)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af;">Email</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;"><a href="mailto:${sanitizeHtmlParams(email)}" style="color: #d4af37; text-decoration: none;">${sanitizeHtmlParams(email)}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af;">Téléphone</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;">${sanitizeHtmlParams(phone) || 'Non spécifié'}</td>
                    </tr>
                </table>

                <div style="margin-top: 25px;">
                    <h3 style="color: #9ca3af; font-size: 14px; font-weight: 500; margin-bottom: 10px;">Message :</h3>
                    <div style="background-color: rgba(255,255,255,0.02); padding: 15px; border-radius: 6px; color: #e5e7eb; font-style: italic; white-space: pre-wrap;">
                        ${sanitizeHtmlParams(message) || 'Aucun message spécifié'}
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; color: #6b7280; font-size: 12px;">
                <p>Ceci est un message généré automatiquement par le système EUROMAR IMMO.</p>
                <p>&copy; ${new Date().getFullYear()} EUROMAR IMMO. Tous droits réservés.</p>
            </div>
        </div>
    `;

    return await callBrevoApi({
        toEmail: adminEmail,
        toName: "Admin EUROMAR IMMO",
        subject: `Nouveau Contact: ${sanitizeHtmlParams(name)} - EUROMAR IMMO`,
        htmlContent,
        brevoApiKey,
        senderEmail,
        senderName,
    });
}

/**
 * Sends a confirmation email to the user acknowledging receipt of their message.
 */
export async function sendUserConfirmationEmail(params: UserConfirmationParams): Promise<boolean> {
    const { name, email, message, whatsappNumber, adminEmail, brevoApiKey, senderEmail, senderName, paymentMethod, bankName, accountHolder, ribDetails } = params;

    let paymentBlock = "";

    if (paymentMethod === "RIB") {
        paymentBlock = `
            <div style="background-color: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: left;">
                <h3 style="color: #d4af37; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 10px;">
                    Coordonnées Bancaires
                </h3>
                <p style="color: #e5e7eb; font-size: 14px; margin-bottom: 20px;">
                    Comme convenu lors de votre réservation, veuillez trouver ci-dessous notre Relevé d'Identité Bancaire (RIB) pour effectuer votre virement :
                </p>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af; width: 140px; font-size: 14px;">Nom du compte</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: 500; font-size: 14px;">${sanitizeHtmlParams(accountHolder || 'EUROMAR IMMO')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af; font-size: 14px;">Banque</td>
                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: 500; font-size: 14px;">${sanitizeHtmlParams(bankName || '-')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #9ca3af; font-size: 14px;">RIB</td>
                        <td style="padding: 12px 0; color: #ffffff; font-weight: 500; font-size: 14px; letter-spacing: 1px;">${sanitizeHtmlParams(ribDetails || '-')}</td>
                    </tr>
                </table>
                
                <p style="color: #9ca3af; font-size: 12px; margin-top: 20px; font-style: italic;">
                    * Merci d'indiquer votre nom et le bien concerné dans le libellé de votre virement pour faciliter son traitement.
                </p>
            </div>
        `;
    } else if (paymentMethod === "Cash") {
        paymentBlock = `
            <div style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: left;">
                <p style="color: #e5e7eb; font-size: 15px; margin: 0; line-height: 1.5;">
                    <strong style="color: #ffffff;">Mode de paiement choisi :</strong> Sur place (à l'arrivée)<br/>
                    Une réponse définitive concernant la disponibilité de votre réservation vous sera envoyée dans moins de 2 heures.
                </p>
            </div>
        `;
    }

    const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-w-2xl mx-auto; background-color: #0f131a; padding: 40px 20px; color: #f3f4f6; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: 3px; margin: 0; text-transform: uppercase;">EUROMAR <span style="color: #d4af37;">IMMO</span></h1>
                <p style="color: #d4af37; font-size: 14px; letter-spacing: 2px; margin-top: 5px; text-transform: uppercase;">Immobilier de Luxe au Maroc</p>
            </div>
            
            <div style="background-color: #1a202c; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px; padding: 40px; margin-bottom: 30px; text-align: center;">
                <h2 style="color: #ffffff; font-size: 22px; font-weight: 400; margin-top: 0; margin-bottom: 20px;">Bonjour ${sanitizeHtmlParams(name)},</h2>
                
                <p style="color: #d1d5db; font-size: 16px; margin-bottom: 25px;">
                    Nous avons bien reçu votre demande de réservation/contact et nous vous en remercions. Notre équipe d'experts prendra en charge votre dossier dans les plus brefs délais afin de répondre à vos attentes concernant l'immobilier de prestige.
                </p>

                ${paymentBlock}

                <div style="background-color: rgba(255,255,255,0.02); padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 25px; text-align: left;">
                    <p style="color: #9ca3af; font-size: 14px; margin-top: 0; margin-bottom: 8px;">Votre rappel de message :</p>
                    <p style="color: #e5e7eb; font-style: italic; margin: 0; white-space: pre-wrap;">"${sanitizeHtmlParams(message)}"</p>
                </div>
                
                <p style="color: #d1d5db; font-size: 16px; margin-bottom: 0;">
                    Un conseiller premium vous contactera sous peu.
                </p>
            </div>
            
            <div style="text-align: center; color: #9ca3af; font-size: 13px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px;">
                <p style="margin-bottom: 10px;">
                    <strong style="color: #ffffff; font-weight: 500;">CONTACT RAPIDE</strong><br/>
                    Email: <a href="mailto:${sanitizeHtmlParams(adminEmail)}" style="color: #d4af37; text-decoration: none;">${sanitizeHtmlParams(adminEmail)}</a><br/>
                    WhatsApp: <a href="https://wa.me/${sanitizeHtmlParams(whatsappNumber).replace(/[^0-9]/g, '')}" style="color: #d4af37; text-decoration: none;">${sanitizeHtmlParams(whatsappNumber)}</a>
                </p>
                <p style="font-size: 11px; color: #6b7280; margin-top: 20px;">
                    Cet email est généré automatiquement. Merci de ne pas répondre directement à cet email.
                    <br/>&copy; ${new Date().getFullYear()} EUROMAR IMMO. Tous droits réservés.
                </p>
            </div>
        </div>
    `;

    return await callBrevoApi({
        toEmail: email,
        toName: name,
        subject: "Confirmation de votre demande - EUROMAR IMMO",
        htmlContent,
        brevoApiKey,
        senderEmail,
        senderName,
    });
}

/**
 * Base utility block to isolate the HTTP call to Brevo.
 */
async function callBrevoApi(props: {
    toEmail: string;
    toName: string;
    subject: string;
    htmlContent: string;
    brevoApiKey: string;
    senderEmail: string;
    senderName: string;
}): Promise<boolean> {
    const { toEmail, toName, subject, htmlContent, brevoApiKey, senderEmail, senderName } = props;

    const payload = {
        sender: { name: senderName || "EUROMAR IMMO", email: senderEmail || "khrousmail11@gmail.com" },
        to: [{ email: toEmail, name: toName }],
        subject: subject,
        htmlContent: htmlContent,
    };

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": brevoApiKey,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Brevo API Error:", response.status, errorData);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Fetch request to Brevo API failed:", error);
        return false;
    }
}
