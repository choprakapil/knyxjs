import BackToTop from "@/components/layout/BackToTop";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Offcanvas from "@/components/layout/Offcanvas";
import HelmetProductDetailsClient from "@/components/products/HelmetProductDetailsClient";

export default async function HelmetProductDetailsPage({ params }) {
  const { id } = await params;

  return (
    <>
      <div className="tp-hero-ai-body-overlay"></div>
      <BackToTop />
      <Offcanvas />
      <Header />
      <main>
        <HelmetProductDetailsClient id={id} />
      </main>
      <Footer />
    </>
  );
}
