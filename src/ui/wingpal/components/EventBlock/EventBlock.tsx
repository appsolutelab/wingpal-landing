import * as React from "react";
import { cx, calVar, CalendarColor } from "../../utils";

export interface EventBlockProps {
  title: string;
  /** Orario già formattato, es. "14:30–16:00". */
  time?: string;
  place?: string;
  color?: CalendarColor;
  /** Una riga sola, per eventi brevi o la vista mese. */
  compact?: boolean;
  /** Altezza in px nella griglia oraria (48px = 1 ora). */
  height?: number;
}

export function EventBlock({ title, time, place, color, compact, height }: EventBlockProps) {
  const style = { ["--cal" as string]: calVar(color), ...(height ? { height } : null) } as React.CSSProperties;
  return (
    <div className={cx("ap-event", compact && "ap-event-compact")} style={style}>
      <span className="ap-event-title">{title}</span>
      {time || place ? <span className="ap-event-time">{[time, place].filter(Boolean).join(" · ")}</span> : null}
    </div>
  );
}
