import type { ReactNode } from "react";

interface BezelProps {
  children: ReactNode;
  /** Extra classes for the outer frame (grid placement, hover motion). */
  className?: string;
  /** Extra classes for the solid core (padding, background tone). */
  coreClassName?: string;
  /** Padding of the middle layer in px: 8 for list cards, 12 for large panels. */
  inset?: 8 | 12;
}

/** The three-layer card used for every raised surface on the page. See the .bezel rules in globals.css. */
export function Bezel({ children, className = "", coreClassName = "", inset = 8 }: BezelProps) {
  return (
    <div className={`bezel h-full ${className}`}>
      <div className="bezel-mid h-full" style={{ padding: inset }}>
        <div className={`bezel-core h-full ${coreClassName}`}>{children}</div>
      </div>
    </div>
  );
}
