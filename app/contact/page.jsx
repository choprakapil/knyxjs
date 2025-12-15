import Breadcrumb from "@/components/common/Breadcrumb";
import ComingSoon from "@/components/common/ComingSoon";

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        title="Contact Us"
        eyebrow="Get In Touch"
        description="A dedicated enquiry workspace for prospects and partners."
      />
      <ComingSoon message="Drop us a line soon — the contact workspace is under construction." />
    </>
  );
}
