import { withBasePath } from "@/lib/asset";

const BannerSection = () => (
  <div className="tp-banner-ai-thumb section-triger">
    <div className="box h-100">
      <img data-speed=".8" className="img-cover myimg" src={withBasePath("/assets/img/banner/ai/thumb.jpg")} alt="" />
      <div className="uncover">
        <div className="uncover_slice"></div>
        <div className="uncover_slice"></div>
        <div className="uncover_slice"></div>
      </div>
    </div>
  </div>
);

export default BannerSection;
