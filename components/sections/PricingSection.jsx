import { withBasePath } from "@/lib/asset";

const plans = [
  {
    name: "Junior",
    price: "₹2,499",
    period: "per helmet",
    features: [
      "ABS shell protection",
      "Standard grille safety",
      "Comfort foam lining",
      "Ventilation channels",
    ],
    cta: "Buy Junior",
  },
  {
    name: "Pro",
    price: "₹4,999",
    period: "per helmet",
    features: [
      "Polycarbonate shell",
      "Reinforced grille system",
      "Moisture-wick padding",
      "Optimized airflow",
    ],
    cta: "Buy Pro",
    popular: true,
  },
  {
    name: "Elite",
    price: "₹7,499",
    period: "per helmet",
    features: [
      "Composite shell",
      "Advanced impact dispersion",
      "Memory foam comfort",
      "MaxVision face guard",
    ],
    cta: "Buy Elite",
  },
];

const PricingSection = () => (
  <section className="tp-pricing-area pt-155 pb-120 tp-bg-common-black p-relative z-index-1">
    <img className="p-absolute" src={withBasePath("/assets/img/body/noise.png")} alt="" />
    <div className="container-fluid container-1524">
      <div className="row align-items-end mb-30">
        <div className="col-lg-8">
          <div className="mb-30">
            <span className="tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-common-white mb-10 d-inline-block">/ Pricing /</span>
            <h2 className="tp-section-ai-title fs-72 fs-xl-65 fs-lg-55 fs-sm-45 fs-xs-40 fw-600 ls-m-4 tp-ff-jakarta tp-text-common-white">
              Choose Your KNYX Helmet
            </h2>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="text-lg-end mb-60">
            <a href="#" className="tp-btn-ai tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm">
              <span className="d-flex align-items-center justify-content-center">
                <span className="btn-text">View Catalogue</span>
                <span className="btn-icon">
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z" fill="currentColor" />
                  </svg>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="row gx-30">
        {plans.map((plan) => (
          <div key={plan.name} className="col-xl-4 col-lg-4 col-md-6 mb-30">
            <div className={`tp-pricing-card tp-bg-common-black ${plan.popular ? "tp-border-gradient" : "tp-border"}`}>
              <div className="tp-pricing-header mb-20 d-flex align-items-center justify-content-between">
                <h3 className="tp-ff-jakarta fw-600 fs-28 ls-m-3 tp-text-common-white">{plan.name}</h3>
                {plan.popular && (
                  <span className="tp-ff-inter fw-600 fs-12 lh-1 tp-text-common-black tp-bg-common-white tp-round-24 px-15 py-8">Popular</span>
                )}
              </div>
              <div className="tp-pricing-price mb-25">
                <span className="tp-ff-jakarta fw-700 fs-42 ls-m-4 tp-text-common-white">{plan.price}</span>
                <span className="tp-ff-dm fw-500 fs-14 ls-m-2 tp-text-grey-2 ml-10">{plan.period}</span>
              </div>
              <ul className="tp-ff-dm fs-18 tp-text-grey-2 mb-30">
                {plan.features.map((f) => (
                  <li key={f} className="mb-10 d-flex align-items-center">
                    <i className="fa-solid fa-check mr-10"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="tp-btn-ai tp-btn-switch-2-animation p-relative d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm">
                <span className="d-flex align-items-center justify-content-center">
                  <span className="btn-text">{plan.cta}</span>
                  <span className="btn-icon">
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
