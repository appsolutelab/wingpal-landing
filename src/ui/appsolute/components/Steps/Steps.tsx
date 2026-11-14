import * as React from "react";
import { cx } from "../../utils";
import { CheckIcon } from "../../icons";
import { Badge } from "../Badge/Badge";

export interface Step {
  /** Nome della tappa, breve. */
  title: React.ReactNode;
  /** Una o due frasi. */
  text?: React.ReactNode;
  /** done: fatta (spunta). current: in corso (numero pieno). todo: da fare (default). */
  state?: "done" | "current" | "todo";
  /** Parola che dice lo stato, in un Badge: "Fatto", "In corso", "In programma". Mettila sempre quando usi state. */
  status?: string;
}

export interface StepsProps {
  items: Step[];
  /** list: una sotto l'altra con la linea che le unisce (default). grid: card affiancate che vanno a capo. */
  layout?: "list" | "grid";
  /** Livello dei titoli (default 3). */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

/** Elenco numerato di tappe: una roadmap, i passi di un'installazione, "come funziona". L'ordine conta: è un <ol>. */
export function Steps({ items, layout = "list", headingLevel = 3, className }: StepsProps) {
  const H = ("h" + headingLevel) as "h3";
  return (
    <ol className={cx("ap-steps", "ap-steps-" + layout, className)} role="list">
      {items.map((s, i) => {
        const state = s.state ?? "todo";
        return (
          <li key={i} className={cx("ap-step", "ap-step-" + state)} aria-current={state === "current" ? "step" : undefined}>
            <span className="ap-step-n" aria-hidden="true">{state === "done" ? <CheckIcon size={16} /> : i + 1}</span>
            <div className="ap-step-body">
              <H className="ap-step-title">
                {s.title}
                {s.status ? <Badge tone={state === "current" ? "accent" : "neutral"}>{s.status}</Badge> : null}
              </H>
              {s.text ? <div className="ap-step-text">{s.text}</div> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
