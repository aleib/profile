import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sites = [
  { name: 'overclock', url: 'https://overclock.work/' },
  { name: 'hunch', url: 'https://hunch.tools/' },
  { name: 'coauthor-rewind', url: 'https://rewind.coauthor.studio/' },
];

const outputDir = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function captureScreenshot(name, url) {
  console.log(`Capturing ${name}...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait a bit for any animations/loading to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const filePath = path.join(outputDir, `${name}.jpg`);
    await page.screenshot({
      path: filePath,
      type: 'jpeg',
      quality: 90,
      fullPage: false, // Just capture viewport
    });
    
    console.log(`✓ Saved ${name}.jpg`);
  } catch (error) {
    console.error(`Error capturing ${name}:`, error.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('Starting screenshot capture...\n');
  
  for (const site of sites) {
    await captureScreenshot(site.name, site.url);
  }
  
  console.log('\n✓ All screenshots captured!');
}

main().catch(console.error);

