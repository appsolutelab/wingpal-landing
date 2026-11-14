import * as React from "react";
import { cx } from "../../utils";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** raised: esce dallo sfondo (default). sunken: scavata, per contenuti secondari o aree dove si scrive. floating: galleggia sopra la vista, per menu e popover. */
  tone?: "raised" | "sunken" | "floating";
  /** Spazio interno: md = space-4, lg = space-6 (default), none per contenuti che arrivano al bordo. */
  padding?: "none" | "md" | "lg";
  /** Elemento HTML (default "div"). Usa "section" o "article" quando la card ha un titolo. */
  as?: "div" | "section" | "article" | "aside";
  /** Titolo in alto, in stile heading. */
  title?: React.ReactNode;
  /** Controlli a destra del titolo: un bottone ghost, un Badge. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

/** Pannello generico: il contenitore di base di app e landing. Dentro una card i controlli sono in rilievo piccolo o scavati, mai un'altra card in rilievo. */
export function Card({ tone = "raised", padding = "lg", as = "div", title, actions, className, children, ...rest }: CardProps) {
  const El = as as "div";
  return (
    <El {...rest} className={cx("ap-card", "ap-card-" + tone, "ap-card-pad-" + padding, className)}>
      {title || actions ? (
        <div className="ap-card-head">
          {title ? <h3 className="ap-card-title">{title}</h3> : <span />}
          {actions ? <div className="ap-card-actions">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </El>
  );
}
