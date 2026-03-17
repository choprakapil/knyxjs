import BrandStorySection from "@/components/sections/BrandStorySection";

const AboutSection = ({ showButton = true }) => (
  <div id="brand-story" className="tp-about-area pt-40 pb-60 p-relative z-index-1">
    <div className="container-fluid container-1524">
      {/* <div className="row">
        <div className="col-12">
          <div className="tp-about-ai-text-wrap mb-10 text-start">
            <h3 className="tp-about-ai-text tp-ff-jakarta fw-600 fs-40 fs-xl-60 fs-md-38 lh-120-per ls-m-4 tp-text-common-white tet-left">
              Brand Story
            </h3>
          </div>
        </div>
      </div> */}
      <div className="row align-items-center">

        <BrandStorySection isHomePage={true} />
      </div>
    </div>
  </div>
);

export default AboutSection;
