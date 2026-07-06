/**
 * Map a Prisma product row (with category) to the catalog shape used on the public site.
 * The `specs` JSON field stores all rich product data set via the admin panel.
 */
export function mapDbProductToCatalog(product) {
  let specs = {};
  if (product.specs) {
    try {
      specs = typeof product.specs === "string" ? JSON.parse(product.specs) : product.specs;
    } catch {
      specs = {};
    }
  }

  const safeArray = (v, fallback = []) => {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") { try { const p = JSON.parse(v); return Array.isArray(p) ? p : fallback; } catch { return fallback; } }
    return fallback;
  };

  const imageField = product.image || specs.image || "Main Image.png";
  const isAbsolute = typeof imageField === "string" &&
    (imageField.startsWith("/") || imageField.startsWith("http") || imageField.startsWith("data:"));

  // Build gallery: prefer specs.gallery, fall back to [imageField]
  const rawGallery = safeArray(specs.gallery, []);
  const gallery = rawGallery.length > 0 ? rawGallery : (isAbsolute ? [imageField] : [imageField]);

  return {
    id:               `db-${product.id}`,
    dbId:             product.id,
    name:             product.name,
    slug:             product.slug,
    description:      product.description || "",
    category:         specs.category   || product.category?.name || "General",
    categorySlug:     specs.categorySlug || product.category?.slug || "helmet",
    level:            specs.level      || "",
    grilleType:       specs.grilleType || "",
    certification:    specs.certification || "",
    image:            isAbsolute ? imageField : imageField,
    imageFolder:      specs.imageFolder || (isAbsolute ? null : "uploads"),
    imageUrl:         isAbsolute ? imageField : null,
    gallery,
    featureIds:       safeArray(specs.featureIds, []),
    techText:         safeArray(specs.techText, []),
    colors:           safeArray(specs.colors, []),
    sizes:            safeArray(specs.sizes, []),
    sizingTitle:      specs.sizingTitle || "Helmet Sizing",
    sizingText:       specs.sizingText  || "",
    accessories:      safeArray(specs.accessories, []),
    neckShieldFolder: specs.neckShieldFolder || "",
    neckShieldGallery:safeArray(specs.neckShieldGallery, []),
  };
}

export function getProductAssetSrc(product, withBasePath, filename) {
  const file = filename || product.image;
  if (!file) return "";

  // Absolute URLs / data URIs — return as-is
  if (/^(data:|https?:|\/{2})/.test(file)) return file;
  if (file.startsWith("/")) return withBasePath(file);

  // No folder specified — use uploaded absolute path
  if (product.imageUrl && !product.imageFolder && !filename) {
    return getProductImageSrc(product, withBasePath);
  }

  const folder = product.imageFolder || "uploads";
  return withBasePath(`/assets/img/products_images/${folder}/${file}`);
}

export function getProductImageSrc(product, withBasePath) {
  if (product.imageUrl) {
    const src = product.imageUrl;
    if (/^(data:|https?:|\/{2})/.test(src)) return src;
    return withBasePath(src);
  }
  if (product.image?.startsWith("/") || product.image?.startsWith("data:")) {
    return product.image.startsWith("/") ? withBasePath(product.image) : product.image;
  }
  const folder = product.imageFolder || "uploads";
  return withBasePath(`/assets/img/products_images/${folder}/${product.image}`);
}
