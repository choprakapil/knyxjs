import { withBasePath } from "@/lib/asset";

const desktopMenuHtml = `
<ul>
  <li><a href="/homepage">Home</a></li>
  <li><a href="/homepage">About Us</a></li>
  <li class="has-dropdown p-inherit">
    <a href="/homepage">
      Products
      <span>
        <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.7 4.93333L0.2 1.6C-0.294427 0.940764 0.175955 0 1 0H6C6.82405 0 7.29443 0.940764 6.8 1.6L4.3 4.93333C3.9 5.46667 3.1 5.46667 2.7 4.93333Z" fill="currentColor" />
        </svg>
      </span>
    </a>
    <ul class="tp-submenu submenu">
      <li><a href="/homepage">Product One</a></li>
     <li><a href="/homepage">Product Two</a></li>
     <li><a href="/homepage">Product Three</a></li>
      
    </ul>
  </li>
</ul>
`;

const Header = () => (
  <header>
    <div id="header-sticky" className="tp-header-area pre-_header sticky-black-bg tp-header-ai-wrap header-transparent">
      <div className="container-fluid container-1824">
        <div className="tp-header-ai-bg">
          <div className="row align-items-center">
            <div className="col-xxl-3 col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6">
              <div className="tp-header-logo">
                <a href="/homepage">
                  <img width="150" src={withBasePath('/assets/img/logo/logo-white-2.png')} alt="logo" />
                </a>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-7 d-none d-xl-block">
              <div className="tp-main-menu tp-main-menu-ai tp-header-dropdown dropdown-black-bg d-flex justify-content-center">
                <nav className="tp-mobile-menu-active" dangerouslySetInnerHTML={{ __html: desktopMenuHtml }} />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-8 col-md-8 col-sm-8 col-6">
              <div className="tp-header-right d-flex align-items-center justify-content-end">
                <div className="tp-header-btn d-none d-sm-inline-block">
                  <a
                    href="/homepage"
                    className="tp-btn-ai p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm"
                  >
                    Contact Us
                  </a>
                </div>
                <button className="tp-menu-bar tp-header-sidebar-btn tp-header-2-menu-btn tp-header-ai-menu-btn ml-20">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
