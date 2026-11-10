import * as React from "react";
import { CodeIcon, ArrowRightIcon } from "../../icons";

export interface RepoCardProps {
  /** Nome del repository come su GitHub: "appsolute/nome-progetto". */
  name: string;
  /** Indirizzo del repository. */
  href: string;
  /** Una frase su cosa c'è nel codice. */
  description?: string;
  /** Licenza, es. "AGPL-3.0". */
  license?: string;
  /** Altre informazioni brevi: linguaggi, "Issue aperte a tutti". */
  meta?: string[];
  /** Invito all'azione in fondo (default "Vedi il codice su GitHub"). */
  linkLabel?: string;
}

export function RepoCard({ name, href, description, license, meta = [], linkLabel = "Vedi il codice su GitHub" }: RepoCardProps) {
  const items = license ? [license, ...meta] : meta;
  return (
    <a className="ap-repo" href={href}>
      <span className="ap-repo-top">
        <span className="ap-repo-icon" aria-hidden="true"><CodeIcon /></span>
        <span className="ap-repo-name">{name}</span>
      </span>
      {description ? <span className="ap-repo-desc">{description}</span> : null}
      {items.length ? (
        <span className="ap-repo-meta">
          {items.map((m) => <span key={m} className="ap-repo-chip">{m}</span>)}
        </span>
      ) : null}
      <span className="ap-repo-cta">{linkLabel}<ArrowRightIcon size={16} /></span>
    </a>
  );
}
