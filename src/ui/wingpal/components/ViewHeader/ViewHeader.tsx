import * as React from "react";
import { cx } from "../../utils";
import { Button, IconButton, Segmented, SegmentedOption } from "../../appsolute";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";

export interface ViewHeaderProps {
  /** Titolo della vista: "Novembre 2026", "Attività", il titolo di una nota. È l'<h1> della finestra. */
  title: React.ReactNode;
  /** Riga piccola sotto il titolo: "Settimana 46", "3 da fare oggi". */
  subtitle?: React.ReactNode;
  /** Con onPrev e onNext compaiono le frecce per spostarsi nel tempo. */
  onPrev?: () => void;
  onNext?: () => void;
  /** Con onToday compare il bottone "Oggi". */
  onToday?: () => void;
  /** Le viste tra cui scegliere, es. Mese / Settimana / Giorno. */
  views?: SegmentedOption[];
  /** Vista attiva. */
  view?: string;
  onViewChange?: (view: string) => void;
  /** A destra: l'azione principale della vista ("Nuovo evento") e, se serve, la ricerca. */
  actions?: React.ReactNode;
  /** Testi da tradurre. */
  labels?: { prev?: string; next?: string; today?: string; views?: string };
  className?: string;
}

/** Intestazione di ogni vista dell'app: titolo, navigazione nel tempo, cambio vista e azione principale. */
export function ViewHeader({ title, subtitle, onPrev, onNext, onToday, views, view, onViewChange, actions, labels = {}, className }: ViewHeaderProps) {
  const { prev = "Precedente", next = "Successivo", today = "Oggi", views: viewsLabel = "Vista" } = labels;
  return (
    <header className={cx("ap-viewhead", className)}>
      <div className="ap-viewhead-title">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {onPrev || onNext || onToday ? (
        <div className="ap-viewhead-nav">
          {onPrev ? <IconButton size="sm" label={prev} icon={<ChevronLeftIcon />} onClick={onPrev} /> : null}
          {onToday ? <Button size="sm" onClick={onToday}>{today}</Button> : null}
          {onNext ? <IconButton size="sm" label={next} icon={<ChevronRightIcon />} onClick={onNext} /> : null}
        </div>
      ) : null}
      <div className="ap-viewhead-end">
        {views ? <Segmented size="sm" label={viewsLabel} options={views} value={view} onChange={onViewChange} /> : null}
        {actions}
      </div>
    </header>
  );
}
