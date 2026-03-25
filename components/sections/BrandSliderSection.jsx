"use client";
import React from 'react';
import { withBasePath } from "@/lib/asset";
import { homeData } from "@/lib/data/home";

const track = homeData.brands;

const BrandSliderSection = () => (
    <section
        className="brand-slider-section"
        style={{ paddingTop: '0px', paddingBottom: '0px', overflow: 'hidden' }}
    >
        <div style={{ paddingTop: '10px', paddingBottom: '30px' }}>
            {/* ── CSS-driven infinite ticker ── */}
            <div className="knyx-ticker-wrap">
                <div className="knyx-ticker-track">
                    {track.map((brand, i) => (
                        <div key={i} className="knyx-ticker-item">
                            <img
                                src={withBasePath(`/assets/img/brands/${brand.img}`)}
                                alt={brand.name}
                                style={{ maxWidth: '48px', height: 'auto', display: 'block', margin: '0', filter: 'invert(1)' }}
                            />
                            <span
                                className="tp-text-common-white"
                                style={{ fontSize: '9px', letterSpacing: '0.06em', marginTop: '8px', display: 'block', textAlign: 'center', whiteSpace: 'normal', maxWidth: '100%', wordBreak: 'break-word' }}
                            >
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <style>{`
            .knyx-ticker-wrap {
                width: 100%;
                overflow: hidden;
            }
    //         .knyx-ticker-track {
    //             display: flex;
    //             align-items: center;
    //             /* one cycle = 9 items × (48px img + ~80px gap) ≈ width of one set */
    //             // animation: knyx-scroll 28s linear infinite;
    //             // will-change: transform;


    // justify-content: center;
    // flex-wrap: wrap;
    //         }




    .knyx-ticker-track {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0px;
    justify-items: start;
}
           .knyx-ticker-item {
    flex: 0 0 auto;
    width: 120px;
    margin: 0 20px;
    pointer-events: none;
    user-select: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
            @keyframes knyx-scroll {
                /* Each item: 120px wide + 80px margin (40px each side) = 200px × 9 items = 1800px */
                0%   { transform: translateX(0); }
                100% { transform: translateX(-1800px); }
            }
        `}</style>
    </section>
);

export default BrandSliderSection;
