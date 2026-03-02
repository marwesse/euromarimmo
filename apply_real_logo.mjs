import puppeteer from 'puppeteer';
import * as path from 'path';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    console.log("Starting real logo upload...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`Going to settings page`);
    await page.goto(`http://localhost:3000/admin/settings`, { waitUntil: 'domcontentloaded' });

    // Wait for the form to load
    await page.waitForFunction(() => {
        const input = document.querySelector('input[name="whatsapp_number"]');
        return input && input.value.length > 0;
    });

    console.log('Form loaded, attaching logo file...');

    // There only one file input on settings page
    const fileInput = await page.$('input[type="file"]');
    const filePath = path.resolve('.gemini/antigravity/brain/2da29ae0-fb61-4886-ad2e-9072a5a0d29a/euromar_immo_logo_1772471447851.png');
    await fileInput.uploadFile(filePath);

    await sleep(2000); // Give it a sec to visually update

    // Submit
    await page.click('button[type="submit"]');

    console.log('Submitted form, waiting for response...');

    // Wait for either success message or error
    try {
        await page.waitForFunction(() => {
            return document.body.innerText.includes("Paramètres sauvegardés avec succès !") ||
                document.body.innerText.includes("Erreur") ||
                document.body.innerText.includes("unexpected response");
        }, { timeout: 15000 });

        const text = await page.evaluate(() => document.body.innerText);
        if (text.includes("Paramètres sauvegardés avec succès !")) {
            console.log("Success! Actual logo uploaded.");
        } else {
            console.log("Found error on page while saving settings!");
        }
    } catch (e) {
        console.log("Timeout waiting for response.");
    }

    await sleep(1000);
    await browser.close();
}

run().catch(console.error);
