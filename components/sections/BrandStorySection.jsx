import React, { useEffect, useState } from 'react';
import { homeData } from "@/lib/data/home";

const normalizeSection = (section) => ({
    ...section,
    content: Array.isArray(section.content) ? section.content : [section.content || ""],
    list: section.list ?? [],
    footer: section.footer || ""
});

const BrandStorySection = ({ isHomePage = false }) => {
    const [brandStory, setBrandStory] = useState(homeData.brandStory);
    const [brandName, setBrandName] = useState(homeData.brandStory.brandName || "KNYX");
    const [intro, setIntro] = useState(homeData.brandStory.intro || "");

    useEffect(() => {
        const handleHash = () => {
            if (window.location.hash === "#brand-story") {
                const element = document.getElementById("brand-story");
                if (element) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: element.offsetTop - 100,
                            behavior: "smooth"
                        });
                    }, 800);
                }
            }
        };

        const loadBrandContent = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                const data = await res.json();
                if (data.success) {
                    const home = data.settings?.content?.home || {};
                    const story = home.brandStory || {};

                    setBrandStory({
                        ...homeData.brandStory,
                        ...story,
                        sections: (story.sections || homeData.brandStory.sections).map(normalizeSection)
                    });
                    setBrandName(story.brandName || homeData.brandStory.brandName || "KNYX");
                    setIntro(story.intro || homeData.brandStory.intro || "");
                }
            } catch (error) {
                console.error("Failed to load brand story content:", error);
            }
        };

        handleHash();
        loadBrandContent();
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
                                        {brandStory.title}
                                    </h3>
                                </div>
                                <h2 className="tp-about-ai-text brand-story-main-title fw-600 tp-ff-brand fs-38 fs-xl-60 fs-md-36 lh-120-per ls-m-4 d-flex align-items-center justify-content-start mb-35 tp_fade_anim" data-delay=".3">
                                    <span className="tp-text-common-white tp-brand-font">{brandName}</span>
                                </h2>
                                <div className="tp_fade_anim" data-delay=".5">
                                    <div 
                                        className="tp-about-ai-para responsive-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2"
                                        dangerouslySetInnerHTML={{
                                            __html: typeof intro === 'string' ? intro.replace(/(#NowKnyx)/g, '<i>$1</i>') : ''
                                        }}
                                    />
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
                    {brandStory.sections.map((section, index) => (
                        <React.Fragment key={index}>
                            <div className="col-12 mb-40">
                                <div className="tp_fade_anim text-start brand-story-wrapper" data-delay={`.${3 + index}`}>
                                    <h3 className="tp-ff-jakarta responsive-h3 fw-600 fs-32 ls-m-2 mb-20 tp-text-common-white">{section.title}</h3>

                                    {section.content.map((paragraph, pIdx) => (
                                        <div 
                                            key={pIdx} 
                                            className={`tp-about-ai-para responsive-para tp-ff-dm fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2 ${pIdx === section.content.length - 1 && section.list.length === 0 && !section.footer ? 'mb-0' : 'mb-20'}`}
                                            dangerouslySetInnerHTML={{
                                                __html: typeof paragraph === 'string' ? paragraph.replace(/(#NowKnyx)/g, '<i>$1</i>') : ''
                                            }}
                                        />
                                    ))}

                                    {section.list && section.list.length > 0 && (
                                        <ul className="tp-about-ai-para responsive-para tp-ff-dm mb-20 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2">
                                            {section.list.map((listItem, lIdx) => (
                                                <li 
                                                    key={lIdx}
                                                    dangerouslySetInnerHTML={{
                                                        __html: typeof listItem === 'string' ? listItem.replace(/(#NowKnyx)/g, '<i>$1</i>') : ''
                                                    }}
                                                />
                                            ))}
                                        </ul>
                                    )}

                                    {section.footer && (
                                        <div 
                                            className="tp-about-ai-para responsive-para tp-ff-dm mb-0 fw-400 fs-22 ls-m-2 lh-150-per tp-text-grey-2"
                                            dangerouslySetInnerHTML={{
                                                __html: typeof section.footer === 'string' ? section.footer.replace(/(#NowKnyx)/g, '<i>$1</i>') : ''
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Divider after block except the last one (if we wanted to match exactly, original had divider after almost all, let's keep it strictly like original) */}
                            {index !== brandStory.sections.length - 1 && (
                                <div className="col-12 mb-20 brand-story-wrapper">
                                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <style jsx global>{`
                /* Override display: none on br tags to make line breaks work */
                .tp-about-ai-para br {
                    display: inline !important;
                }
                
                /* List Styles */
                .tp-about-ai-para ul {
                    list-style-type: disc !important;
                    padding-left: 24px !important;
                    margin-top: 12px !important;
                    margin-bottom: 12px !important;
                }
                
                .tp-about-ai-para ol {
                    list-style-type: decimal !important;
                    padding-left: 24px !important;
                    margin-top: 12px !important;
                    margin-bottom: 12px !important;
                }
                
                .tp-about-ai-para li {
                    display: list-item !important;
                    margin-bottom: 8px !important;
                    list-style: inherit !important;
                }
                
                /* Formatting styling */
                .tp-about-ai-para strong, 
                .tp-about-ai-para b {
                    font-weight: 700 !important;
                }
                
                .tp-about-ai-para em, 
                .tp-about-ai-para i {
                    font-style: italic !important;
                }
                
                /* Headings within dynamic rich text */
                .tp-about-ai-para h1,
                .tp-about-ai-para h2,
                .tp-about-ai-para h3,
                .tp-about-ai-para h4,
                .tp-about-ai-para h5,
                .tp-about-ai-para h6 {
                    color: #ffffff !important;
                    font-weight: 600 !important;
                    margin-top: 20px !important;
                    margin-bottom: 10px !important;
                    font-family: var(--tp-ff-jakarta) !important;
                }
                .tp-about-ai-para h1 { font-size: 32px !important; }
                .tp-about-ai-para h2 { font-size: 28px !important; }
                .tp-about-ai-para h3 { font-size: 24px !important; }
                .tp-about-ai-para h4 { font-size: 20px !important; }

                @media (max-width: 767px) {
                    /* Targeting both brand labels and main brand names to ensure 'brand story font size' looks correct */
                    .tp-about-ai-title,
                    .brand-story-main-title {
                        font-size: 35px !important;
                        margin-bottom: 5px !important;
                        line-height: 1.1 !important;
                    }
                    
                    /* Targeting the wrapper div to eliminate the gap */
                    div.tp-about-ai-content.mb-30 {
                        margin-bottom: 0 !important;
                    }
                    
                    .tp-about-ai-text-wrap.mb-10 {
                        margin-bottom: 0 !important;
                    }

                    .responsive-h3 {
                        font-size: 26px !important;
                        margin-bottom: 12px !important;
                    }
                    
                    .responsive-para {
                        font-size: 18px !important;
                        line-height: 1.4 !important;
                    }
                    
                    .tp-about-area {
                        padding-top: 40px !important;
                        padding-bottom: 40px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default BrandStorySection;
