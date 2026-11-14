import * as React from "react";
import { cx } from "../../utils";

export interface BadgeProps {
  /** neutral: informazione (default). accent: la cosa più importante della riga, es. la versione attuale. success / danger: uno stato, sempre con una parola. */
  tone?: "neutral" | "accent" | "success" | "danger";
  /** Un'icona da 14px che usa currentColor, prima del testo. */
  icon?: React.ReactNode;
  /** Una o due parole: "In sviluppo", "v0.1.0", "AGPL-3.0". */
  children: React.ReactNode;
  className?: string;
}

/** Pillola piccola per stati, versioni e licenze. Non è cliccabile. */
export function Badge({ tone = "neutral", icon, children, className }: BadgeProps) {
  return (
    <span className={cx("ap-badge", tone !== "neutral" && "ap-badge-" + tone, className)}>
      {icon ? <span className="ap-badge-icon" aria-hidden="true">{icon}</span> : null}
      {children}
    </span>
  );
}
