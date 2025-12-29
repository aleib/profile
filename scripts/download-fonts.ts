import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=optional";
const PUBLIC_FONTS_DIR = path.join(__dirname, '../public/fonts');
const SRC_CSS_FILE = path.join(__dirname, '../src/fonts.css');

// Ensure fonts directory exists
if (!fs.existsSync(PUBLIC_FONTS_DIR)) {
    fs.mkdirSync(PUBLIC_FONTS_DIR, { recursive: true });
}

const downloadFile = (url: string, dest: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const fetchCSS = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
};

async function main() {
    console.log('Fetching Google Fonts CSS...');
    const cssContent = await fetchCSS(GOOGLE_FONTS_URL);

    let updatedCss = cssContent;
    const fontUrlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;
    let match;
    const downloads: Promise<void>[] = [];
    const urlMap = new Map<string, string>();

    // Identify all font URLs
    while ((match = fontUrlRegex.exec(cssContent)) !== null) {
        const url = match[1];
        if (!urlMap.has(url)) {
            const filename = path.basename(url);
            const localPath = `/fonts/${filename}`; // Public path
            urlMap.set(url, localPath);

            const destPath = path.join(PUBLIC_FONTS_DIR, filename);
            console.log(`Queueing download: ${filename}`);
            downloads.push(downloadFile(url, destPath));
        }
    }

    // Replace URLs in CSS
    urlMap.forEach((localPath, url) => {
        updatedCss = updatedCss.split(url).join(localPath);
    });

    await Promise.all(downloads);
    console.log(`Downloaded ${downloads.length} font files.`);

    fs.writeFileSync(SRC_CSS_FILE, updatedCss);
    console.log(`Generated ${SRC_CSS_FILE}`);
}

main().catch(console.error);
