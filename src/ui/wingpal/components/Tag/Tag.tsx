import * as React from "react";
import { calVar, CalendarColor } from "../../utils";

export interface TagProps {
  /** Colore del calendario o dell'etichetta. Ignorato se tone="reminder". */
  color?: CalendarColor;
  /** reminder: pillola marigold per i promemoria. */
  tone?: "default" | "reminder";
  children: React.ReactNode;
}

export function Tag({ color, tone = "default", children }: TagProps) {
  if (tone === "reminder") return <span className="ap-tag ap-tag-reminder">{children}</span>;
  return (
    <span className="ap-tag" style={{ ["--tag" as string]: calVar(color) } as React.CSSProperties}>
      <span className="ap-tag-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
