import * as React from "react";
import { cx } from "../../utils";

export interface PollCardProps {
  question: string;
  /** Riga sotto la domanda, es. "Proposto da Giulia · chiude venerdì". */
  meta?: string;
  /** Voti degli altri membri, senza il voto dell'utente. */
  options: { label: string; votes: number }[];
  /** Indice dell'opzione votata dall'utente, se c'è. */
  myVote?: number | null;
  onVote?: (index: number | null) => void;
  /** Testi da tradurre per l'inglese. */
  labels?: { mine?: string; vote?: string; votes?: string };
  /** Livello del titolo della domanda (default 3). */
  headingLevel?: 2 | 3 | 4;
}

export function PollCard({ question, meta, options, myVote = null, onVote, labels = {}, headingLevel = 3 }: PollCardProps) {
  const { mine: mineLabel = "(il tuo voto)", vote = "voto", votes = "voti" } = labels;
  const [mine, setMine] = React.useState<number | null>(myVote);
  // Se il voto cambia da fuori (dati ricaricati), la card si allinea.
  React.useEffect(() => { setMine(myVote); }, [myVote]);
  const H = ("h" + headingLevel) as "h3";
  const qId = React.useId();
  const opts = options.map((o, i) => ({ label: o.label, votes: o.votes + (mine === i ? 1 : 0) }));
  const total = opts.reduce((a, o) => a + o.votes, 0) || 1;
  const pick = (i: number) => { const v = mine === i ? null : i; setMine(v); onVote?.(v); };
  return (
    <section className="ap-poll" aria-labelledby={qId}>
      <div>
        <H className="ap-poll-q" id={qId}>{question}</H>
        {meta ? <p className="ap-poll-meta">{meta}</p> : null}
      </div>
      <div className="ap-poll-opts" role="group" aria-labelledby={qId}>
        {opts.map((o, i) => (
          <button key={i} type="button" aria-pressed={mine === i} className={cx("ap-poll-opt", mine === i && "ap-poll-opt-mine")} onClick={() => pick(i)}>
            <span className="ap-poll-bar" style={{ width: Math.round((o.votes / total) * 100) + "%" }} aria-hidden="true" />
            <span>{o.label + (mine === i ? " " + mineLabel : "")}</span>
            <span className="ap-poll-count">{o.votes + " " + (o.votes === 1 ? vote : votes)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
