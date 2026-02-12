import { withBasePath } from "@/lib/asset";

const BrandStorySection = () => (
    <div className="tp-about-area pt-150 pb-130 p-relative z-index-1">
        <div className="container-fluid container-1524">
            {/* Introduction Section */}
            <div className="row align-items-start">
                <div className="col-lg-5">
                    <div className="tp-about-ai-subtitle mb-30 text-lg-center tp_fade_anim" data-delay=".3">
                        <span className="tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-common-white">/ Brand Story /</span>
                        <div className="about_bgcontainer">
                            <video autoPlay loop muted playsInline className="about_video">
                                <source src={withBasePath("/assets/video/about.mp4")} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="tp-about-ai-content mb-30">
                        <h2 className="tp-about-ai-title fw-600 tp-ff-jakarta ls-m-4 d-flex align-items-start mb-35 tp_fade_anim" data-delay=".3">
                            <span className="title-slide-gradient">KNYX</span>
                            <span className="aleric-ai tp-text-common-white fs-22 ls-0 mt-35">Engineered Excellence</span>
                        </h2>
                        <div className="tp_fade_anim" data-delay=".5">
                            <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                At KNYX, protection is a craft, and performance is a promise.
                            </p>
                            <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                Born from the spirit of knight, KNYX reflects strength, precision, and timeless honour. We represent the modern athlete — focused, fearless, and equipped.
                            </p>
                            <p className="tp-about-ai-para tp-ff-dm mb-55 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                KNYX was created with a singular vision: to build elite sports protection that blends advanced engineering with the classic elegance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Split Section */}
            <div className="row mt-50">
                <div className="col-lg-6">
                    <div className="tp_fade_anim" data-delay=".5">
                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">Where Heritage Meets Innovation</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Cricket carries tradition in every stroke and every stance. We respect that legacy.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Our flagship cricket helmet is designed to preserve the iconic silhouette of the game, while integrating cutting-edge impact protection, lightweight materials, and superior comfort systems.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-55 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Every KNYX product is meticulously engineered to deliver uncompromising safety without sacrificing style.
                        </p>

                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">Crafted for Performance</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Every KNYX product is shaped by precision engineering, rigorous testing, and an uncompromising pursuit of perfection. From material selection to final finish, nothing is left to chance.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-10 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">Our equipment offers:</p>
                        <ul className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2 pl-20" style={{ listStyleType: 'disc' }}>
                            <li>Advanced impact absorption</li>
                            <li>Lightweight construction</li>
                            <li>Improved Airflow and comfort</li>
                            <li>Secure and adjustable fit</li>
                            <li>Long-lasting durability</li>
                        </ul>
                        <p className="tp-about-ai-para tp-ff-dm mb-55 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Because true confidence begins with trust in your gear.
                        </p>

                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">For the New Age Knight</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Every cricketer who steps onto the field is a warrior of the game.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-55 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            KNYX equips them with refined protection — designed to perform under pressure and endure every challenge. When you wear KNYX, you carry confidence, composure, and control.
                        </p>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="tp_fade_anim" data-delay=".5">
                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">Our Philosophy</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-10 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">We believe in:</p>
                        <ul className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2 pl-20" style={{ listStyleType: 'disc' }}>
                            <li>Precision over compromise</li>
                            <li>Innovation with purpose</li>
                            <li>Tradition with relevance</li>
                            <li>Excellence without exception</li>
                        </ul>
                        <p className="tp-about-ai-para tp-ff-dm mb-55 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            These principles guide every product we create.
                        </p>

                        <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">The KNYX Promise</h3>
                        <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            Our journey begins with cricket helmets, but our ambition extends far beyond.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-40 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            KNYX is building a premium ecosystem of protective equipment for athletes who demand the highest standards.
                        </p>
                        <p className="tp-about-ai-para tp-ff-dm mb-55 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                            We exist to protect the player, elevate performance, and honour the spirit of the knight.
                        </p>

                        <h2 className="tp-about-ai-title fw-600 tp-ff-jakarta ls-m-4 d-flex align-items-start mb-35 tp_fade_anim" data-delay=".3">
                            <span className="title-slide-gradient">KNYX</span>
                            <span className="aleric-ai tp-text-common-white fs-22 ls-0 mt-35">Engineered Excellence</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BrandStorySection;
