import * as React from "react";
import { cx } from "../../utils";
import { InfoIcon, AlertIcon, CircleCheckIcon } from "../../icons";

export interface CalloutProps {
  /** info: avviso neutro (default). success: è andata bene. danger: errore o perdita di dati. */
  tone?: "info" | "success" | "danger";
  /** Cosa è successo, in poche parole. */
  title?: React.ReactNode;
  /** Una o due frasi: cosa significa e cosa fare. */
  children?: React.ReactNode;
  /** Un bottone o un link a destra (sotto, su schermi stretti). */
  action?: React.ReactNode;
  /** Icona al posto di quella del tono (20px, currentColor). */
  icon?: React.ReactNode;
  /** Ruolo ARIA: "status" per un avviso che compare da solo, "alert" per un errore urgente. Senza role è testo normale. */
  role?: "status" | "alert";
  className?: string;
}

/** Avviso dentro la pagina: "In sviluppo", "Copia di sicurezza creata", "Non salvato". Non galleggia e non sparisce da solo. */
export function Callout({ tone = "info", title, children, action, icon, role, className }: CalloutProps) {
  const I = tone === "danger" ? AlertIcon : tone === "success" ? CircleCheckIcon : InfoIcon;
  return (
    <div className={cx("ap-callout", "ap-callout-" + tone, className)} role={role}>
      <span className="ap-callout-icon" aria-hidden="true">{icon ?? <I />}</span>
      <div className="ap-callout-body">
        {title ? <p className="ap-callout-title">{title}</p> : null}
        {children ? <div className="ap-callout-text">{children}</div> : null}
      </div>
      {action ? <div className="ap-callout-action">{action}</div> : null}
    </div>
  );
}
