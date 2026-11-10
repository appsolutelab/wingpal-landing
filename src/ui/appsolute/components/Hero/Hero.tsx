import * as React from "react";
import { cx } from "../../utils";

export interface HeroProps {
  /** Riga breve sopra il titolo, in maiuscolo: "Gratis e open source". */
  eyebrow?: React.ReactNode;
  /** Il titolo della pagina: diventa l'unico <h1>. */
  title: React.ReactNode;
  /** Una o due frasi che dicono cosa fa l'app. */
  lead?: React.ReactNode;
  /** Uno o due Button con href: il primo primary ("Scarica"), il secondo secondary ("Vedi il codice"). */
  actions?: React.ReactNode;
  /** Riga piccola sotto i bottoni: licenza, piattaforme, "Niente pubblicità". */
  note?: React.ReactNode;
  /** Immagine o anteprima dell'app a destra (sotto, su telefono). */
  media?: React.ReactNode;
}

export function Hero({ eyebrow, title, lead, actions, note, media }: HeroProps) {
  return (
    <section className={cx("ap-hero", media != null && "ap-hero-has-media")}>
      <div className="ap-hero-text">
        {eyebrow ? <p className="ap-hero-eyebrow">{eyebrow}</p> : null}
        <h1 className="ap-hero-title">{title}</h1>
        {lead ? <p className="ap-hero-lead">{lead}</p> : null}
        {actions ? <div className="ap-hero-actions">{actions}</div> : null}
        {note ? <p className="ap-hero-note">{note}</p> : null}
      </div>
      {media != null ? <div className="ap-hero-media">{media}</div> : null}
    </section>
  );
}
