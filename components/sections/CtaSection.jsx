import { withBasePath } from "@/lib/asset";

const CtaSection = () => (
  <div className="tp-cta-area tp-bg-common-black-5 section-m-spacing p-relative z-index-1">
    <img className="tp-faq-ai-noise" src={withBasePath('/assets/img/body/noise.png')} alt="" />
    <div className="container-fluid container-1824">
      <div className="tp-cta-ai-bg bg-position tp-image-distortion z-index-1" data-background={withBasePath('/assets/img/cta/ai/bg.jpg')}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="tp-cta-ai-wrap text-center">
              <h2 className="tp-ff-inter fw-600 fs-62 fs-md-50 fs-sm-40 fs-xs-30 ls-m-4 lh-120-per tp-text-grey-5 mb-65 tp_fade_anim" data-delay=".3">
                Play Safe, Play Bold <br /> with KNYX Helmets
              </h2>
              <div className="tp_fade_anim" data-delay=".5" data-fade-from="bottom" data-ease="bounce">
                <a href="javascript:void(0)" className="tp-btn-ai-xxl tp-bg-common-angry tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm">
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="btn-text">Get Your Helmet Now</span>
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
        </div>
      </div>
    </div>
  </div>
);

export default CtaSection;
