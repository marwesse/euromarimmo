/**
 * Utility file for sending WhatsApp messages using UltraMsg API.
 */

export async function sendUltraMsgNotification(instanceId: string, token: string, to: string, message: string): Promise<boolean> {
    if (!instanceId || !token || !to) {
        return false;
    }

    try {
        const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;
        const data = new URLSearchParams({
            token: token,
            to: to,
            body: message
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString()
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("UltraMsg API Error:", response.status, errorText);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Fetch request to UltraMsg API failed:", error);
        return false;
    }
}
