import { withBasePath } from "@/lib/asset";

const BrandStorySection = ({ isHomePage = false }) => (
    <div className={`tp-about-area ${isHomePage ? 'pt-10' : 'pt-150'} ${isHomePage ? 'pb-0' : 'pb-130'} p-relative z-index-1`}>
        <div className="container-fluid container-1524">

            {/* ── Intro block: 80% centred ── */}
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="brand-story-wrapper">
                        <div className="tp-about-ai-content mb-30 text-start">
                            <div className="tp-about-ai-text-wrap mb-10 text-start"><h3 className="tp-about-ai-text tp-ff-jakarta fw-600 fs-40 fs-xl-60 fs-md-38 lh-120-per ls-m-4 tp-text-common-white tet-left title-slide-gradient">Brand Story</h3></div>
                            <h2 className="tp-about-ai-title fw-600 tp-ff-jakarta ls-m-4 d-flex align-items-center justify-content-start mb-35 tp_fade_anim" data-delay=".3">
                                <span className="tp-text-common-white">KNYX</span>
                                {/* <span className="aleric-ai tp-text-common-white fs-22 ls-0 mt-35">Engineered Excellence</span> */}
                            </h2>
                            <div className="tp_fade_anim" data-delay=".5">
                                <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                    At KNYX, protection is a craft, and performance is a promise.
                                    Born from the spirit of knight, KNYX reflects strength, precision, and timeless honour.
                                    We represent the modern athlete — focused, fearless, and equipped.
                                    KNYX was created with a singular vision: to build elite sports protection that blends advanced engineering with the classic elegance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Thin divider ── */}
            <div className="row justify-content-center mt-10 mb-10">
                <div className="col-12 brand-story-wrapper">
                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                </div>
            </div>

            {/* ── Content blocks: full-width, one per row, centred ── */}
            <div className="row justify-content-center">

                {/* Where Heritage Meets Innovation */}
                <div className="col-12 mb-40">
                    <div className="tp_fade_anim text-start brand-story-wrapper" data-delay=".3">
                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">Where Heritage Meets Innovation</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Cricket carries tradition in every stroke and every stance. We respect that legacy.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Our flagship cricket helmet is designed to preserve the iconic silhouette of the game, while integrating cutting-edge impact protection, lightweight materials, and superior comfort systems.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Every KNYX product is meticulously engineered to deliver uncompromising safety without sacrificing style.
                        </p>
                    </div>
                </div>

                <div className="col-12 mb-20 brand-story-wrapper">
                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                </div>

                {/* Crafted for Performance */}
                <div className="col-12 mb-40">
                    <div className="tp_fade_anim text-start brand-story-wrapper" data-delay=".4">
                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">Crafted for Performance</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Every KNYX product is shaped by precision engineering, rigorous testing, and an uncompromising pursuit of perfection. From material selection to final finish, nothing is left to chance.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-10 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">Our equipment offers:</p>
                        <ul className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            <li>Advanced impact absorption</li>
                            <li>Lightweight construction</li>
                            <li>Improved Airflow and comfort</li>
                            <li>Secure and adjustable fit</li>
                            <li>Long-lasting durability</li>
                        </ul>
                        <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Because true confidence begins with trust in your gear.
                        </p>
                    </div>
                </div>

                <div className="col-12 mb-20 brand-story-wrapper">
                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                </div>

                {/* Our Philosophy */}
                <div className="col-12 mb-40">
                    <div className="tp_fade_anim text-start brand-story-wrapper" data-delay=".5">
                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">Our Philosophy</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-10 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">We believe in:</p>
                        <ul className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            <li>Precision over compromise</li>
                            <li>Innovation with purpose</li>
                            <li>Tradition with relevance</li>
                            <li>Excellence without exception</li>
                        </ul>
                        <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            These principles guide every product we create.
                        </p>
                    </div>
                </div>

                <div className="col-12 mb-20 brand-story-wrapper">
                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                </div>

                {/* For the New Age Knight */}
                <div className="col-12 mb-40">
                    <div className="tp_fade_anim text-start brand-story-wrapper" data-delay=".6">
                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">For the New Age Knight</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Every cricketer who steps onto the field is a warrior of the game.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            KNYX equips them with refined protection — designed to perform under pressure and endure every challenge. When you wear KNYX, you carry confidence, composure, and control.
                        </p>
                    </div>
                </div>

                <div className="col-12 mb-20 brand-story-wrapper">
                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                </div>

                {/* The KNYX Promise */}
                <div className="col-12 mb-30">
                    <div className="tp_fade_anim text-start brand-story-wrapper" data-delay=".7">
                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">The KNYX Promise</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Our journey begins with cricket helmets, but our ambition extends far beyond.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            KNYX is building a premium ecosystem of protective equipment for athletes who demand the highest standards.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            We exist to protect the player, elevate performance, and honour the spirit of the knight.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

export default BrandStorySection;
