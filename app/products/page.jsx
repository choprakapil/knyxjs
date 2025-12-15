import Breadcrumb from "@/components/common/Breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb
        title="Products"
        eyebrow="Intelligent Stack"
        description="Browse the AI solutions that power your operations."
      />
      <ComingSoon message="A curated grid of every product module will ship soon." />
    </>
  );
}
