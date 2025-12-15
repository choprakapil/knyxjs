import { withBasePath } from "@/lib/asset";

const blogCards = [
  {
    image: withBasePath('/assets/img/blog/ai/thumb.jpg'),
    date: '05 July 2026',
    title: 'KNYX Helmets: Ensuring Safety on the Cricket Field',
    href: ''
  },
  {
    image: withBasePath('/assets/img/blog/ai/thumb-2.jpg'),
    date: '05 July 2026',
    title: 'Top Features Every Cricket Helmet Must Have',
    href: ''
  },
  {
    image: withBasePath('/assets/img/blog/ai/thumb-3.jpg'),
    date: '05 July 2026',
    title: 'How KNYX Helmets Protect Against High-Speed Balls',
    href: ''
  }
];

const BlogSection = () => (
  <div className="tp-blog-area pt-155 tp-bg-common-black-5 section-m-spacing p-relative z-index-1 pb-130">
    <img className="tp-faq-ai-noise" src={withBasePath('/assets/img/body/noise.png')} alt="" />
    <div className="container-fluid container-1524">
      <div className="row align-items-end mb-40">
        <div className="col-lg-8">
          <div className="tp-testimonial-ai-title-wrap mb-30">
            <span className="text-anim tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-grey-5 mb-10 d-inline-block">/ Our Blog /</span>
            <h2 className="text-anim tp-section-ai-title fs-72 fs-xl-65 fs-lg-55 fs-sm-45 fs-xs-40 fw-600 ls-m-4 tp-ff-jakarta tp-text-grey-5">
              Latest Insights on Cricket Safety and Helmet Technology.
            </h2>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-service-ai-btn mb-40 text-lg-end tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
            <a href="" className="tp-btn-ai tp-btn-ai-black tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm">
              <span className="d-flex align-items-center justify-content-center">
                <span className="btn-text">See All Blog</span>
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
        {blogCards.map((card, index) => (
          <div key={card.title} className="col-xl-4 col-lg-6 col-md-6">
            <div className="tp-blog-ai-item tp-round-24 mb-30 tp_fade_anim" data-delay=".4" data-fade-from={index === 0 ? 'left' : index === 1 ? 'bottom' : 'right'} data-ease="bounce">
              <a href={card.href} className="tp-round-24 w-100 tp--hover-item fix p-relative d-inline-block">
                <div className="tp-blog-ai-thumb w-100 tp--hover-img tp-round-24" data-displacement={card.image} data-intensity="0.6" data-speedin="1" data-speedout="1">
                  <img className="tp-round-24 w-100" src={card.image} alt={card.title} />
                </div>
              </a>
              <div className="tp-blog-ai-content">
                <span className="tp-blog-ai-dates tp-round-32 tp-ff-dm mb-15 fw-500 fs-16 tp-text-grey-5 d-inline-block">
                  <svg className="mr-5" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 12.0683C0.000926244 12.8416 0.308512 13.5829 0.855289 14.1297C1.40207 14.6765 2.14339 14.984 2.91665 14.985H11.0833C11.8565 14.984 12.5978 14.6765 13.1446 14.1297C13.6914 13.5829 13.999 12.8416 13.9999 12.0683V6.81836H0V12.0683Z"
                      fill="currentColor"
                    />
                    <path
                      d="M11.0833 2.15201H10.4999V1.56868C10.4999 1.41397 10.4385 1.2656 10.3291 1.1562C10.2197 1.04681 10.0713 0.985352 9.9166 0.985352C9.76189 0.985352 9.61352 1.04681 9.50412 1.1562C9.39473 1.2656 9.33327 1.41397 9.33327 1.56868V2.15201H4.66663V1.56868C4.66663 1.41397 4.60518 1.2656 4.49578 1.1562C4.38639 1.04681 4.23801 0.985352 4.0833 0.985352C3.9286 0.985352 3.78022 1.04681 3.67083 1.1562C3.56143 1.2656 3.49998 1.41397 3.49998 1.56868V2.15201H2.91665C2.14339 2.15294 1.40207 2.46052 0.855289 3.0073C0.308512 3.55408 0.000926244 4.2954 0 5.06866L0 5.65199H13.9999V5.06866C13.999 4.2954 13.6914 3.55408 13.1446 3.0073C12.5978 2.46052 11.8565 2.15294 11.0833 2.15201Z"
                      fill="currentColor"
                    />
                  </svg>
                  {card.date}
                </span>
                <h4 className="tp-blog-ai-title tp-ff-jakarta fs-24 fs-md-22 lh-140-per ls-m-4 tp-text-grey-5">
                  <a href={card.href} className="underline-white">
                    {card.title}
                  </a>
                </h4>
              </div>
              <div className="tp-blog-ai-btn d-flex justify-content-between">
                <a href={card.href} className="tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm">
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="btn-text">Read More</span>
                  </span>
                </a>
                <span className="tp-blog-ai-views text-uppercase tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm">
                  <svg className="mr-5" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 4.5C5.25 4.5 2.125 7.5 1 9C2.125 10.5 5.25 13.5 9 13.5C12.75 13.5 15.875 10.5 17 9C15.875 7.5 12.75 4.5 9 4.5ZM9 12C6.79 12 5 10.21 5 9C5 7.79 6.79 6 9 6C11.21 6 13 7.79 13 9C13 10.21 11.21 12 9 12ZM9 7.5C8.17 7.5 7.5 8.17 7.5 9C7.5 9.83 8.17 10.5 9 10.5C9.83 10.5 10.5 9.83 10.5 9C10.5 8.17 9.83 7.5 9 7.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  123 Views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BlogSection;
