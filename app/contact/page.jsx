import Breadcrumb from "@/components/common/Breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";
import { siteData } from "@/lib/data/site";

export default function ContactPage() {
  const { title, eyebrow, description } = siteData.pages.contact;
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
