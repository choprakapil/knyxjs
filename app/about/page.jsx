import Breadcrumb from "@/components/common/Breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";

export default function AboutPage() {
  return (
    <>
      <Breadcrumb
        title="About Us"
        eyebrow="Who We Are"
        description="Learn more about the team powering your AI experiences."
      />
      <ComingSoon message="Our story, values, and leadership profiles are on the way." />
    </>
  );
}
