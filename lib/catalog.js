import { allProducts as staticProducts } from "@/lib/data/products";
import { mapDbProductToCatalog } from "@/lib/mapProduct";

/**
 * Merge database products with static catalog for a category.
 * DB entries override static entries with the same slug.
 */
export function mergeCatalogForCategory(dbProducts, categorySlug) {
  const staticForCategory = staticProducts.filter(
    (p) => (p.categorySlug || "helmet") === categorySlug
  );

  const dbMapped = (dbProducts || [])
    .map(mapDbProductToCatalog)
    .filter((p) => p.categorySlug === categorySlug);

  if (dbMapped.length === 0) {
    return staticForCategory;
  }

  const dbSlugs = new Set(dbMapped.map((p) => p.slug));
  const staticExtra = staticForCategory.filter((p) => !dbSlugs.has(p.slug));
  return [...dbMapped, ...staticExtra];
}

export function findProductBySlug(dbProducts, slug) {
  const staticMatch = staticProducts.find((p) => p.slug === slug);
  const dbMatch = (dbProducts || [])
    .map(mapDbProductToCatalog)
    .find((p) => p.slug === slug);

  return dbMatch || staticMatch || null;
}
