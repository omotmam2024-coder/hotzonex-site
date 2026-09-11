/**
 * Generates the site's logo files from the original artwork in img/logo.png.
 *
 * The original is a 1024px, 1.8 MB PNG with a lot of transparent margin — far too
 * heavy to load on every page. This crops it to the badge, then writes small,
 * compressed copies for each place a logo appears:
 *
 *   public/brand/hotzonex-logo.png      256px  header, footer, assistant, 404 page
 *   public/brand/hotzonex-logo-512.png  512px  social preview card, search engines
 *   src/app/icon.png                    192px  browser tab and Android home screen
 *   src/app/apple-icon.png              180px  iPhone home screen (white background)
 *   src/app/favicon.ico            16/32/48px  legacy favicon
 *
 * It also cuts the office photo (img/office.png) into focused crops for the page
 * images — reception, services wall, equipment shelves and so on — so rows of cards
 * show different parts of the office rather than the same picture repeated:
 *
 *   src/assets/office/<crop>.jpg        imported by src/lib/office-images.ts
 *
 * Run `npm run brand` after replacing either original, then commit the outputs.
 */
import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(root, "img/logo.png");
const OFFICE = path.join(root, "img/office.png");

/**
 * Crop boxes in pixels on the 1536×1024 office photo: [left, top, width, height].
 * If the photo is replaced with a different shot, adjust these to match it.
 */
const OFFICE_CROPS = {
  reception: [700, 60, 836, 836],
  sign: [900, 100, 636, 460],
  servicesWall: [0, 30, 660, 580],
  equipment: [300, 80, 600, 400],
  workstations: [290, 230, 590, 470],
  desk: [760, 440, 776, 520],
  wide: [0, 0, 1536, 1024],
};

/** Alpha below this is treated as empty margin when finding the badge's edges. */
const ALPHA_THRESHOLD = 8;

const png = (image) => image.png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 });

/** The badge cropped to its visible edges and centred on a transparent square. */
async function croppedBadge() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * info.channels + 3] <= ALPHA_THRESHOLD) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) throw new Error(`${path.relative(root, SOURCE)} has no visible pixels.`);

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const side = Math.max(width, height);

  return sharp(SOURCE)
    .extract({ left: minX, top: minY, width, height })
    .extend({
      top: Math.floor((side - height) / 2),
      bottom: Math.ceil((side - height) / 2),
      left: Math.floor((side - width) / 2),
      right: Math.ceil((side - width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

/** ICO container holding PNG-encoded images (supported by every current browser). */
function toIco(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });

  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

async function main() {
  if (!fs.existsSync(SOURCE)) throw new Error(`Logo not found: ${path.relative(root, SOURCE)}`);

  const badge = await croppedBadge();
  const outputs = [];
  const write = (relative, data) => {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, data);
    outputs.push(`${relative} (${(data.length / 1024).toFixed(1)} KB)`);
  };

  write("public/brand/hotzonex-logo.png", await png(sharp(badge).resize(256, 256)).toBuffer());
  write("public/brand/hotzonex-logo-512.png", await png(sharp(badge).resize(512, 512)).toBuffer());
  write("src/app/icon.png", await png(sharp(badge).resize(192, 192)).toBuffer());

  // iOS ignores transparency on home-screen icons and fills it with black.
  const appleBadge = await sharp(badge).resize(152, 152).toBuffer();
  write(
    "src/app/apple-icon.png",
    await png(
      sharp({ create: { width: 180, height: 180, channels: 4, background: "#ffffff" } }).composite([
        { input: appleBadge, gravity: "centre" },
      ]),
    ).toBuffer(),
  );

  const icoImages = await Promise.all(
    [16, 32, 48].map(async (size) => ({ size, data: await sharp(badge).resize(size, size).png().toBuffer() })),
  );
  write("src/app/favicon.ico", toIco(icoImages));

  if (fs.existsSync(OFFICE)) {
    // Kept at their natural size; next/image resizes them per screen when served.
    for (const [name, [left, top, width, height]] of Object.entries(OFFICE_CROPS)) {
      const crop = await sharp(OFFICE)
        .extract({ left, top, width, height })
        .jpeg({ quality: 84, mozjpeg: true, progressive: true })
        .toBuffer();
      write(`src/assets/office/${name}.jpg`, crop);
    }
  }

  console.log(`Brand assets from img/:\n  ${outputs.join("\n  ")}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
