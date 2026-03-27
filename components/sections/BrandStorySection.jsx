import React, { useEffect } from 'react';
import { withBasePath } from "@/lib/asset";
import { homeData } from "@/lib/data/home";

const BrandStorySection = ({ isHomePage = false }) => {
    useEffect(() => {
        const handleHash = () => {
            if (window.location.hash === "#brand-story") {
                const element = document.getElementById("brand-story");
                if (element) {
                    // Small delay to allow home page GSAP/Loaders to settle
                    setTimeout(() => {
                        window.scrollTo({
                            top: element.offsetTop - 100, // accounting for sticky header
                            behavior: "smooth"
                        });
                    }, 800);
                }
            }
        };

        handleHash();
        window.addEventListener("hashchange", handleHash);
        return () => window.removeEventListener("hashchange", handleHash);
    }, []);

    return (
        <div id="brand-story" className={`tp-about-area pt-50 pb-50 p-relative z-index-1`}>
            <div className="container-fluid container-1524">

                {/* ── Intro block: 80% centred ── */}
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="brand-story-wrapper">
                            <div className="tp-about-ai-content mb-30 text-start">
                                <div className="tp-about-ai-text-wrap mb-10 text-start">
                                    <h3 className="tp-about-ai-title text-uppercase tp-ff-jakarta fw-600 ls-m-4 tp-text-common-white tet-left title-slide-gradient">
                                        {homeData.brandStory.title}
                                    </h3>
                                </div>
                                <h2 className="tp-about-ai-text fw-600 tp-ff-brand fs-38 fs-xl-60 fs-md-36 lh-120-per ls-m-4 d-flex align-items-center justify-content-start mb-35 tp_fade_anim" data-delay=".3">
                                    <span className="tp-text-common-white tp-brand-font">{homeData.brandStory.brandName}</span>
                                </h2>
                                <div className="tp_fade_anim" data-delay=".5">
                                    <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                        {homeData.brandStory.intro}
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
                    {homeData.brandStory.sections.map((section, index) => (
                        <React.Fragment key={index}>
                            <div className="col-12 mb-40">
                                <div className="tp_fade_anim text-start brand-story-wrapper" data-delay={`.${3 + index}`}>
                                    <h3 className="tp-ff-jakarta fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">{section.title}</h3>

                                    {section.content.map((paragraph, pIdx) => (
                                        <p key={pIdx} className={`tp-about-ai-para tp-ff-dm fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2 ${pIdx === section.content.length - 1 && section.list.length === 0 && !section.footer ? 'mb-0' : 'mb-20'}`}>
                                            {typeof paragraph === 'string' ? (
                                                paragraph.split(/(#NowKnyx)/g).map((part, i) => 
                                                    part === '#NowKnyx' ? <i key={i}>{part}</i> : part
                                                )
                                            ) : paragraph}
                                        </p>
                                    ))}

                                    {section.list && section.list.length > 0 && (
                                        <ul className="tp-about-ai-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                            {section.list.map((listItem, lIdx) => (
                                                <li key={lIdx}>
                                                    {typeof listItem === 'string' ? (
                                                        listItem.split(/(#NowKnyx)/g).map((part, i) => 
                                                            part === '#NowKnyx' ? <i key={i}>{part}</i> : part
                                                        )
                                                    ) : listItem}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.footer && (
                                        <p className="tp-about-ai-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                            {typeof section.footer === 'string' ? (
                                                section.footer.split(/(#NowKnyx)/g).map((part, i) => 
                                                    part === '#NowKnyx' ? <i key={i}>{part}</i> : part
                                                )
                                            ) : section.footer}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Divider after block except the last one (if we wanted to match exactly, original had divider after almost all, let's keep it strictly like original) */}
                            {index !== homeData.brandStory.sections.length - 1 && (
                                <div className="col-12 mb-20 brand-story-wrapper">
                                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandStorySection;
