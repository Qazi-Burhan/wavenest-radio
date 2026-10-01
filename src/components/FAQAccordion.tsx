import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';

export const FAQAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['what-is-wavenest']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="section-padding faq-section" aria-label="Frequently Asked Questions">
      <div className="container" style={{ maxWidth: '880px' }}>
        <div className="section-header">
          <span className="section-eyebrow">COMMON QUESTIONS</span>
          <h2 className="section-title">Everything you need to know.</h2>
          <p className="section-desc">
            Independent, listener-backed broadcasting is simple and transparent. Here are answers to the most common questions.
          </p>
        </div>

        <div className="faq-list" role="region" aria-label="FAQ Accordion">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            const contentId = `faq-answer-${item.id}`;
            const headerId = `faq-header-${item.id}`;

            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                id={`faq-item-${idx}`}
              >
                <button
                  type="button"
                  id={headerId}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(item.id)}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <div className={`faq-chevron-circle ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={17} />
                  </div>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`faq-answer-panel ${isOpen ? 'visible' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};