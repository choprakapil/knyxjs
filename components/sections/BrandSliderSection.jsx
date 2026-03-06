"use client";
import React from 'react';
import { withBasePath } from "@/lib/asset";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BrandSliderSection = () => {
    return (
        <section className="brand-slider-section" style={{ paddingTop: '80px', paddingBottom: '10px' }}>
            <div className="container-fluid container-1824 containers">
                <div className="row">
                    <div className="col-12">
                        <div className="tp-brand-wrap tp-hero-ai-brand pt-75 pb-75">
                            <Swiper
                                modules={[Autoplay]}
                                className="tp-brand-slide-active"
                                loop={true}
                                freeMode={true}
                                slidesPerView="auto"
                                centeredSlides={true}
                                allowTouchMove={false}
                                speed={8000}
                                autoplay={{
                                    delay: 1,
                                    disableOnInteraction: true,
                                }}
                            >
                                {[
                                    { img: 'logo.png', name: 'TACTICAL FACEGUARD' },
                                    { img: 'logo-1.png', name: 'RIM (RADIAL IMPACT MITIGATION)' },
                                    { img: 'logo-2.png', name: 'NECK SHIELD PRO' },
                                    { img: 'logo-3.png', name: 'MAGLOCK' },
                                    { img: 'logo-4.png', name: 'CARBON COMPOSITE' },
                                    { img: 'logo-5.png', name: 'IVS (IMPROVED VENTILATION SYSTEM)' },
                                    { img: 'logo-6.png', name: 'KOOLFORM' },
                                    { img: 'logo-7.png', name: 'EPP' },
                                    { img: 'logo-8.png', name: 'ISOFIT' },
                                ].map((brand, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="tp-brand-item text-center">
                                            <a href="#" onClick={(e) => e.preventDefault()} className="d-flex flex-column align-items-center">
                                                <img src={withBasePath(`/assets/img/brands/${brand.img}`)} alt={brand.name} />
                                                <span className="tp-text-common-white mt-10">{brand.name}</span>
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandSliderSection;
