import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src/data/payment-config.json');

export function readPaymentConfig() {
    const defaultData = {
        enable_cash: true,
        enable_rib: true,
        enable_card: true,
    };

    try {
        if (!fs.existsSync(configPath)) {
            return defaultData;
        }
        const data = fs.readFileSync(configPath, 'utf-8');
        const parsedData = JSON.parse(data);
        return { ...defaultData, ...parsedData };
    } catch (e) {
        console.error("Error reading payment config:", e);
        return defaultData;
    }
}

export function writePaymentConfig(enable_cash: boolean, enable_rib: boolean, enable_card: boolean) {
    try {
        const dir = path.dirname(configPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const data = JSON.stringify({ enable_cash, enable_rib, enable_card }, null, 2);
        fs.writeFileSync(configPath, data, 'utf-8');
        return true;
    } catch (e) {
        console.error("Error writing payment config:", e);
        return false;
    }
}
