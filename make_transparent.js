// Using pure canvas to make white transparent
const { Canvas, Image } = require('canvas');
const fs = require('fs');

function makeTransparent() {
    const inputPath = '/Users/marouanekdidou/.gemini/antigravity/brain/2da29ae0-fb61-4886-ad2e-9072a5a0d29a/large_emblem_logo_1772472178266.png';
    const outputPath = '/Users/marouanekdidou/Desktop/Finaaaal/transparent_emblem.png';

    fs.readFile(inputPath, (err, fileData) => {
        if (err) throw err;
        const img = new Image();
        img.onload = () => {
            const canvas = new Canvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
                    data[i + 3] = 0; // alpha
                }
            }

            ctx.putImageData(imageData, 0, 0);

            const out = fs.createWriteStream(outputPath);
            const stream = canvas.createPNGStream();
            stream.pipe(out);
            out.on('finish', () => console.log('Transprency done! saved to', outputPath));
        };
        img.onerror = err => { throw err };
        img.src = fileData;
    });
}
makeTransparent();
