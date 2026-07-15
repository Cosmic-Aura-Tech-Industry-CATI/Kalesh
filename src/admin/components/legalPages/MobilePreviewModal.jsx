import { X, Smartphone } from "lucide-react";

import "../../style/legalPages/preview.css";
import PhoneFrame from "./PhoneFrame";

export default function MobilePreviewModal({ open, page, onClose }) {
  if (!open || !page) return null;

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top */}

        <div className="preview-topbar">
          <div className="preview-title">
            <Smartphone size={18} />
            <span>Mobile Preview</span>
          </div>

          <button className="preview-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Phone */}

        <PhoneFrame>
          <div className="mobile-preview">
            {/* Header */}

            <div className="mobile-preview-header">
              <h2>{page.title}</h2>

              <span>
                Last Updated • {new Date(page.lastUpdated).toLocaleDateString()}
              </span>
            </div>

            {/* Content */}

            <div className="mobile-preview-content">
              {page.sections?.map((section, index) => (
                <div key={index} className="mobile-section">
                  {section.heading && <h3>{section.heading}</h3>}

                  {section.introText && (
                    <p className="intro">{section.introText}</p>
                  )}

                  {section.type === "paragraph" && <p>{section.content}</p>}

                  {section.type === "bullet_list" && (
                    <ul>
                      {section.content?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.type === "rich_bullet_list" && (
                    <div className="rich-wrapper">
                      {section.content?.map((item, i) => (
                        <div key={i} className="rich-item">
                          <h4>{item.title}</h4>

                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
