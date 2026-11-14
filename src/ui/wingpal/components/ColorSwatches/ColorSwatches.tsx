import * as React from "react";
import { cx, calVar, CalendarColor, CALENDAR_COLORS } from "../../utils";
import { CheckIcon } from "../../appsolute";

export interface ColorSwatchesProps {
  /** Colore scelto. Senza value il componente tiene lo stato da solo. */
  value?: CalendarColor;
  defaultValue?: CalendarColor;
  onChange?: (color: CalendarColor) => void;
  /** Nome del gruppo per gli screen reader: "Colore dell'evento". */
  label: string;
  /** Nomi dei colori da tradurre (default in italiano). */
  names?: Partial<Record<CalendarColor, string>>;
  className?: string;
}

const NAMES: Record<CalendarColor, string> = { graphite: "Grafite", sky: "Azzurro", coral: "Corallo", plum: "Prugna", moss: "Muschio" };

/** Scelta del colore di un evento, di un calendario o di un'etichetta tra i cinque colori cal-*. */
export function ColorSwatches({ value, defaultValue = "graphite", onChange, label, names = {}, className }: ColorSwatchesProps) {
  const [inner, setInner] = React.useState<CalendarColor>(defaultValue);
  const current = value ?? inner;
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const n = CALENDAR_COLORS.length;
  const select = (i: number, focus = false) => {
    const c = CALENDAR_COLORS[(i + n) % n];
    setInner(c);
    if (c !== current) onChange?.(c);
    if (focus) refs.current[(i + n) % n]?.focus();
  };
  const index = CALENDAR_COLORS.indexOf(current);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(index - 1, true); }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(index + 1, true); }
  };
  return (
    <div className={cx("ap-swatches", className)} role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      {CALENDAR_COLORS.map((c, i) => {
        const name = names[c] ?? NAMES[c];
        return (
          <button key={c} ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={c === current} aria-label={name} title={name} tabIndex={c === current ? 0 : -1} className="ap-swatch" style={{ ["--cal" as string]: calVar(c) } as React.CSSProperties} onClick={() => select(i)}>
            {c === current ? <CheckIcon size={14} /> : null}
          </button>
        );
      })}
    </div>
  );
}
