import * as React from "react";
import { cx } from "../../utils";

export interface SwitchOption {
  /** Valore dell'opzione, es. "dark" o "en". */
  value: string;
  /** Nome per esteso, letto dagli screen reader e mostrato come suggerimento: "Tema scuro", "English". */
  name: string;
  /** Contenuto visibile: un'icona da 18px che usa currentColor, oppure una sigla di due o tre lettere ("IT"). */
  content: React.ReactNode;
  /** Lingua del nome, se diversa da quella della pagina (es. "en" per "English"). */
  lang?: string;
}

export interface SwitchProps {
  /** Le due posizioni: la prima a sinistra, la seconda a destra. */
  options: [SwitchOption, SwitchOption];
  /** Opzione attiva. Senza value il componente tiene lo stato da solo, partendo da defaultValue. */
  value?: string;
  /** Opzione iniziale quando non c'è value (default la prima). */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Nome del gruppo per gli screen reader: "Tema", "Lingua". */
  label: string;
  className?: string;
}

/**
 * Selettore a due posizioni: un binario scavato con un pomello che scorre sull'opzione attiva.
 * Lo stesso componente fa da cambio tema, cambio lingua o qualsiasi scelta tra due cose:
 * cambiano solo le opzioni (icona o sigla) e cosa fa onChange.
 */
export function Switch({ options, value, defaultValue, onChange, label, className }: SwitchProps) {
  const [inner, setInner] = React.useState(defaultValue ?? options[0].value);
  const current = value ?? inner;
  const index = options[1].value === current ? 1 : 0;
  const refs = [React.useRef<HTMLButtonElement>(null), React.useRef<HTMLButtonElement>(null)];
  const select = (i: number, focus = false) => {
    setInner(options[i].value);
    if (options[i].value !== current) onChange?.(options[i].value);
    if (focus) refs[i].current?.focus();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(0, true); }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(1, true); }
  };
  return (
    <div className={cx("ap-switch", index === 1 && "ap-switch-second", className)} role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      <span className="ap-switch-knob" aria-hidden="true" />
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={refs[i]}
          type="button"
          role="radio"
          aria-checked={i === index}
          aria-label={o.name}
          lang={o.lang}
          title={o.name}
          tabIndex={i === index ? 0 : -1}
          className={cx("ap-switch-opt", i === index && "ap-switch-opt-on")}
          // Toccare l'opzione già attiva passa all'altra: con due posizioni ci si aspetta che il click la giri.
          onClick={() => select(i === index ? 1 - i : i)}
        >
          {o.content}
        </button>
      ))}
    </div>
  );
}
