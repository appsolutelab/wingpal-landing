import * as React from "react";
import { cx } from "../../utils";

export interface SegmentedOption {
  /** Valore dell'opzione, es. "week". */
  value: string;
  /** Testo visibile, una parola: "Settimana". */
  label: React.ReactNode;
  /** Icona da 18px prima del testo, facoltativa. */
  icon?: React.ReactNode;
}

export interface SegmentedProps {
  /** Da due a cinque opzioni, tutte visibili. */
  options: SegmentedOption[];
  /** Opzione attiva. Senza value il componente tiene lo stato da solo, partendo da defaultValue. */
  value?: string;
  /** Opzione iniziale quando non c'è value (default la prima). */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Nome del gruppo per gli screen reader: "Vista del calendario". */
  label: string;
  size?: "md" | "sm";
  className?: string;
}

/**
 * Scelta tra poche opzioni con un nome (Mese / Settimana / Giorno): binario scavato e pomello accent che scorre.
 * Per due opzioni con sole icone o sigle usa Switch.
 */
export function Segmented({ options, value, defaultValue, onChange, label, size = "md", className }: SegmentedProps) {
  const [inner, setInner] = React.useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const index = Math.max(0, options.findIndex((o) => o.value === current));
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const select = (i: number, focus = false) => {
    const o = options[(i + options.length) % options.length];
    setInner(o.value);
    if (o.value !== current) onChange?.(o.value);
    if (focus) refs.current[(i + options.length) % options.length]?.focus();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(index - 1, true); }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(index + 1, true); }
  };
  const style = { ["--ap-seg-n" as string]: options.length, ["--ap-seg-i" as string]: index } as React.CSSProperties;
  return (
    <div className={cx("ap-seg", size === "sm" && "ap-seg-sm", className)} style={style} role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      <span className="ap-seg-knob" aria-hidden="true" />
      {options.map((o, i) => (
        <button key={o.value} ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={i === index} tabIndex={i === index ? 0 : -1} className={cx("ap-seg-opt", i === index && "ap-seg-opt-on")} onClick={() => select(i)}>
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
