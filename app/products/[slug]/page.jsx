import Breadcrumb from "@/components/common/Breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";
import { notFound } from "next/navigation";

const products = [
  { slug: "insight-engine", title: "Insight Engine", eyebrow: "Product" },
  { slug: "vision-suite", title: "Vision Suite", eyebrow: "Product" },
  { slug: "automation-cloud", title: "Automation Cloud", eyebrow: "Product" },
  { slug: "data-hub", title: "Data Hub", eyebrow: "Product" },
];

export default async function ProductPage({ params }) {
  const { slug } = params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        title={product.title}
        eyebrow={product.eyebrow}
        description="Full technical specs and demos are coming soon."
      />
      <ComingSoon message={`${product.title} documentation and media assets are publishing shortly.`} />
    </>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}
