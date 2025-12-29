import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');

// Optimization settings
const CONFIG = {
    maxWidth: 1600,        // Max width for full images (no point serving larger)
    jpegQuality: 85,       // JPEG quality (85 is a good balance)
    pngQuality: 85,        // PNG quality
    webpQuality: 85,       // WebP quality
    backupSuffix: '-original', // Suffix for backup files (set to null to skip backup)
};

/**
 * Gets all original image files (excludes variants like -thumb, -mobile, -original).
 */
function getOriginalImageFiles() {
    if (!fs.existsSync(imagesDir)) {
        console.error(`Images directory not found: ${imagesDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(imagesDir);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const variantSuffixes = ['-thumb', '-mobile', '-original'];

    return files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        const nameWithoutExt = path.basename(file, ext);
        const isVariant = variantSuffixes.some(suffix => nameWithoutExt.endsWith(suffix));
        return imageExtensions.includes(ext) && !isVariant;
    });
}

/**
 * Optimizes a single image file.
 */
async function optimizeImage(imageFile) {
    const imagePath = path.join(imagesDir, imageFile);
    const ext = path.extname(imageFile).toLowerCase();
    const nameWithoutExt = path.basename(imageFile, ext);

    try {
        const originalStats = fs.statSync(imagePath);
        const metadata = await sharp(imagePath).metadata();

        // Create backup if configured
        if (CONFIG.backupSuffix) {
            const backupPath = path.join(imagesDir, `${nameWithoutExt}${CONFIG.backupSuffix}${ext}`);
            if (!fs.existsSync(backupPath)) {
                fs.copyFileSync(imagePath, backupPath);
            }
        }

        // Calculate dimensions (resize if wider than maxWidth)
        let targetWidth = metadata.width;
        let targetHeight = metadata.height;

        if (metadata.width > CONFIG.maxWidth) {
            const aspectRatio = metadata.height / metadata.width;
            targetWidth = CONFIG.maxWidth;
            targetHeight = Math.round(CONFIG.maxWidth * aspectRatio);
        }

        // Build optimization pipeline
        let pipeline = sharp(imagePath);

        // Resize if needed
        if (targetWidth !== metadata.width) {
            pipeline = pipeline.resize(targetWidth, targetHeight, {
                fit: 'inside',
                withoutEnlargement: true,
            });
        }

        // Apply format-specific optimizations
        const format = metadata.format;
        if (format === 'jpeg' || format === 'jpg') {
            pipeline = pipeline.jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true });
        } else if (format === 'png') {
            pipeline = pipeline.png({ quality: CONFIG.pngQuality, compressionLevel: 9 });
        } else if (format === 'webp') {
            pipeline = pipeline.webp({ quality: CONFIG.webpQuality });
        }

        // Write to temp file first, then replace original
        const tempPath = imagePath + '.tmp';
        await pipeline.toFile(tempPath);

        // Replace original with optimized version
        fs.unlinkSync(imagePath);
        fs.renameSync(tempPath, imagePath);

        const newStats = fs.statSync(imagePath);
        const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
        const oldSize = (originalStats.size / 1024).toFixed(0);
        const newSize = (newStats.size / 1024).toFixed(0);

        const resized = targetWidth !== metadata.width ? ` [resized ${metadata.width}→${targetWidth}px]` : '';
        console.log(`✓ ${imageFile}: ${oldSize}KB → ${newSize}KB (${savings}% smaller)${resized}`);

        return { success: true, savings: parseFloat(savings), oldSize: originalStats.size, newSize: newStats.size };
    } catch (error) {
        console.error(`✗ Error processing ${imageFile}:`, error.message);
        return { success: false, error: error.message };
    }
}

async function main() {
    console.log('Optimizing images for web...\n');
    console.log('Settings:');
    console.log(`  • Max width: ${CONFIG.maxWidth}px`);
    console.log(`  • JPEG quality: ${CONFIG.jpegQuality}`);
    console.log(`  • PNG quality: ${CONFIG.pngQuality}`);
    console.log(`  • WebP quality: ${CONFIG.webpQuality}`);
    console.log(`  • Backup: ${CONFIG.backupSuffix ? `Yes (${CONFIG.backupSuffix})` : 'No'}`);
    console.log();

    const imageFiles = getOriginalImageFiles();

    if (imageFiles.length === 0) {
        console.log('No images found to optimize.');
        return;
    }

    console.log(`Found ${imageFiles.length} image(s) to optimize:\n`);

    let successCount = 0;
    let errorCount = 0;
    let totalOldSize = 0;
    let totalNewSize = 0;

    for (const imageFile of imageFiles) {
        const result = await optimizeImage(imageFile);
        if (result.success) {
            successCount++;
            totalOldSize += result.oldSize;
            totalNewSize += result.newSize;
        } else {
            errorCount++;
        }
    }

    const totalSavings = ((1 - totalNewSize / totalOldSize) * 100).toFixed(1);
    const totalOldMB = (totalOldSize / 1024 / 1024).toFixed(2);
    const totalNewMB = (totalNewSize / 1024 / 1024).toFixed(2);

    console.log('\n' + '='.repeat(50));
    console.log('Summary:');
    console.log(`  ✓ Optimized: ${successCount}`);
    console.log(`  ✗ Errors: ${errorCount}`);
    console.log(`  📦 Total: ${totalOldMB}MB → ${totalNewMB}MB (${totalSavings}% smaller)`);
    console.log('='.repeat(50));

    if (CONFIG.backupSuffix) {
        console.log(`\n💡 Original files backed up with "${CONFIG.backupSuffix}" suffix.`);
        console.log('   Delete backups after verification: rm public/images/*-original.*');
    }
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
