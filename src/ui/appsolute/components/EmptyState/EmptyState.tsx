import * as React from "react";
import { cx } from "../../utils";

export interface EmptyStateProps {
  /** Icona da 24px che usa currentColor. */
  icon?: React.ReactNode;
  /** Cosa manca, senza drammi: "Nessuna attività per oggi". */
  title: React.ReactNode;
  /** Una frase su come riempire lo spazio. */
  children?: React.ReactNode;
  /** L'azione per iniziare, di solito un Button. */
  action?: React.ReactNode;
  /** Livello del titolo (default 3). */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

/** Riempie una vista o una card ancora vuota e dice come iniziare. */
export function EmptyState({ icon, title, children, action, headingLevel = 3, className }: EmptyStateProps) {
  const H = ("h" + headingLevel) as "h3";
  return (
    <div className={cx("ap-empty", className)}>
      {icon ? <span className="ap-empty-icon" aria-hidden="true">{icon}</span> : null}
      <H className="ap-empty-title">{title}</H>
      {children ? <div className="ap-empty-text">{children}</div> : null}
      {action ? <div className="ap-empty-action">{action}</div> : null}
    </div>
  );
}
