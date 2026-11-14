import * as React from "react";
import { cx } from "../../utils";
import { CloseIcon } from "../../appsolute";
import { CalendarIcon, NoteIcon, TaskIcon } from "../../icons";

export type LinkKind = "event" | "note" | "task";

export interface LinkChipProps {
  /** Cosa c'è dall'altra parte del collegamento. */
  kind: LinkKind;
  /** Titolo dell'evento, della nota o dell'attività collegata. */
  title: string;
  /** Dettaglio breve: l'orario dell'evento, la scadenza dell'attività. */
  meta?: string;
  /** Apre l'elemento collegato. */
  onOpen?: () => void;
  /** Con onRemove compare la X per togliere il collegamento (non elimina l'elemento). */
  onRemove?: () => void;
  /** Testi da tradurre: il tipo letto dagli screen reader e l'azione della X. */
  labels?: { event?: string; note?: string; task?: string; remove?: string };
  className?: string;
}

const ICONS = { event: CalendarIcon, note: NoteIcon, task: TaskIcon };

/** Il collegamento tra un evento, la sua nota e le attività che ne nascono: una pillola che porta dall'uno all'altro. */
export function LinkChip({ kind, title, meta, onOpen, onRemove, labels = {}, className }: LinkChipProps) {
  const names = { event: labels.event ?? "Evento", note: labels.note ?? "Nota", task: labels.task ?? "Attività" };
  const I = ICONS[kind];
  return (
    <span className={cx("ap-linkchip", className)}>
      <button type="button" className="ap-linkchip-open" onClick={onOpen}>
        <span className="ap-linkchip-icon" aria-hidden="true"><I size={16} /></span>
        <span className="ap-sr-only">{names[kind]}: </span>
        <span className="ap-linkchip-title">{title}</span>
        {meta ? <span className="ap-linkchip-meta">{meta}</span> : null}
      </button>
      {onRemove ? (
        <button type="button" className="ap-linkchip-remove" aria-label={(labels.remove ?? "Togli il collegamento") + ": " + title} onClick={onRemove}>
          <CloseIcon size={14} />
        </button>
      ) : null}
    </span>
  );
}
