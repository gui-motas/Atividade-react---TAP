import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon.jsx";

export default function Dropdown({ options, value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const optionRefs = useRef([]);
  const id = useId();
  const selectedLabel = options.find((option) => option.value === value)?.label;

  useEffect(() => {
    if (!open) return;
    function handleOutside(event) {
      if (!container.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("focusin", handleOutside);
    optionRefs.current[
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      )
    ]?.focus();
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("focusin", handleOutside);
    };
  }, [open, options, value]);

  function handleKeys(event) {
    if (event.key === "Escape") {
      setOpen(false);
      trigger.current.focus();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const current = optionRefs.current.indexOf(document.activeElement);
      let next =
        event.key === "ArrowDown"
          ? (current + 1) % options.length
          : (current - 1 + options.length) % options.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = options.length - 1;
      optionRefs.current[next]?.focus();
    }
  }

  return (
    <div className="dropdown" ref={container} onKeyDown={handleKeys}>
      <button
        className="filter-button"
        ref={trigger}
        aria-label={`${label}: ${selectedLabel}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen(!open)}
      >
        {selectedLabel}
        <Icon name="chevron" size={16} />
      </button>
      {open && (
        <div
          className="dropdown-options"
          id={id}
          role="menu"
          aria-label={label}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              role="menuitemradio"
              aria-checked={option.value === value}
              tabIndex={-1}
              onClick={() => {
                onChange(option.value);
                option.onSelect?.();
                setOpen(false);
                trigger.current.focus();
              }}
            >
              {option.label}
              {option.value === value && <Icon name="check" size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
