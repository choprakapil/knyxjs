import React, { useState } from "react";
import StockistCard from "@/components/ui/StockistCard";
import ComingSoon from "@/components/common/ComingSoon";
import { stockistsData } from "@/lib/data/stockists";

const StockistsSection = () => {
    const [selectedCountry, setSelectedCountry] = useState("All");
    
    if (!stockistsData.list || stockistsData.list.length === 0) {
        return <ComingSoon message="Our global network of official stockists is currently expanding. Check back soon." />;
    }

    const countries = ["All", ...new Set(stockistsData.list.map(s => s.country))];

    const filteredStockists = selectedCountry === "All" 
        ? stockistsData.list 
        : stockistsData.list.filter(s => s.country === selectedCountry);

    return (
        <section className="tp-stockists-section pt-150 pb-100" style={{ backgroundColor: "#030303", minHeight: "100vh" }}>
            <div className="container-fluid container-1524">
                
                {/* Section Header */}
                <div className="row mb-50">
                    <div className="col-12">
                        <h1 className="tp-ff-jakarta fw-600 fs-48 fs-md-36 tp-text-common-white mb-15">{stockistsData.header.title}</h1>
                        <p className="tp-ff-dm fw-400 fs-18 tp-text-grey-2 max-w-600">{stockistsData.header.description}</p>
                    </div>
                </div>

                <div className="row">
                    {/* Sidebar Filters */}
                    <div className="col-lg-3 col-md-4 mb-40 mb-md-0">
                        <div className="stockists-sidebar pr-30" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                            <h5 className="tp-ff-jakarta fw-700 fs-20 tp-text-common-white mb-20 text-uppercase ls-1">Browse Locations</h5>
                            <div className="d-flex flex-row flex-md-column gap-3 overflow-auto pb-10 custom-scrollbar">
                                {countries.map((country) => (
                                    <button 
                                        key={country}
                                        onClick={() => setSelectedCountry(country)}
                                        className={`tp-ff-inter fw-600 fs-15 text-start border-0 bg-transparent py-2 px-3 rounded-3 tp-text-common-white`}
                                        style={{
                                            backgroundColor: selectedCountry === country ? "rgba(200, 255, 0, 0.1)" : "transparent",
                                            border: selectedCountry === country ? "1px solid rgba(200, 255, 0, 0.2)" : "1px solid transparent",
                                            color: selectedCountry === country ? "#c8ff00" : "#ffffff",
                                            whiteSpace: "nowrap",
                                            transition: "all 0.3s ease",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stockists Grid */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row">
                            {filteredStockists.map((stockist, index) => (
                                <div key={index} className="col-lg-6 col-xl-4 col-md-6 mb-20">
                                    <StockistCard {...stockist} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .stockists-sidebar { height: 100%; }
                @media (max-width: 767px) {
                    .stockists-sidebar { border-right: 0 !important; padding-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; }
                    .custom-scrollbar { -webkit-overflow-scrolling: touch; }
                    .max-w-600 { max-width: 100% !important; }
                }
                .max-w-600 { max-width: 600px; }
            `}</style>
        </section>
    );
};

export default StockistsSection;
