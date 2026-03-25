import { slugify } from "@/lib/utils";
import { allProducts } from "@/lib/data/products";

export async function generateStaticParams() {
    return allProducts.map((product) => ({
        category: product.categorySlug || "helmet",
        id: product.slug || slugify(product.name),
    }));
}

export default function CategoryProductLayout({ children }) {
    return <>{children}</>;
}
