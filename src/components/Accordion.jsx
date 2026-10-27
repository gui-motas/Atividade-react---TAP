import { useId, useState } from "react";
import Icon from "./Icon.jsx";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const id = useId();
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          className={`accordion-item ${openIndex === index ? "is-open" : ""}`}
          key={item.title}
        >
          <h3>
            <button
              id={`${id}-trigger-${index}`}
              aria-expanded={openIndex === index}
              aria-controls={`${id}-panel-${index}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.title}
              <Icon name="chevron" size={18} />
            </button>
          </h3>
          <div
            className="accordion-panel"
            id={`${id}-panel-${index}`}
            role="region"
            aria-labelledby={`${id}-trigger-${index}`}
            inert={openIndex !== index}
          >
            <div>
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
