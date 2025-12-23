import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');
const THUMBNAIL_WIDTH = 400; // 2x for retina displays (200px * 2)
const THUMBNAIL_QUALITY = 85;

/**
 * Generates thumbnail path from original image path.
 * Example: "/images/hunch-canvas.png" -> "/images/hunch-canvas-thumb.png"
 */
function getThumbnailPath(originalPath) {
  const extIndex = originalPath.lastIndexOf('.');
  if (extIndex <= 0) {
    return `${originalPath}-thumb`;
  }
  return `${originalPath.slice(0, extIndex)}-thumb${originalPath.slice(extIndex)}`;
}

/**
 * Checks if a thumbnail already exists for the given image.
 */
function thumbnailExists(imagePath) {
  const thumbnailPath = getThumbnailPath(imagePath);
  return fs.existsSync(path.join(imagesDir, thumbnailPath));
}

/**
 * Generates a thumbnail for an image file.
 */
async function generateThumbnail(imageFile) {
  const imagePath = path.join(imagesDir, imageFile);
  const thumbnailPath = path.join(imagesDir, getThumbnailPath(imageFile));

  try {
    // Get image metadata to preserve aspect ratio and format
    const metadata = await sharp(imagePath).metadata();
    
    // Calculate height to maintain aspect ratio
    const aspectRatio = metadata.height / metadata.width;
    const thumbnailHeight = Math.round(THUMBNAIL_WIDTH * aspectRatio);

    // Create sharp instance with resize
    let pipeline = sharp(imagePath).resize(THUMBNAIL_WIDTH, thumbnailHeight, {
      fit: 'inside',
      withoutEnlargement: true, // Don't enlarge if image is smaller than thumbnail size
    });

    // Apply format-specific optimizations based on original format
    const format = metadata.format;
    if (format === 'jpeg' || format === 'jpg') {
      pipeline = pipeline.jpeg({ quality: THUMBNAIL_QUALITY, mozjpeg: true });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality: THUMBNAIL_QUALITY, compressionLevel: 9 });
    } else if (format === 'webp') {
      pipeline = pipeline.webp({ quality: THUMBNAIL_QUALITY });
    }
    // For other formats, sharp will preserve the format automatically

    await pipeline.toFile(thumbnailPath);

    const stats = fs.statSync(imagePath);
    const thumbStats = fs.statSync(thumbnailPath);
    const savings = ((1 - thumbStats.size / stats.size) * 100).toFixed(1);

    console.log(`✓ ${imageFile} → ${path.basename(thumbnailPath)} (${savings}% smaller)`);
    return { success: true, savings };
  } catch (error) {
    console.error(`✗ Error processing ${imageFile}:`, error.message);
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
  console.log('Generating thumbnails...\n');
  console.log(`Target width: ${THUMBNAIL_WIDTH}px (for 200px display at 2x)\n`);

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
    if (thumbnailExists(imageFile)) {
      console.log(`⊘ Skipping ${imageFile} (thumbnail already exists)`);
      skipCount++;
      continue;
    }

    const result = await generateThumbnail(imageFile);
    if (result.success) {
      successCount++;
    } else {
      errorCount++;
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

