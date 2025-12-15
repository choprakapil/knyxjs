import { withBasePath } from "@/lib/asset";

const testimonials = [
    {
        name: 'Rohit Malhotra',
        role: 'Professional Cricketer',
        avatar: withBasePath('/assets/img/testimonial/ai/avatar.png'),
        quote:
            '"Wearing KNYX helmets gives me full confidence on the pitch. The comfort, lightweight design, and superior protection make every game safer and more enjoyable."',
        metric: '100%',
        metricDescription: 'Player Safety & Comfort Rating'
    },
    {
        name: 'Arjun Rajput',
        role: 'Cricket Coach',
        avatar: withBasePath('/assets/img/testimonial/ai/avatar-2.png'),
        quote:
            '"I recommend KNYX helmets to all my academy players. Their sturdy build, perfect fit, and advanced safety features are unmatched in the market."',
        metric: '95%',
        metricDescription: 'Coach Recommendation Score'
    },
    {
        name: 'Sachin Verma',
        role: 'Sports Gear Distributor',
        avatar: withBasePath('/assets/img/testimonial/ai/avatar-3.png'),
        quote:
            '"KNYX helmets are a game-changer in cricket safety gear. Lightweight, durable, and engineered for maximum impact protection – our customers keep coming back for more."',
        metric: '98%',
        metricDescription: 'Dealer & Customer Satisfaction'
    }
];

const TestimonialSection = () => (
    <div className="tp-testimonial-area pt-155 tp-bg-common-black pb-120 p-relative z-index-1">
        <img className="tp-testimonial-ai-shape p-absolute" src={withBasePath('/assets/img/pricing/shape.png')} alt="" />
        <div className="container-fluid container-1524">
            <div className="row align-items-end mb-35">
                <div className="col-lg-7">
                    <div className="tp-testimonial-ai-title-wrap mb-40">
                        <span className="tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-common-white mb-10 d-inline-block tp_fade_anim" data-delay=".3">
                            / Our Testimonial /
                        </span>
                        <h2 className="tp-section-ai-title fs-72 fs-xl-65 fs-lg-55 fs-sm-45 fs-xs-40 fw-600 ls-m-4 tp-ff-jakarta tp-text-common-white tp_fade_anim" data-delay=".5">
                            Resonance is trusted by <span className="title-slide-gradient">1,1000+</span> Customers.
                        </h2>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="d-flex justify-content-lg-end tp_fade_anim" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                        <div className="tp-testimonial-it-ratings-wrap d-flex align-items-center mb-50">
                            <span className="mr-15">
                            <svg
  width="34"
  height="34"
  viewBox="-3 0 262 262"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
>
  <path
    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
    fill="#4285F4"
  />
  <path
    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
    fill="#34A853"
  />
  <path
    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
    fill="#FBBC05"
  />
  <path
    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
    fill="#EB4335"
  />
</svg>
                            </span>
                            <div className="tp-testimonial-it-wrapper">
                                <div className="tp-testimonial-it-icon d-flex align-items-center">
                                    <span className="tp-ff-inter fw-600 fs-16 lh-1 ls-m-4 text-uppercase tp-text-common-white mr-10">4.9/5</span>
                                    <div className="tp-testimonial-it-star lh-1">
                                        {[...Array(5)].map((_, index) => (
                                            <i key={index} className="fa-solid fa-star-sharp"></i>
                                        ))}
                                    </div>
                                </div>
                                <span className="tp-ff-inter fw-500 fs-13 ls-m-1 tp-text-common-white lh-1">
                                    Based on 24 reviews on Google
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 p-relative">
                    <div className="swiper tp-testimonial-ai-slide-active">
                        <div className="swiper-wrapper slide-transtion">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.name} className="swiper-slide tp-bg-common-black_">
                                    <img className="tp-faq-ai-noise" src={withBasePath('/assets/img/body/noise.png')} alt="" />
                                    <div className="row">
                                        <div className="col-xxl-5 col-xl-4">
                                            <div className="tp-testimonial-ai-avatar mb-30">
                                                <img className="rounded-circle mb-25" src={testimonial.avatar} alt={testimonial.name} />
                                                <h3 className="tp-ff-jakarta fw-600 fs-28 ls-m-3 tp-text-common-white mb-20">{testimonial.name}</h3>
                                                <span className="tp-testimonial-ai-profeson d-inline-block tp-round-36 tp-bg-common-white tp-ff-dm fw-500 fs-18 ls-m-2 tp-text-common-black">{testimonial.role}</span>
                                            </div>
                                        </div>
                                        <div className="col-xxl-7 col-xl-8">
                                            <div className="tp-testimonial-ai-content ml-35 mr-60">
                                                <div className="d-sm-flex">
                                                    <span className="mr-30">
                                                        <svg width="60" height="48" viewBox="0 0 60 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.3589 19.1764C13.0909 14.575 18.8427 9.65983 23.3395 9.55525C23.6532 9.55525 23.967 9.45068 24.1761 9.24152C24.3853 9.13694 24.5944 9.03237 24.699 8.71863C26.2677 5.79047 25.431 3.48977 22.8166 1.60738C19.7839 -0.588741 14.9733 1.60738 12.568 3.59435C6.50256 8.61406 0.332502 17.2938 0.646233 25.5556C-0.399539 31.0983 -0.190385 37.0591 1.37827 41.9742C2.42405 45.1115 5.45679 46.6802 8.5941 46.8893C11.7314 47.0987 18.2152 48.0397 21.0388 46.1575C23.8624 44.2749 24.0715 40.6147 24.3853 37.4776C24.699 34.0265 25.6402 27.5425 22.712 24.8235C19.7839 22.2091 11.4177 25.0327 12.3589 19.1764ZM46.8694 19.1764C47.6014 14.575 53.353 9.65983 57.85 9.55525C58.1637 9.55525 58.4774 9.45068 58.6866 9.24152C58.8959 9.13694 59.1049 9.03237 59.2097 8.71863C60.7783 5.79047 59.9417 3.48977 57.3273 1.60738C54.2945 -0.588741 49.484 1.60738 47.0785 3.59435C41.0131 8.61406 34.843 17.294 35.1567 25.5556C34.111 31.0983 34.3201 37.0591 35.8886 41.9742C36.9344 45.1115 39.9671 46.6802 43.1046 46.8893C46.2419 47.0987 52.7257 48.0397 55.5493 46.1575C58.3727 44.2749 58.582 40.6147 58.8958 37.4776C59.2095 34.0265 60.1507 27.5425 57.2225 24.8235C54.2944 22.2091 45.8236 25.0327 46.8694 19.1764Z"
                                                                fill="#fff"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <div>
                                                        <p className="pt-20 tp-ff-dm fw-400 fs-32 fs-sm-25 fs-xs-20 ls-m-4 lh-150-per tp-text-grey-2">{testimonial.quote}</p>
                                                        <div className="tp-testimonial-ai-expreance d-flex justify-content-between">
                                                            <div className="d-sm-flex align-items-end mb-30 mr-30">
                                                                <h2 className="tp-ff-jakarta fw-600 fs-52 ls-m-6 tp-text-common-white mb-0 mr-10">{testimonial.metric}</h2>
                                                                <span className="tp-ff-jakarta fw-500 fs-18 ls-m-4 tp-text-grey-2 mb-5">{testimonial.metricDescription}</span>
                                                            </div>
                                                            <span className="mb-30">
                                                                <svg width="60" height="47" viewBox="0 0 60 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M47.6411 27.9464C46.9091 32.5172 41.1573 37.3997 36.6605 37.5036C36.3468 37.5036 36.033 37.6075 35.8239 37.8153C35.6147 37.9191 35.4056 38.023 35.301 38.3347C33.7323 41.2434 34.569 43.5288 37.1834 45.3987C40.2161 47.5802 45.0267 45.3987 47.432 43.4249C53.4974 38.4386 59.6675 29.8165 59.3538 21.6096C60.3995 16.1036 60.1904 10.1825 58.6217 5.3C57.576 2.18351 54.5432 0.625275 51.4059 0.417507C48.2686 0.209576 41.7848 -0.725197 38.9612 1.14452C36.1376 3.01458 35.9285 6.65047 35.6147 9.76678C35.301 13.1949 34.3598 19.6358 37.288 22.3367C40.2161 24.9338 48.5823 22.129 47.6411 27.9464ZM13.1306 27.9464C12.3986 32.5172 6.64701 37.3997 2.15002 37.5036C1.83628 37.5036 1.52255 37.6075 1.3134 37.8153C1.10408 37.9191 0.895092 38.023 0.79034 38.3347C-0.778316 41.2434 0.0583 43.5288 2.67273 45.3987C5.70547 47.5802 10.516 45.3987 12.9215 43.4249C18.9869 38.4386 25.157 29.8163 24.8433 21.6096C25.889 16.1036 25.6799 10.1825 24.1114 5.3C23.0656 2.18351 20.0329 0.625275 16.8954 0.417507C13.7581 0.209576 7.2743 -0.725197 4.45071 1.14452C1.6273 3.01458 1.41798 6.65047 1.10424 9.76678C0.790512 13.1949 -0.150684 19.6358 2.77748 22.3367C5.70564 24.9338 14.1764 22.129 13.1306 27.9464Z"
                                                                        fill="#fff"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tp-testimonial-ai-navigation">
                        <span className="tp-testimonial-ai-prev">
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.8256 0C8.93142 2.40259 4.2627 4.67135 0.499998 6.00067C4.26271 7.3291 8.93142 9.59697 11.8251 12L9.80773 6.68951L20.7772 6.68989C20.969 6.68966 21.1528 6.61695 21.2882 6.48775C21.3894 6.39142 21.4582 6.26869 21.4861 6.13509C21.514 6.00149 21.4997 5.86301 21.4449 5.73717C21.3902 5.61133 21.2975 5.50377 21.1785 5.42808C21.0596 5.3524 20.9198 5.31199 20.7767 5.31197L9.80767 5.31197L11.8256 0Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <span className="tp-testimonial-ai-next">
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1744 0C13.0686 2.40259 17.7373 4.67135 21.5 6.00067C17.7373 7.3291 13.0686 9.59697 10.1749 12L12.1923 6.68951L1.22276 6.68989C1.03103 6.68966 0.847236 6.61695 0.711766 6.48775C0.610637 6.39142 0.541774 6.26869 0.513884 6.13509C0.485993 6.00149 0.500324 5.86301 0.555071 5.73717C0.609818 5.61133 0.70252 5.50377 0.821456 5.42808C0.940392 5.3524 1.08023 5.31199 1.22327 5.31197L12.1923 5.31197L10.1744 0Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default TestimonialSection;
