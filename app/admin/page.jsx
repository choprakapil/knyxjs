import Breadcrumb from "@/components/common/Breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";

export default function AdminPage() {
  return (
    <>
      <Breadcrumb
        title="Admin Panel"
        eyebrow="Control Center"
        description="SEO, catalogue management, and lead workflows will live here."
      />
      <ComingSoon message="The unified admin console (SEO, products, enquiries) launches shortly." />
    </>
  );
}
