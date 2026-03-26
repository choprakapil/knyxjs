import React from "react";

const StockistCard = ({ name, address, phone, email, website }) => {
    return (
        <div className="stockist-card p-4 tp-round-24 mb-20" style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.05)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
        }}>
            <h3 className="tp-ff-jakarta fw-600 fs-22 tp-text-common-white mb-15">{name}</h3>
            <div className="stockist-details tp-text-grey-2 tp-ff-dm fs-15 lh-150-per">
                <p className="mb-10 d-flex align-items-start gap-2">
                    <i className="fa-solid fa-location-dot mt-1" style={{ color: "#1B3B8A", minWidth: "16px" }}></i>
                    <span>{address}</span>
                </p>
                <p className="mb-10 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-phone" style={{ color: "#1B3B8A", minWidth: "16px" }}></i>
                    <a href={`tel:${phone}`} className="hover-text-primary">{phone}</a>
                </p>
                <p className="mb-10 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-envelope" style={{ color: "#1B3B8A", minWidth: "16px" }}></i>
                    <a href={`mailto:${email}`} className="hover-text-primary text-break">{email}</a>
                </p>
                <p className="mb-0 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-globe" style={{ color: "#1B3B8A", minWidth: "16px" }}></i>
                    <a href={website} target="_blank" rel="noopener noreferrer" className="hover-text-primary text-break">
                        {website.replace("https://", "").replace("http://", "")}
                    </a>
                </p>
            </div>
            
            <style jsx>{`
                .stockist-card:hover {
                    border-color: rgba(27, 59, 138, 0.3);
                    box-shadow: 0 0 30px rgba(27, 59, 138, 0.08);
                    transform: translateY(-5px);
                }
                .hover-text-primary {
                    color: inherit;
                    transition: color 0.2s ease;
                }
                .hover-text-primary:hover {
                    color: #1B3B8A;
                }
            `}</style>
        </div>
    );
};

export default StockistCard;
