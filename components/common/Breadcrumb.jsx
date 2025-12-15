const Breadcrumb = ({ title, eyebrow = "Explore", description }) => (
  <section className="tp-breadcrumb-area tp-bg-common-black p-relative z-index-1" data-background="/assets/img/breadcrumb/thumb.jpg">
    <div className="container">
      <div className="tp-breadcrumb-content text-center">
        <span className="tp-ff-inter fw-500 fs-16 ls-m-4 tp-text-grey-5 d-inline-block mb-15 text-uppercase">{eyebrow}</span>
        <h1 className="tp-ff-jakarta fw-700 fs-56 fs-sm-42 fs-xs-32 tp-text-grey-5 mb-15">{title}</h1>
        {description && <p className="tp-ff-dm fs-18 tp-text-grey-5 opacity-80">{description}</p>}
      </div>
    </div>
  </section>
);

export default Breadcrumb;
