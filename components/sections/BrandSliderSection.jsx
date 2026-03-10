"use client";
import React from 'react';
import { withBasePath } from "@/lib/asset";

const brands = [
    { img: 'logo.png', name: 'TACTICAL FACEGUARD' },
    { img: 'logo-1.png', name: 'RIM (RADIAL IMPACT MITIGATION)' },
    { img: 'logo-2.png', name: 'NECK SHIELD PRO' },
    { img: 'logo-3.png', name: 'MAGLOCK' },
    { img: 'logo-4.png', name: 'CARBON COMPOSITE' },
    { img: 'logo-5.png', name: 'IVS (IMPROVED VENTILATION SYSTEM)' },
    { img: 'logo-6.png', name: 'KOOLFORM' },
    { img: 'logo-7.png', name: 'EPP' },
    { img: 'logo-8.png', name: 'ISOFIT' },
];

/* Duplicate so the loop appears seamless */
const track = [...brands, ...brands, ...brands];

const BrandSliderSection = () => (
    <section
        className="brand-slider-section"
        style={{ paddingTop: '0px', paddingBottom: '0px', overflow: 'hidden' }}
    >
        <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            {/* ── CSS-driven infinite ticker ── */}
            <div className="knyx-ticker-wrap">
                <div className="knyx-ticker-track">
                    {track.map((brand, i) => (
                        <div key={i} className="knyx-ticker-item">
                            <img
                                src={withBasePath(`/assets/img/brands/${brand.img}`)}
                                alt={brand.name}
                                style={{ maxWidth: '48px', height: 'auto', display: 'block', margin: '0 auto', filter: 'invert(1)' }}
                            />
                            <span
                                className="tp-text-common-white"
                                style={{ fontSize: '9px', letterSpacing: '0.06em', marginTop: '8px', display: 'block', textAlign: 'center', whiteSpace: 'nowrap' }}
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
            .knyx-ticker-track {
                display: flex;
                align-items: center;
                /* one cycle = 9 items × (48px img + ~80px gap) ≈ width of one set */
                animation: knyx-scroll 28s linear infinite;
                will-change: transform;
            }
            .knyx-ticker-item {
                flex: 0 0 auto;
                width: 120px;
                margin: 0 40px;
                pointer-events: none;
                user-select: none;
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
