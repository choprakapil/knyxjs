const Footer = () => (
  <footer>
    <div className="tp-footer-area pt-155 bg-position" data-background="/assets/img/footer/ai/bg-black.jpg">
      <div className="container-fluid container-1524">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="tp-footer-ai-widget mb-40 tp_fade_anim" data-delay=".3">
              <h5 className="tp-ff-jakarta fw-600 fs-18 lh-140-per ls-m-2 text-uppercase tp-text-common-white mb-15">Location</h5>
              <a
                href=""
                className="tp-ff-dm fs-18 lh-140-per ls-m-2 tp-text-common-white hover-text-white opacity-8 underline-black"
              >
                A16 Adarsh Nagar, New Delhi. Delhi,
                <br />
                India 110088
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="tp-footer-ai-widget widget-2 mb-40 tp_fade_anim" data-delay=".5">
              <h5 className="tp-ff-jakarta fw-600 fs-18 lh-140-per ls-m-2 text-uppercase tp-text-common-white mb-15">Contact</h5>
              <div className="mb-10">
                <a href="tel:+1234567890" className="tp-ff-dm fs-18 lh-140-per ls-m-2 tp-text-common-white hover-text-white opacity-8 underline-black">
                  +1 (234) 567 890
                </a>
              </div>
              <div>
                <a href="mailto:info@knyx.com" className="tp-ff-dm fs-18 lh-140-per ls-m-2 tp-text-common-white hover-text-white opacity-8 underline-black">
                  info@knyx.com
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="tp-footer-ai-menu d-flex justify-content-lg-end mb-40 tp_fade_anim" data-delay=".7">
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Services</a>
                </li>
                <li>
                  <a href="">Portfolio</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="tp-footer-wd-social tp-footer-ai-social d-flex justify-content-lg-end mb-40">
              {["facebook", "twitter", "instagram", "linkedin"].map((network, index) => (
                <div key={network} className="tp_fade_anim" data-delay={`.${index * 2 + 3}`} data-fade-from="top" data-ease="bounce">
                  <a href="">
                    <i className={`fa-brands fa-${network}`}></i>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="tp-footer-ai-title-wrap text-center pt-35 pb-80 tp_fade_anim" data-fade-from="top" data-delay=".7" data-ease="bounce">
              <h2 className="tp-footer-ai-bigtitle tp-ff-jakarta fw-800 text-uppercase tp-text-common-white">
                <a href="" className="text-scale-anim">
                  KNYX
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-footer-ai-copyright-border">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-footer-ai-copyright text-center">
                <p className="tp-ff-dm fw-500 tp-text-common-white">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.875 7C0.875 8.62445 1.52031 10.1824 2.66897 11.331C3.81763 12.4797 5.37555 13.125 7 13.125C8.62445 13.125 10.1824 12.4797 11.331 11.331C12.4797 10.1824 13.125 8.62445 13.125 7C13.125 5.37555 12.4797 3.81763 11.331 2.66897C10.1824 1.52031 8.62445 0.875 7 0.875C5.37555 0.875 3.81763 1.52031 2.66897 2.66897C1.52031 3.81763 0.875 5.37555 0.875 7ZM14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14C5.14348 14 3.36301 13.2625 2.05025 11.9497C0.737498 10.637 0 8.85652 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7ZM7.12775 4.368C6.06725 4.368 5.44162 5.173 5.44162 6.55725V7.48475C5.44162 8.85938 6.05675 9.639 7.12775 9.639C7.98438 9.639 8.56363 9.12625 8.64062 8.39825H9.77375V8.47962C9.68625 9.74662 8.589 10.6383 7.1225 10.6383C5.29288 10.6383 4.26213 9.46925 4.26213 7.48563V6.54675C4.26213 4.56838 5.313 3.3635 7.12337 3.3635C8.59425 3.3635 9.6915 4.28575 9.77375 5.614V5.691H8.64062C8.56363 4.92188 7.96863 4.368 7.12775 4.368Z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                  Copyright 2025 <a href="" className="tp-text-theme-secondary">KNYX</a>. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
