import { withBasePath } from "@/lib/asset";

const faqs = [
  { 
    id: 'one', 
    question: 'What materials are used in KNYX helmets?', 
    answer: 'KNYX helmets are made from high-quality, impact-resistant materials to ensure maximum safety and comfort for every player.' 
  },
  { 
    id: 'two', 
    question: 'Are KNYX helmets approved by cricket authorities?', 
    answer: 'Yes, all KNYX helmets meet international cricket safety standards and are certified for professional and amateur play.' 
  },
  { 
    id: 'three', 
    question: 'Do you offer customized helmet designs?', 
    answer: 'Absolutely! KNYX provides custom designs and colors for teams and individual players to suit their style and preferences.' 
  },
  { 
    id: 'four', 
    question: 'How long does it take to deliver a helmet?', 
    answer: 'Delivery typically takes 5-10 business days, depending on customization and location.' 
  },
  { 
    id: 'five', 
    question: 'What is the warranty on KNYX helmets?', 
    answer: 'KNYX helmets come with a 1-year warranty covering manufacturing defects to ensure you play with confidence.' 
  }
];

const FaqSection = () => (
  <div className="tp-faq-area tp-bg-common-black-5 pt-155 pb-100 p-relative z-index-1">
    <img className="tp-faq-ai-noise" src={withBasePath('/assets/img/body/noise.png')} alt="" />
    <div className="container">
      <div className="row">
        <div className="col-lg-9 offset-lg-3">
          <div className="tp-faq-ai-title-wrap mb-90">
            <span className="text-anim tp-ff-inter fw-500 fs-18 ls-m-4 tp-text-common-white mb-10 d-inline-block">/ FAQ /</span>
            <h2 className="text-anim tp-section-ai-title fs-72 fs-xl-65 fs-lg-55  fs-sm-45 fs-xs-40 fw-600 ls-m-4 tp-ff-jakarta tp-text-common-white">
              Explore Answers to
              <br /> Our Most Asked Questions
            </h2>
          </div>
        </div>
        <div className="col-12">
          <div className="tp-faq-wrap tp-faq-cst-tab-content tp-faq-ai-tab-content">
            <div className="accordion mb-60" id="general_faqaccordion">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="accordion-item tp_fade_anim" data-delay=".3">
                  <h2 className="accordion-header p-relative" id={`order_${faq.id}`}>
                    <button
                      className={`tp-faq-btn ${index === 0 ? '' : 'collapsed'}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#order__collapse_${faq.id}`}
                      aria-expanded={index === 0 ? 'true' : 'false'}
                      aria-controls={`order__collapse_${faq.id}`}
                    >
                      <span className="tp-faq-ai-count">{`0${index + 1}`}</span>
                      {faq.question}
                      <span className="accordion-btn"></span>
                    </button>
                  </h2>
                  <div
                    id={`order__collapse_${faq.id}`}
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    aria-labelledby={`order_${faq.id}`}
                    data-bs-parent="#general_faqaccordion"
                  >
                    <div className="accordion-body tp-faq-details-para">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FaqSection;
