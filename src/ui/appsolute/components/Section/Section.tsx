import * as React from "react";
import { cx } from "../../utils";

export interface SectionProps {
  /** Ancora per la Navbar, es. "funzioni" → href="#funzioni". */
  id?: string;
  /** Riga breve sopra il titolo, in maiuscolo. */
  eyebrow?: React.ReactNode;
  /** Titolo della sezione: un <h2>. */
  title?: React.ReactNode;
  /** Frase sotto il titolo. */
  lead?: React.ReactNode;
  /** Allineamento dell'intestazione (default "start"). */
  align?: "start" | "center";
  /** sunken: fascia su surface-sunken per staccare una sezione dalle vicine. */
  tone?: "plain" | "sunken";
  /** Mette i figli in una griglia che va a capo da sola (card da 260px in su). */
  grid?: boolean;
  children?: React.ReactNode;
}

export function Section({ id, eyebrow, title, lead, align = "start", tone = "plain", grid, children }: SectionProps) {
  const headId = React.useId();
  return (
    <section id={id} className={cx("ap-section", tone === "sunken" && "ap-section-sunken", align === "center" && "ap-section-center")} aria-labelledby={title ? headId : undefined}>
      <div className="ap-section-inner">
        {title || eyebrow || lead ? (
          <header className="ap-section-head">
            {eyebrow ? <p className="ap-section-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="ap-section-title" id={headId}>{title}</h2> : null}
            {lead ? <p className="ap-section-lead">{lead}</p> : null}
          </header>
        ) : null}
        {grid ? <div className="ap-section-grid">{children}</div> : children}
      </div>
    </section>
  );
}
