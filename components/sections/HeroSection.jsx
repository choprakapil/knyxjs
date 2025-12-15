import { withBasePath } from "@/lib/asset";

const HeroSection = () => (
  <div className="tp-hero-area pre-_header tp-hero-ai-spacing bg-position p-relative z-index-1" data-background="/assets/img/hero/ai/bg-black.jpg">

    <video autoPlay loop muted playsInline className="bg_video"><source src={withBasePath("/assets/video/hero.mp4")} type="video/mp4" /></video>
    <img className="tp-hero-ai-shape" src={withBasePath("/assets/img/hero/ai/shape.png")} alt="" />
    <div className="container-fluid container-1824 containers">
      <div className="row align-items-end">
        <div className="col-xl-6 order-2 order-xl-1 opacity0">
          <div className="row ali</div>gn-items-end">
            <div className="col-lg-7 col-md-7">
              <div className="tp-hero-ai-thumb tp-round-32 tp--hover-item fix p-relative mb-30 mr-60">
                <div
                  className="tp--hover-img"
                  data-displacement="/assets/img/hero/ai/thumb.jpg"
                  data-intensity="0.6"
                  data-speedin="1"
                  data-speedout="1"
                >
                  <img className="tp-round-32 w-100" src={withBasePath("/assets/img/hero/ai/thumb.jpg")} alt="" />
                </div>
                <h4 className="tp-hero-ai-thumb-text tp-ff-jakarta ls-m-2 tp-text-common-white lh-1">
                  KNYX
                </h4>
              </div>
            </div>

            <div className="col-lg-5 col-md-5">
              <div className="tp-hero-ai-dec tp-bg-grey-8 tp-round-32 mb-30">
                <h3 className="tp-hero-ai-dec-title ls-m-3 tp-ff-playfair fw-400 ls-m-4 tp-text-common-white mb-25">
                  Helmets
                </h3>

                <p className="opacity-8 mb-50 tp-ff-dm fw-500 lh-140-per fs-22 ls-m-2 tp-text-common-white">
                  Premium cricket helmets built with strength and comfort to protect players across every level of the game.
                </p>

                <a
                  href="#products"
                  className="tp-btn-cst tp-btn-switch-2-animation d-inline-block text-uppercase tp-text-common-black hover-text-black tp-round-36 lh-1 fs-16 fw-700 tp-ff-dm tp-bg-common-white"
                >
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="btn-text">Get started</span>
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
        <div className="col-xl-6 order-1 order-xl-2 opacity0">
          <div className="tp-hero-ai-right-content mb-100 text-end">
            <h3 className="tp-hero-ai-title mb-75 tp-ff-jakarta fw-600 ls-m-4 text-capitalize tp-text-common-white">
              Protect Your
              <br />
              <span className="title-slide-gradient">
                <img className="mr-20 tp-live-anim-spin hero-shape" src={withBasePath("/assets/img/hero/ai/shape-2.png")} alt="" />
                Game with
              </span>
              <br />
              KNYX Excellence
              <span className="d-flex align-items-center justify-content-end">
                <img className="rounded-circle mr-15 authors" src={withBasePath("/assets/img/hero/ai/author.png")} alt="" />
                Perform
              </span>
            </h3>
            <p className="opacity-8 tp-ff-dm fw-400 fs-24 fs-xs-17 ls-m-2 tp-text-common-white lh-140-per">
              Built for champions—KNYX helmets deliver unmatched safety, comfort, and clarity on every ball.
            </p>
          </div>
        </div>
        <div className="col-12 order-3">
          <div className="tp-brand-wrap tp-hero-ai-brand pt-75">
            <div className="swiper tp-brand-slide-active">
              <div className="swiper-wrapper slide-transtion">
                {['logo.png', 'logo-3.png', 'logo.png', 'logo-3.png', 'logo.png', 'logo-3.png', 'logo.png', 'logo-3.png', 'logo.png'].map((logo, index) => (
                  <div key={`${logo}-${index}`} className="swiper-slide">
                    <div className="tp-brand-item">
                      <a href="javascript:void(0)">
                        <img src={withBasePath(`/assets/img/brands/${logo}`)} alt="" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
