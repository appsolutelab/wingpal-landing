import * as React from "react";
import { cx } from "../../utils";
import { CloseIcon, IconButton } from "../../appsolute";
import { BellIcon } from "../../icons";

export interface ReminderProps {
  /** Di cosa si tratta: il titolo dell'evento o dell'attività. */
  title: string;
  /** Quando: "Tra 10 minuti · 14:30", "Scade oggi alle 18:00". */
  time?: string;
  /** Bottoni piccoli: "Posticipa", "Apri". Al massimo due. */
  actions?: React.ReactNode;
  /** Con onDismiss compare la X. */
  onDismiss?: () => void;
  /** Testi da tradurre. */
  labels?: { kind?: string; dismiss?: string };
  className?: string;
}

/** Il promemoria dentro l'app, quando arriva l'ora di un evento o di una scadenza. Accompagna la notifica del sistema, non la sostituisce. */
export function Reminder({ title, time, actions, onDismiss, labels = {}, className }: ReminderProps) {
  const { kind = "Promemoria", dismiss = "Chiudi il promemoria" } = labels;
  return (
    <div className={cx("ap-reminder", className)} role="status">
      <span className="ap-reminder-icon" aria-hidden="true"><BellIcon /></span>
      <div className="ap-reminder-body">
        <span className="ap-reminder-kind">{kind}</span>
        <span className="ap-reminder-title">{title}</span>
        {time ? <span className="ap-reminder-time">{time}</span> : null}
        {actions ? <div className="ap-reminder-actions">{actions}</div> : null}
      </div>
      {onDismiss ? <IconButton variant="ghost" size="sm" label={dismiss} icon={<CloseIcon />} onClick={onDismiss} /> : null}
    </div>
  );
}
