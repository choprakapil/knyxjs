const primarySlides = Array(3).fill(
  'Premium Cricket Helmets Built for Protection - Engineered for Power & Peak Performance'
);

const secondarySlides = [
  'Advanced Impact-Resistant Shell Technology -',
  'Secure, Comfortable & Ultra-Stable Fit - Protection Meets Precision Engineering',
  'Advanced Impact-Resistant Shell Technology -',
  'Secure, Comfortable & Ultra-Stable Fit - Protection Meets Precision Engineering'
];

const TextSliderSection = () => (
  <div className="tp-text-ai-slider-wrap pb-50">
    <div className="tp-text-ai-slider-single tp-bg-common-angry">
      <div className="swiper-container tp-text-ai-slider-active">
        <div className="swiper-wrapper slide-transtion">
          {primarySlides.map((text, index) => (
            <div key={`primary-${index}`} className="swiper-slide">
              <div className="tp-text-ai-slider-content text-center tp-bg-common-angry">
                <p className="mb-0 tp-ff-jakarta fw-500 fs-52 fs-md-40 ls-m-4 tp-text-common-white">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="tp-text-ai-slider-single tp-text-ai-slider-single-2 tp-bg-grey-8" dir="rtl">
      <div className="swiper-container tp-text-ai-slider-active">
        <div className="swiper-wrapper slide-transtion">
          {secondarySlides.map((text, index) => (
            <div key={`secondary-${index}`} className="swiper-slide">
              <div className="tp-text-ai-slider-content text-center tp-bg-grey-8">
                <p className="mb-0 tp-ff-jakarta fw-500 fs-52 fs-md-40 ls-m-4 tp-text-grey-5">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TextSliderSection;
