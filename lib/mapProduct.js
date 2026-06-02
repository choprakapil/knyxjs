/**
 * Map a Prisma product row (with category) to the catalog shape used on the public site.
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

  const imageField = product.image || specs.image || "Main Image.png";
  const isAbsolute =
    typeof imageField === "string" &&
    (imageField.startsWith("/") ||
      imageField.startsWith("http") ||
      imageField.startsWith("data:"));

  return {
    id: `db-${product.id}`,
    dbId: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || "",
    category: product.category?.name || specs.category || "General",
    categorySlug: product.category?.slug || specs.categorySlug || "helmet",
    image: isAbsolute ? imageField : imageField,
    imageFolder: specs.imageFolder || (isAbsolute ? null : "uploads"),
    imageUrl: isAbsolute ? imageField : null,
    gallery: specs.gallery || (isAbsolute ? [imageField] : [imageField]),
    ...specs,
  };
}

export function getProductAssetSrc(product, withBasePath, filename) {
  const file = filename || product.image;
  if (!file) return "";

  if (/^(data:|https?:|\/\/)/.test(file)) return file;
  if (file.startsWith("/")) return withBasePath(file);

  if (product.imageUrl && !product.imageFolder && !filename) {
    return getProductImageSrc(product, withBasePath);
  }

  const folder = product.imageFolder || "uploads";
  return withBasePath(`/assets/img/products_images/${folder}/${file}`);
}

export function getProductImageSrc(product, withBasePath) {
  if (product.imageUrl) {
    const src = product.imageUrl;
    if (/^(data:|https?:|\/\/)/.test(src)) return src;
    return withBasePath(src);
  }
  if (product.image?.startsWith("/") || product.image?.startsWith("data:")) {
    return product.image.startsWith("/") ? withBasePath(product.image) : product.image;
  }
  const folder = product.imageFolder || "uploads";
  return withBasePath(`/assets/img/products_images/${folder}/${product.image}`);
}
