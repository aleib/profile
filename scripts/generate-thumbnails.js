import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');

// Image size variants
const VARIANTS = {
  thumb: {
    width: 400,    // 2x for retina displays (200px * 2) - desktop
    suffix: '-thumb',
    quality: 85,
  },
  mobile: {
    width: 800,    // 2x for retina displays (~340px * 2) - mobile
    suffix: '-mobile',
    quality: 85,
  },
};

/**
 * Generates variant path from original image path.
 * Example: "/images/hunch-canvas.png" with suffix "-thumb" -> "/images/hunch-canvas-thumb.png"
 */
function getVariantPath(originalPath, suffix) {
  const extIndex = originalPath.lastIndexOf('.');
  if (extIndex <= 0) {
    return `${originalPath}${suffix}`;
  }
  return `${originalPath.slice(0, extIndex)}${suffix}${originalPath.slice(extIndex)}`;
}

/**
 * Checks if a variant already exists for the given image.
 */
function variantExists(imagePath, suffix) {
  const variantPath = getVariantPath(imagePath, suffix);
  return fs.existsSync(path.join(imagesDir, variantPath));
}

/**
 * Generates a variant (thumbnail or mobile) for an image file.
 */
async function generateVariant(imageFile, variantName) {
  const variant = VARIANTS[variantName];
  const imagePath = path.join(imagesDir, imageFile);
  const outputPath = path.join(imagesDir, getVariantPath(imageFile, variant.suffix));

  try {
    // Get image metadata to preserve aspect ratio and format
    const metadata = await sharp(imagePath).metadata();

    // Calculate height to maintain aspect ratio
    const aspectRatio = metadata.height / metadata.width;
    const targetHeight = Math.round(variant.width * aspectRatio);

    // Create sharp instance with resize
    let pipeline = sharp(imagePath).resize(variant.width, targetHeight, {
      fit: 'inside',
      withoutEnlargement: true, // Don't enlarge if image is smaller than target size
    });

    // Apply format-specific optimizations based on original format
    const format = metadata.format;
    if (format === 'jpeg' || format === 'jpg') {
      pipeline = pipeline.jpeg({ quality: variant.quality, mozjpeg: true });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality: variant.quality, compressionLevel: 9 });
    } else if (format === 'webp') {
      pipeline = pipeline.webp({ quality: variant.quality });
    }
    // For other formats, sharp will preserve the format automatically

    await pipeline.toFile(outputPath);

    const stats = fs.statSync(imagePath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((1 - outputStats.size / stats.size) * 100).toFixed(1);

    console.log(`✓ ${imageFile} → ${path.basename(outputPath)} (${savings}% smaller)`);
    return { success: true, savings };
  } catch (error) {
    console.error(`✗ Error processing ${imageFile} [${variantName}]:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Gets all image files from the images directory.
 */
function getImageFiles() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];

  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext) && !file.includes('-thumb');
  });
}

async function main() {
  console.log('Generating image variants...\n');
  console.log('Variants:');
  for (const [name, config] of Object.entries(VARIANTS)) {
    console.log(`  • ${name}: ${config.width}px (suffix: ${config.suffix})`);
  }
  console.log();

  const imageFiles = getImageFiles();

  if (imageFiles.length === 0) {
    console.log('No images found to process.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to process:\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const imageFile of imageFiles) {
    for (const [variantName, variant] of Object.entries(VARIANTS)) {
      if (variantExists(imageFile, variant.suffix)) {
        console.log(`⊘ Skipping ${imageFile} [${variantName}] (already exists)`);
        skipCount++;
        continue;
      }

      const result = await generateVariant(imageFile, variantName);
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Summary:`);
  console.log(`  ✓ Generated: ${successCount}`);
  console.log(`  ⊘ Skipped: ${skipCount}`);
  console.log(`  ✗ Errors: ${errorCount}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n💡 Next step: Update work.ts to add hasThumbnail: true to projects with thumbnails.');
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

