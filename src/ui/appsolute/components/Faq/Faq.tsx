import * as React from "react";
import { cx } from "../../utils";
import { ChevronDownIcon } from "../../icons";

export interface FaqItem {
  /** La domanda, come la farebbe una persona: "È davvero gratis?". */
  question: string;
  /** La risposta: una o due frasi, o più paragrafi <p>. */
  answer: React.ReactNode;
  /** Aperta al caricamento. */
  open?: boolean;
}

export interface FaqProps {
  items: FaqItem[];
  /** Con un nome comune se ne apre una alla volta (attributo name di <details>). */
  name?: string;
  className?: string;
}

/** Domande e risposte che si aprono una per una. Usa <details>: funziona senza JavaScript e il testo resta trovabile con la ricerca nella pagina. */
export function Faq({ items, name, className }: FaqProps) {
  return (
    <div className={cx("ap-faq", className)}>
      {items.map((it) => (
        // "name" su <details> è recente: React 18 non lo conosce nei tipi, quindi passa come attributo libero.
        <details key={it.question} className="ap-faq-item" open={it.open} {...(name ? { name } : null)}>
          <summary className="ap-faq-q">
            <span>{it.question}</span>
            <span className="ap-faq-chevron" aria-hidden="true"><ChevronDownIcon /></span>
          </summary>
          <div className="ap-faq-a">{it.answer}</div>
        </details>
      ))}
    </div>
  );
}
