import * as React from "react";
import { cx } from "../../utils";

export interface TeamCardProps {
  /** Nome e cognome. */
  name: string;
  /** Di cosa si occupa: "Interfaccia e design system". */
  role?: React.ReactNode;
  /** Foto o avatar (un <img> quadrato). Senza, si vedono le iniziali. */
  avatar?: React.ReactNode;
  /** Link facoltativo sotto il ruolo, es. al profilo GitHub. */
  href?: string;
  /** Testo del link, es. "@nome su GitHub". */
  linkLabel?: string;
  /** compact: una riga, per elenchi e footer. */
  compact?: boolean;
}

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/** Una persona del gruppo: avatar tondo, nome e ruolo. Mettine più di una in una Section con grid. */
export function TeamCard({ name, role, avatar, href, linkLabel, compact }: TeamCardProps) {
  return (
    <div className={cx("ap-team", compact && "ap-team-compact")}>
      <span className="ap-team-avatar" aria-hidden="true">{avatar ?? initials(name)}</span>
      <div className="ap-team-body">
        <span className="ap-team-name">{name}</span>
        {role ? <span className="ap-team-role">{role}</span> : null}
        {href ? <a className="ap-link ap-team-link" href={href}>{linkLabel ?? href}</a> : null}
      </div>
    </div>
  );
}
