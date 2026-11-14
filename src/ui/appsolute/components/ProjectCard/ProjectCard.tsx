import * as React from "react";
import { ArrowRightIcon } from "../../icons";
import { Badge } from "../Badge/Badge";

export interface ProjectCardProps {
  /** Nome del prodotto: "WingPal". */
  name: string;
  /** Indirizzo della sua pagina. */
  href: string;
  /** Logo del prodotto, 48px (un <img> o un elemento con maschera). Senza logo si vede l'iniziale. */
  logo?: React.ReactNode;
  /** Una frase su cosa fa. */
  description?: React.ReactNode;
  /** Stato in un Badge: "In sviluppo", "Disponibile". */
  status?: string;
  /** Informazioni brevi: "Desktop", "Open source". */
  meta?: string[];
  /** Invito in fondo (default "Vai al progetto"). */
  linkLabel?: string;
  /** Livello del titolo (default 3). */
  headingLevel?: 2 | 3 | 4;
}

/** Card di un prodotto nella pagina di appsolute: tutta la card è un link alla landing del prodotto. */
export function ProjectCard({ name, href, logo, description, status, meta = [], linkLabel = "Vai al progetto", headingLevel = 3 }: ProjectCardProps) {
  const H = ("h" + headingLevel) as "h3";
  return (
    <a className="ap-project" href={href}>
      <span className="ap-project-top">
        <span className="ap-project-logo" aria-hidden="true">{logo ?? name.slice(0, 1)}</span>
        <H className="ap-project-name">{name}</H>
        {status ? <Badge>{status}</Badge> : null}
      </span>
      {description ? <span className="ap-project-desc">{description}</span> : null}
      {meta.length ? <span className="ap-project-meta">{meta.map((m) => <Badge key={m}>{m}</Badge>)}</span> : null}
      <span className="ap-project-cta">{linkLabel}<ArrowRightIcon size={16} /></span>
    </a>
  );
}
