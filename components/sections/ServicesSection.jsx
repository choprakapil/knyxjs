import { withBasePath } from "@/lib/asset";

const products = [
  { id: '001', title: 'Insight Engine' },
  { id: '002', title: 'Vision Suite' },
  { id: '003', title: 'Automation Cloud' },
  { id: '004', title: 'Data Hub' }
];

const ServicesSection = () => (
  <div className="tp-service-area pt-150 pb-170 p-relative z-index-1">
    <img className="tp-service-ai-ring p-absolute" src={withBasePath('/assets/img/about/ai/ball.png')} alt="ball" />
    <div className="container-fluid container-1524">
      <div className="row align-items-end">
        <div className="col-lg-8">
          <div className="tp-service-ai-title-wrap mb-30">
            <span className="text-anim tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-common-white mb-10 d-inline-block">/ Our Products /</span>
            <h2 className="text-anim tp-section-ai-title fs-72 fs-xl-65 fs-lg-55 fs-sm-45 fs-xs-40 fw-600 tp-ff-jakarta tp-text-common-white">
              Modules Built for Outcomes & Scale
            </h2>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-service-ai-btn mb-80 text-lg-end tp_fade_anim" data-delay=".4" data-fade-from="bottom" data-ease="bounce">
            <a href="#" className="tp-btn-ai tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm">
              <span className="d-flex align-items-center justify-content-center">
                <span className="btn-text">Explore More</span>
                <span className="btn-icon">
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="btn-icon">
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="tp-service-ai-content pt-50">
            {products.map((product) => (
              <div key={product.id} className="tp-service-ai-item-main mb-35">
                <div className="tp-service-ai-item d-inline-block">
                  <div className="d-flex align-items-center">
                    <span className="tp-service-ai-count tp-ff-jakarta fw-600 fs-24 fs-sm-18 ls-m-4 mr-30">{product.id}</span>
                    <h2 className="tp-service-ai-title tp-ff-jakarta fs-72 fs-xl-60 fs-lg-50 fs-sm-35 fs-xs-25 ls-m-4">
                      <a href="#">{product.title}</a>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

    <div className="tp-service-ai-box-wrp pt-70">
      <div className="container-fluid container-1824">
        <div className="row gx-60">
          {[
            { thumb: '/assets/img/service/ai/thumb.jpg', label: 'Engineered for performance' },
            { thumb: '/assets/img/service/ai/thumb-2.jpg', label: 'Optimized delivery pipelines' },
            { thumb: '/assets/img/service/ai/thumb-3.jpg', label: 'Enhanced reliability & safety' },
            { thumb: '/assets/img/service/ai/thumb-4.jpg', label: 'Built for long‑term scale' }
          ].map((card, index) => (
            <div
              key={card.label}
              className="col-lg-3 col-md-6 col-sm-6 tp_fade_anim"
              data-delay={`.${index * 2 + 3}`}
              data-duration="2"
              data-fade-from="bottom"
              data-ease="bounce"
            >
              <div className="tp-service-ai-box mb-40">
                <div className="tp-service-ai-main">
                  <div className="tp-service-ai-wrap fix p-relative">
                    <div className="tp-service-ai-thumb">
                      <img src={withBasePath(card.thumb)} alt={card.label} />
                    </div>
                    <div className="tp-service-ai-content-2">
                      <a href="#" className="tp-ff-jakarta fw-700 fs-28 hover-text-white tp-text-grey-5 underline-black">
                        {card.label}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
);

export default ServicesSection;
