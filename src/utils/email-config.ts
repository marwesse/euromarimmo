import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src/data/email-config.json');

export function readEmailConfig() {
    const defaultData = {
        contact_email: "khrousmail11@gmail.com",
        brevo_api_key: "",
        sender_email: "khrousmail11@gmail.com",
        sender_name: "EUROMAR IMMO"
    };

    try {
        if (!fs.existsSync(configPath)) {
            // Default fallback using user-provided values
            return defaultData;
        }
        const data = fs.readFileSync(configPath, 'utf-8');
        const parsedData = JSON.parse(data);
        return { ...defaultData, ...parsedData };
    } catch (e) {
        console.error("Error reading email config:", e);
        return defaultData;
    }
}

export function writeEmailConfig(contact_email: string, brevo_api_key: string, sender_email: string, sender_name: string) {
    try {
        const dir = path.dirname(configPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const data = JSON.stringify({ contact_email, brevo_api_key, sender_email, sender_name }, null, 2);
        fs.writeFileSync(configPath, data, 'utf-8');
        return true;
    } catch (e) {
        console.error("Error writing email config:", e);
        return false;
    }
}
