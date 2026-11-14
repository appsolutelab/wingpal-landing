import * as React from "react";
import { cx, CalendarColor } from "../../utils";
import { Tag } from "../Tag/Tag";

export interface TaskItemProps {
  title: string;
  /** Scadenza già formattata, es. "Domani · 08:00". */
  due?: string;
  /** Scadenza superata: mostra "In ritardo" in danger. */
  late?: boolean;
  done?: boolean;
  tag?: string;
  tagColor?: CalendarColor;
  onToggle?: (done: boolean) => void;
  /** Con onOpen il titolo diventa un bottone che apre l'attività (scadenza, etichetta, collegamenti). */
  onOpen?: () => void;
  /** I collegamenti dell'attività, come LinkChip: la nota o l'evento da cui è nata. */
  links?: React.ReactNode;
  /** Testi per l'accessibilità e il ritardo, da tradurre per l'inglese. */
  labels?: { markDone?: string; markTodo?: string; late?: string };
}

function Check() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function TaskItem({ title, due, late, done: initialDone = false, tag, tagColor, onToggle, onOpen, links, labels = {} }: TaskItemProps) {
  const { markDone = "Segna come fatta", markTodo = "Segna come da fare", late: lateLabel = "In ritardo" } = labels;
  const [done, setDone] = React.useState(initialDone);
  const [justDone, setJustDone] = React.useState(false);
  // Se done cambia da fuori (dati ricaricati, un'altra vista), la riga si allinea senza animazione.
  React.useEffect(() => { setDone(initialDone); }, [initialDone]);
  const toggle = () => {
    const v = !done;
    setDone(v);
    setJustDone(v);
    onToggle?.(v);
  };
  const isLate = late && !done;
  return (
    <div className={cx("ap-task", done && "ap-task-done", justDone && "ap-just-done")} onAnimationEnd={(e) => { if (e.target === e.currentTarget) setJustDone(false); }}>
      <button type="button" className="ap-check" role="checkbox" aria-checked={done} aria-label={(done ? markTodo : markDone) + ": " + title} onClick={toggle}>
        {done ? <Check /> : null}
      </button>
      <div className="ap-task-body">
        <span className="ap-task-title">
          {onOpen ? (
            <button type="button" className="ap-task-open" onClick={onOpen}><span className="ap-task-title-text">{title}</span></button>
          ) : (
            <span className="ap-task-title-text">{title}</span>
          )}
        </span>
        {due || tag ? (
          <span className="ap-task-meta">
            {due ? <span className={isLate ? "ap-task-late" : undefined}>{isLate ? lateLabel + " · " + due : due}</span> : null}
            {tag ? <Tag color={tagColor}>{tag}</Tag> : null}
          </span>
        ) : null}
        {links ? <div className="ap-task-links">{links}</div> : null}
      </div>
    </div>
  );
}
