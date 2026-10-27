import { useId, useRef, useState } from "react";

export default function Tabs({ items, onTabChange, children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useId();
  const buttons = useRef([]);

  function selectTab(index) {
    setActiveIndex(index);
    onTabChange?.(items[index].id);
  }

  function handleKeyDown(event) {
    let next = activeIndex;
    if (event.key === "ArrowRight") next = (activeIndex + 1) % items.length;
    else if (event.key === "ArrowLeft")
      next = (activeIndex - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    selectTab(next);
    buttons.current[next].focus();
  }

  return (
    <>
      <div
        className="tabs"
        role="tablist"
        aria-label="Situação dos cursos"
        onKeyDown={handleKeyDown}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={activeIndex === index}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => selectTab(index)}
          >
            {item.label}
            <span className="tab-count">{item.count}</span>
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={activeIndex !== index}
          tabIndex={0}
        >
          {activeIndex === index &&
            (children ? children(item.id) : item.content)}
        </div>
      ))}
    </>
  );
}
