import * as React from "react";
import { ArrowRightIcon } from "../../icons";
import { Badge } from "../Badge/Badge";

export interface FeatureCardProps {
  /** Un'icona da 20px che usa currentColor (es. da lucide-react). */
  icon?: React.ReactNode;
  /** Nome della funzione, breve: "Calendario", "Note collegate". */
  title: string;
  /** Una o due frasi su cosa fa per la persona. */
  children: React.ReactNode;
  /** Badge accanto al titolo per ciò che non c'è ancora: "In arrivo", "Dopo l'MVP". */
  status?: string;
  /** Link per approfondire. */
  href?: string;
  /** Testo del link (default "Scopri di più"). */
  linkLabel?: string;
  /** Livello del titolo (default 3, sotto l'h2 di una Section). */
  headingLevel?: 2 | 3 | 4;
}

export function FeatureCard({ icon, title, children, status, href, linkLabel = "Scopri di più", headingLevel = 3 }: FeatureCardProps) {
  const H = ("h" + headingLevel) as "h3";
  return (
    <article className="ap-feature">
      {icon ? <span className="ap-feature-icon" aria-hidden="true">{icon}</span> : null}
      <H className="ap-feature-title">
        {title}
        {status ? <Badge>{status}</Badge> : null}
      </H>
      <div className="ap-feature-text">{children}</div>
      {href ? (
        <a className="ap-link ap-feature-link" href={href}>
          {linkLabel}
          <ArrowRightIcon size={16} />
        </a>
      ) : null}
    </article>
  );
}
