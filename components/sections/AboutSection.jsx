import { withBasePath } from "@/lib/asset";
import BrandStorySection from "@/components/sections/BrandStorySection";

const AboutSection = ({ showButton = true }) => (
  <div id="brand-story" className="tp-about-area pt-40 pb-60 p-relative z-index-1">
    <div className="container-fluid container-1524">
      <div className="row">
        <div className="col-12">
          <div className="tp-about-ai-text-wrap mb-80 text-center">
            <h3 className="tp-about-ai-text tp-ff-jakarta fw-600 fs-72 fs-xl-60 fs-md-38 lh-120-per ls-m-4 tp-text-common-white">
              We design and ship high‑performance experiences <span className="has-scale-image hide-ball" style={{ opacity: 1, transform: "scale(1)" }}><div className="hidden-image" style={{ backgroundImage: `url(${withBasePath("/assets/img/about/ai/shape.png")})`, backgroundColor: "#111112" }}></div></span> that help teams stay ahead of{' '}
              <span className="has-scale-image hide-ball" style={{ opacity: 1, transform: "scale(1)" }}><div className="hidden-image" style={{ backgroundImage: `url(${withBasePath("/assets/img/about/ai/shape-2.png")})`, backgroundColor: "#111112" }}></div></span> the curve with resilient, scalable systems and{' '}
              <span className="has-scale-image hide-ball" style={{ opacity: 1, transform: "scale(1)" }}><div className="hidden-image" style={{ backgroundImage: `url(${withBasePath("/assets/img/about/ai/shape-3.png")})`, backgroundColor: "#111112" }}></div></span> thoughtful craft — from research to production.
            </h3>
          </div>
        </div>
      </div>
      <div className="row align-items-center">

        <BrandStorySection isHomePage={true} />
      </div>
    </div>
  </div>
);

export default AboutSection;
