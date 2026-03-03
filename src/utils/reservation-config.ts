import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src/data/reservation-config.json');

export function readReservationConfig() {
    const defaultData = {
        discount_days_threshold: 10,
        discount_percentage: 10,
        checkout_time: "12:00"
    };

    try {
        if (!fs.existsSync(configPath)) {
            return defaultData;
        }
        const data = fs.readFileSync(configPath, 'utf-8');
        const parsedData = JSON.parse(data);
        return { ...defaultData, ...parsedData };
    } catch (e) {
        console.error("Error reading reservation config:", e);
        return defaultData;
    }
}

export function writeReservationConfig(discount_days_threshold: number, discount_percentage: number, checkout_time: string) {
    try {
        const dir = path.dirname(configPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const data = JSON.stringify({ discount_days_threshold, discount_percentage, checkout_time }, null, 2);
        fs.writeFileSync(configPath, data, 'utf-8');
        return true;
    } catch (e) {
        console.error("Error writing reservation config:", e);
        return false;
    }
}
