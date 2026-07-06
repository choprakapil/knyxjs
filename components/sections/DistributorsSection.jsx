import React, { useEffect, useState } from "react";
import DistributorCard from "@/components/ui/DistributorCard";
import ComingSoon from "@/components/common/ComingSoon";
import { distributorsData } from "@/lib/data/distributors";

const DistributorsSection = () => {
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [distributors, setDistributors] = useState(distributorsData.list || []);
    const [header, setHeader] = useState(distributorsData.header || { title: "Our Distributors", description: "Find official distributors delivering KNYX equipment in your region." });

    useEffect(() => {
        const loadDistributors = async () => {
            try {
                const res = await fetch("/api/admin/distributors");
                const data = await res.json();
                if (data.success) {
                    const distributorsPayload = data.distributors || [];
                    setDistributors(distributorsPayload.length > 0 ? distributorsPayload : distributorsData.list || []);
                    setHeader(distributorsData.header || header);
                }
            } catch (error) {
                console.error("Failed to load distributors content:", error);
            }
        };

        loadDistributors();
    }, []);

    if (!distributors || distributors.length === 0) {
        return <ComingSoon message="Our global network of official distributors is currently expanding. Check back soon." />;
    }

    const countries = ["All", ...new Set(distributors.map((d) => d.country))];

    const filteredDistributors = selectedCountry === "All"
        ? distributors
        : distributors.filter((d) => d.country === selectedCountry);

    return (
        <section className="tp-distributors-section pt-50 pb-100" style={{ backgroundColor: "#030303", minHeight: "100vh" }}>
            <div className="container-fluid container-1524">
                
                {/* Section Header */}
                <div className="row mb-50">
                    <div className="col-12">
                        <h1 className="tp-ff-jakarta fw-600 fs-48 fs-md-36 tp-text-common-white mb-15">{header.title}</h1>
                        <p className="tp-ff-dm fw-400 fs-18 tp-text-grey-2 max-w-600">{header.description}</p>
                    </div>
                </div>

                <div className="row">
                    {/* Sidebar Filters */}
                    <div className="col-lg-3 col-md-4 mb-40 mb-md-0">
                        <div className="distributors-sidebar pr-30" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                            <h5 className="tp-ff-jakarta fw-700 fs-20 tp-text-common-white mb-20 text-uppercase ls-1">Browse Locations</h5>
                            <div className="d-flex flex-row flex-md-column gap-3 overflow-auto pb-10 custom-scrollbar">
                                {countries.map((country) => (
                                    <button 
                                        key={country}
                                        onClick={() => setSelectedCountry(country)}
                                        className={`tp-ff-inter fw-600 fs-15 text-start border-0 bg-transparent py-2 px-3 rounded-3 tp-text-common-white`}
                                        style={{
                                            backgroundColor: selectedCountry === country ? "rgba(27, 59, 138, 0.1)" : "transparent",
                                            border: selectedCountry === country ? "1px solid rgba(27, 59, 138, 0.2)" : "1px solid transparent",
                                            color: selectedCountry === country ? "#1B3B8A" : "#ffffff",
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

                    {/* Distributors Grid */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row">
                            {filteredDistributors.map((distributor, index) => (
                                <div key={index} className="col-lg-6 col-xl-4 col-md-6 mb-20">
                                    <DistributorCard {...distributor} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .distributors-sidebar { height: 100%; }
                @media (max-width: 767px) {
                    .distributors-sidebar { border-right: 0 !important; padding-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; }
                    .custom-scrollbar { -webkit-overflow-scrolling: touch; }
                    .max-w-600 { max-width: 100% !important; }
                }
                .max-w-600 { max-width: 600px; }
            `}</style>
        </section>
    );
};

export default DistributorsSection;
