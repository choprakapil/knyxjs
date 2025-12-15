import { withBasePath } from "@/lib/asset";

const Offcanvas = () => (
  <>
    <div className="tp-offcanvas-area">
      <div className="tp-offcanvas offcanvas-black-bg">
        <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
          <div className="tp-offcanvas-logo">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <img data-width="150" src={withBasePath('/assets/img/logo/logo-white-2.png')} alt="logo" />
            </a>
          </div>
          <div className="tp-offcanvas-close-btn">
            <button className="close-btn">
              <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.19141 9.80762L27.5762 28.1924"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.19141 28.1924L27.5762 9.80761"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="tp-offcanvas-content d-none d-xl-block">
          <h3 className="tp-offcanvas-title">Hello There!</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
        </div>
        <div className="tp-offcanvas-menu d-xl-none">
          <nav></nav>
        </div>
        <div className="tp-offcanvas-gallery d-none d-xl-block">
          <div className="row gx-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="col-md-3 col-3">
                <div className="tp-offcanvas-gallery-img fix">
                  <a className="popup-image" href={withBasePath(`/assets/img/service/ai/thumb-2.jpg`)}>
                    <img src={withBasePath(`/assets/img/service/ai/thumb-2.jpg`)} alt="" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tp-offcanvas-contact">
          <h3 className="tp-offcanvas-title sm">Information</h3>
          <ul>
            <li>
              <a href="tel:1234567890">+1234567890</a>
            </li>
            <li>
              <a href="mailto:hello@KNYX.com">hello@KNYX.com</a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                
                 A16 Adarsh Nagar, New Delhi. Delhi, India 110088
              </a>
            </li>
          </ul>
        </div>
        <div className="tp-offcanvas-social">
          <h3 className="tp-offcanvas-title sm">Follow Us</h3>
          <div className="tp-footer-wd-social tp-footer-ai-social d-flex justify-content-lg-start mb-40">
              {["facebook", "twitter", "instagram", "linkedin"].map((network, index) => (
                <div key={network} className="tp_fade_anim" data-delay={`.${index * 2 + 3}`} data-fade-from="top" data-ease="bounce">
                  <a href="">
                    <i className={`fa-brands fa-${network}`}></i>
                  </a>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
    <div className="body-overlay"></div>
  </>
);

export default Offcanvas;
