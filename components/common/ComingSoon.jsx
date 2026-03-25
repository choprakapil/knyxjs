import { siteData } from "@/lib/data/site";

const ComingSoon = ({ message = siteData.ui.comingSoonSubText }) => (
  <section className="tp-placeholder-area pt-120 pb-120">
    <div className="container">
      <div className="tp-placeholder-card text-center">
        <p className="tp-ff-dm fs-20 tp-text-grey-5 mb-10">{siteData.ui.comingSoonMsg}</p>
        <h3 className="tp-ff-jakarta fw-600 fs-32 tp-text-grey-5">{message}</h3>
      </div>
    </div>
  </section>
);

export default ComingSoon;
