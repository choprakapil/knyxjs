const allProducts = [
    { id: "product-1", name: "KNYX Pro Elite V1" },
    { id: "product-2", name: "KNYX Pro Elite V2" },
    { id: "product-3", name: "KNYX Pro Master" },
    { id: "product-4", name: "KNYX Pro Titanium" },
    { id: "product-5", name: "KNYX Pro Signature" },
    { id: "product-6", name: "KNYX Classic Lite" },
    { id: "product-7", name: "KNYX Club Essential" },
    { id: "product-8", name: "KNYX Practice Series" },
    { id: "product-9", name: "KNYX Academy Edition" },
    { id: "product-10", name: "KNYX Starter Pro" },
];

export async function generateStaticParams() {
    return allProducts.map((product) => ({
        id: product.id,
    }));
}

export default function HelmetProductLayout({ children }) {
    return <>{children}</>;
}
