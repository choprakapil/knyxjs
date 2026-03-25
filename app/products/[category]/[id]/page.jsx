import BackToTop from "@/components/layout/BackToTop";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Offcanvas from "@/components/layout/Offcanvas";
import ProductDetailsClient from "@/components/products/ProductDetailsClient";

export default async function CategoryProductDetailsPage({ params }) {
  const { id } = await params;

  return (
    <>
      <div className="tp-hero-ai-body-overlay"></div>
      <BackToTop />
      <Offcanvas />
      <Header />
      <main>
        <ProductDetailsClient id={id} />
      </main>
      <Footer />
    </>
  );
}
