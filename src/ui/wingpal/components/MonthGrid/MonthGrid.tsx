import * as React from "react";
import { cx, isoDate, CalendarEvent } from "../../utils";
import { EventBlock } from "../EventBlock/EventBlock";

export interface MonthGridProps {
  /** Anno, es. 2026. */
  year: number;
  /** Mese da 0 (gennaio) a 11 (dicembre), come in Date. */
  month: number;
  /** Gli eventi da mostrare: bastano quelli del mese e dei giorni vicini. */
  events?: CalendarEvent[];
  /** Il giorno di oggi "2026-11-14": il suo numero è pieno di marigold. */
  today?: string;
  /** Il giorno selezionato: sfondo accent-soft. */
  selected?: string;
  onSelectDay?: (date: string) => void;
  onSelectEvent?: (id: string) => void;
  /** Quanti eventi mostrare per giorno prima di "Altri n" (default 3). */
  maxPerDay?: number;
  /** Lingua di giorni e date (default "it"). */
  locale?: string;
  /** Testi da tradurre. In more, {n} è il numero di eventi nascosti. */
  labels?: { more?: string; today?: string };
  className?: string;
}

/** La vista mese: sei righe al massimo, settimana che inizia di lunedì, eventi come EventBlock compatti. */
export function MonthGrid({ year, month, events = [], today, selected, onSelectDay, onSelectEvent, maxPerDay = 3, locale = "it", labels = {}, className }: MonthGridProps) {
  const { more = "Altri {n}", today: todayLabel = "oggi" } = labels;
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // lunedì = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows = Math.ceil((offset + daysInMonth) / 7);
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const fullFmt = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" });
  const titleFmt = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const weekdays = Array.from({ length: 7 }, (_, i) => weekdayFmt.format(new Date(2024, 0, 1 + i)).replace(".", "")); // 1 gen 2024 è lunedì
  const byDay = new Map<string, CalendarEvent[]>();
  for (const e of events) byDay.set(e.date, [...(byDay.get(e.date) ?? []), e]);
  for (const list of byDay.values()) list.sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));

  return (
    <div className={cx("ap-month", className)} role="grid" aria-label={titleFmt.format(first)}>
      <div className="ap-month-head" role="row">
        {weekdays.map((w) => <span key={w} className="ap-month-weekday" role="columnheader">{w}</span>)}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="ap-month-week" role="row">
          {Array.from({ length: 7 }, (_, c) => {
            const day = new Date(year, month, 1 - offset + r * 7 + c);
            const iso = isoDate(day);
            const list = byDay.get(iso) ?? [];
            const shown = list.length > maxPerDay ? list.slice(0, maxPerDay - 1) : list;
            const hidden = list.length - shown.length;
            const isToday = iso === today;
            return (
              <div key={iso} role="gridcell" aria-selected={iso === selected} className={cx("ap-month-day", day.getMonth() !== month && "ap-month-day-out", iso === selected && "ap-month-day-selected")}>
                <button type="button" className={cx("ap-month-num", isToday && "ap-month-num-today")} aria-label={fullFmt.format(day) + (isToday ? ", " + todayLabel : "")} aria-current={isToday ? "date" : undefined} onClick={() => onSelectDay?.(iso)}>
                  {day.getDate()}
                </button>
                {shown.map((e) => (
                  <button key={e.id} type="button" className="ap-month-event" aria-label={e.title + (e.start ? ", " + e.start : "")} onClick={() => onSelectEvent?.(e.id)}>
                    <EventBlock compact title={e.title} time={e.start} color={e.color} />
                  </button>
                ))}
                {hidden > 0 ? <button type="button" className="ap-month-more" onClick={() => onSelectDay?.(iso)}>{more.replace("{n}", String(hidden))}</button> : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
