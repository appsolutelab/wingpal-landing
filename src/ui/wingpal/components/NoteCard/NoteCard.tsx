import * as React from "react";
import { cx } from "../../utils";

export interface NoteCardProps {
  /** Titolo della nota (la prima riga). */
  title: string;
  /** Inizio del testo, senza i simboli del Markdown: ne mostra due righe. */
  excerpt?: string;
  /** Ultima modifica già formattata: "Oggi · 15:10". */
  updated?: string;
  /** I collegamenti della nota, come LinkChip. Stanno fuori dal bottone, quindi restano cliccabili. */
  links?: React.ReactNode;
  /** La nota aperta nell'editor: sfondo accent-soft. */
  active?: boolean;
  onOpen?: () => void;
  /** Livello del titolo (default 3). */
  headingLevel?: 2 | 3 | 4;
}

/** Una nota nell'elenco: titolo, due righe di testo, data e collegamenti. */
export function NoteCard({ title, excerpt, updated, links, active, onOpen, headingLevel = 3 }: NoteCardProps) {
  const H = ("h" + headingLevel) as "h3";
  return (
    <article className={cx("ap-note", active && "ap-note-active")}>
      <H className="ap-note-title">
        <button type="button" className="ap-note-open" aria-current={active ? "true" : undefined} onClick={onOpen}>{title}</button>
      </H>
      {excerpt ? <p className="ap-note-excerpt">{excerpt}</p> : null}
      {updated ? <p className="ap-note-updated">{updated}</p> : null}
      {links ? <div className="ap-note-links">{links}</div> : null}
    </article>
  );
}
