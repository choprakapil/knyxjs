import { withBasePath } from "@/lib/asset";

const AboutSection = () => (
  <div className="tp-about-area pt-150 pb-130 p-relative z-index-1">
    <div className="container-fluid container-1524">
      <div className="row">
        <div className="col-12">
          <div className="tp-about-ai-text-wrap mb-80 text-center">
            <h3 className="tp-about-ai-text tp-ff-jakarta fw-600 fs-72 fs-xl-60 fs-md-38 lh-120-per ls-m-4 tp-text-common-white">
              We design and ship high‑performance experiences <span className="has-scale-image hide-ball" data-img="/assets/img/about/ai/shape.png" data-bgcolor="#111112"></span> that help teams stay ahead of{' '}
              <span className="has-scale-image hide-ball" data-img="/assets/img/about/ai/shape-2.png" data-bgcolor="#111112"></span> the curve with resilient, scalable systems and{' '}
              <span className="has-scale-image hide-ball" data-img="/assets/img/about/ai/shape-3.png" data-bgcolor="#111112"></span> thoughtful craft — from research to production.
            </h3>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-5">
          <div className="tp-about-ai-subtitle mb-30 text-lg-center tp_fade_anim" data-delay=".3">
            <span className="tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-common-white">/ Our About /</span>
            <div className="about_bgcontainer">
              <video autoPlay loop muted playsInline className="about_video">
                <source src={withBasePath("/assets/video/about.mp4")} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="tp-about-ai-content mb-30">
            <h2 className="tp-about-ai-title fw-600 tp-ff-jakarta ls-m-4 d-flex align-items-start mb-35 tp_fade_anim" data-delay=".3">
              <span className="title-slide-gradient">KNYX</span>
              <span className="aleric-ai tp-text-common-white fs-22 ls-0 mt-35">Gear</span>
            </h2>
            <div className="tp_fade_anim" data-delay=".5">
              <p className="tp-about-ai-para tp-ff-dm mb-55 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                From concept to performance, we combine advanced protection systems with ergonomic engineering to craft cricket helmets that shield, stabilize, and endure — giving players the confidence to react faster,
                focus better, and play their natural game. Whether it’s fast bowling, long innings.
              </p>
            </div>
            <div className="tp_fade_anim" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
              <a href="javascript:void(0)" className="tp-btn-ai tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm">
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
    </div>
  </div>
);

export default AboutSection;
