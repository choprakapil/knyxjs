"use client";
import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if page is scrolled more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className="back-to-top-btn"
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      <style jsx>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #1B3B8A;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          z-index: 999;
          opacity: ${isVisible ? "1" : "0"};
          visibility: ${isVisible ? "visible" : "hidden"};
          transform: translateY(${isVisible ? "0" : "20px"});
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(27, 59, 138, 0.3);
        }
        
        .back-to-top-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(27, 59, 138, 0.4);
          background-color: #2547a1;
        }

        .back-to-top-btn i {
          transition: transform 0.3s ease;
        }

        .back-to-top-btn:hover i {
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .back-to-top-btn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default BackToTop;
