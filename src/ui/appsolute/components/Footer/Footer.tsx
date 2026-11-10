import * as React from "react";
import { NavLink } from "../../utils";

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FooterProps {
  /** Nome del prodotto. */
  brand: React.ReactNode;
  /** Logo prima del nome, decorativo. */
  logo?: React.ReactNode;
  /** Una frase sotto il nome. */
  tagline?: React.ReactNode;
  /** Colonne di link: Prodotto, Progetto, Community. */
  columns?: FooterColumn[];
  /** Riga finale: licenza, link al codice, "Niente pubblicità, niente tracciamento". */
  bottom?: React.ReactNode;
  /** Nome del gruppo di link per gli screen reader (default "Link del sito"). */
  navLabel?: string;
}

export function Footer({ brand, logo, tagline, columns = [], bottom, navLabel = "Link del sito" }: FooterProps) {
  return (
    <footer className="ap-footer">
      <div className="ap-footer-inner">
        <div className="ap-footer-brand">
          <span className="ap-footer-name">
            {logo ? <span className="ap-footer-logo" aria-hidden="true">{logo}</span> : null}
            {brand}
          </span>
          {tagline ? <p className="ap-footer-tagline">{tagline}</p> : null}
        </div>
        {columns.length ? (
          <nav className="ap-footer-cols" aria-label={navLabel}>
            {columns.map((c) => (
              <div key={c.title} className="ap-footer-col">
                <p className="ap-footer-col-title">{c.title}</p>
                <ul>
                  {c.links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
                </ul>
              </div>
            ))}
          </nav>
        ) : null}
      </div>
      {bottom ? <div className="ap-footer-bottom">{bottom}</div> : null}
    </footer>
  );
}
