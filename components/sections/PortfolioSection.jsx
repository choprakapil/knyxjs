import { withBasePath } from "@/lib/asset";

const items = [
  { src: "/assets/img/portfolio/ai/thumb.jpg", title: "Match Ready" },
  { src: "/assets/img/portfolio/ai/thumb-2.jpg", title: "Training Day" },
  { src: "/assets/img/portfolio/ai/thumb-3.jpg", title: "On the Pitch" },
  { src: "/assets/img/portfolio/ai/thumb-4.jpg", title: "Pro Gear" },
];

const PortfolioSection = () => (
  <section className="tp-portfolio-area pt-155 pb-120 tp-bg-common-black p-relative z-index-1">
    <div className="container-fluid container-1524">
      <div className="row align-items-end mb-40">
        <div className="col-lg-8">
          <div className="mb-30">
            <span className="tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-common-white mb-10 d-inline-block">/ Gallery /</span>
            <h2 className="tp-section-ai-title fs-72 fs-xl-65 fs-lg-55 fs-sm-45 fs-xs-40 fw-600 ls-m-4 tp-ff-jakarta tp-text-common-white">
              Helmets in Action
            </h2>
          </div>
        </div>
      </div>
      <div className="row gx-30">
        {items.map((item) => (
          <div key={item.title} className="col-xl-3 col-lg-3 col-md-6 mb-30">
            <div className="tp-portfolio-card tp-bg-common-black tp-border">
              <div className="tp-portfolio-thumb fix">
                <img src={withBasePath(item.src)} alt={item.title} />
              </div>
              <div className="tp-portfolio-content mt-15">
                <h3 className="tp-ff-jakarta fw-600 fs-22 ls-m-3 tp-text-common-white">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
