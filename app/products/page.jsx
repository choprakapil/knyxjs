import Breadcrumb from "@/components/common/Breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";
import { siteData } from "@/lib/data/site";

export default function ProductsPage() {
  const { title, eyebrow, description } = siteData.pages.products;
  return (
    <>
      <Breadcrumb
        title={title}
        eyebrow={eyebrow}
        description={description}
      />
      <ComingSoon />
    </>
  );
}
