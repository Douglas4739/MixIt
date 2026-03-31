import { useState } from 'react';
import './InfoTooltip.css';

interface Props {
  text: string;
  ariaLabel: string;
}

export default function InfoTooltip({ text, ariaLabel }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="info-tooltip" onMouseLeave={() => setIsOpen(false)}>
      <button
        type="button"
        className="info-tooltip-trigger"
        aria-label={ariaLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        i
      </button>
      <span className={`info-tooltip-content ${isOpen ? 'visible' : ''}`} role="tooltip">
        {text}
      </span>
    </span>
  );
}