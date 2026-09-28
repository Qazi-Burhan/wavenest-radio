import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_DATA } from '../data/faq';

export const FAQAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['what-is-wavenest']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Got Questions?</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our broadcasts, memberships, and independent mission.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                id={`faq-item-${item.id}`}
              >
                <button
                  type="button"
                  className="faq-button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp size={20} style={{ color: 'var(--accent-secondary)' }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
                  )}
                </button>

                {isOpen && (
                  <div
                    className="faq-answer"
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
