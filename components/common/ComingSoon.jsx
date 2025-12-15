const ComingSoon = ({ message = "This page is being prepared. Check back soon." }) => (
  <section className="tp-placeholder-area pt-120 pb-120">
    <div className="container">
      <div className="tp-placeholder-card text-center">
        <p className="tp-ff-dm fs-20 tp-text-grey-5 mb-10">Coming soon</p>
        <h3 className="tp-ff-jakarta fw-600 fs-32 tp-text-grey-5">{message}</h3>
      </div>
    </div>
  </section>
);

export default ComingSoon;
