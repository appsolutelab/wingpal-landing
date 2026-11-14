import * as React from "react";
import { cx, parseIsoDate, minutes, CalendarEvent } from "../../utils";
import { EventBlock } from "../EventBlock/EventBlock";

export interface DayGridProps {
  /** I giorni in colonna, come "2026-11-14": uno per la vista giorno, sette per la settimana. */
  days: string[];
  /** Gli eventi di quei giorni. Quelli senza start vanno nella riga "Tutto il giorno". */
  events?: CalendarEvent[];
  /** Prima ora mostrata (default 7). */
  startHour?: number;
  /** Ultima ora mostrata, esclusa (default 21). */
  endHour?: number;
  /** Il giorno di oggi: il suo numero è pieno di marigold. */
  today?: string;
  /** L'ora attuale "15:10": disegna la linea dell'ora attuale nella colonna di oggi. */
  now?: string;
  onSelectEvent?: (id: string) => void;
  onSelectDay?: (date: string) => void;
  /** Lingua di giorni e date (default "it"). */
  locale?: string;
  /** Testi da tradurre. */
  labels?: { allDay?: string; today?: string; now?: string };
  className?: string;
}

const HOUR = 48; // px: mezz'ora = space-6
type Placed = { e: CalendarEvent; s: number; f: number; col: number; cols: number };

/* Eventi che si sovrappongono: si dividono la larghezza della colonna, affiancati. */
function place(list: CalendarEvent[]): Placed[] {
  const items = list.map((e) => { const s = minutes(e.start!); return { e, s, f: Math.max(e.end ? minutes(e.end) : s + 60, s + 30), col: 0, cols: 1 }; }).sort((a, b) => a.s - b.s || b.f - a.f);
  let cluster: Placed[] = [], clusterEnd = -1;
  const close = () => { const n = Math.max(0, ...cluster.map((p) => p.col)) + 1; cluster.forEach((p) => { p.cols = n; }); cluster = []; };
  for (const p of items) {
    if (cluster.length && p.s >= clusterEnd) close();
    const used = new Set(cluster.filter((q) => q.f > p.s).map((q) => q.col));
    while (used.has(p.col)) p.col++;
    cluster.push(p);
    clusterEnd = Math.max(clusterEnd, p.f);
  }
  close();
  return items;
}

/** La griglia oraria delle viste giorno e settimana: un'ora è alta 48px, gli eventi sono EventBlock alti quanto durano. */
export function DayGrid({ days, events = [], startHour = 7, endHour = 21, today, now, onSelectEvent, onSelectDay, locale = "it", labels = {}, className }: DayGridProps) {
  const { allDay = "Tutto il giorno", today: todayLabel = "oggi", now: nowLabel = "Adesso" } = labels;
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const fullFmt = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" });
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
  const cols = { gridTemplateColumns: "56px repeat(" + days.length + ", minmax(0, 1fr))" };
  const top = (min: number) => ((min - startHour * 60) / 60) * HOUR;
  const whole = events.filter((e) => !e.start);
  const nowMin = now ? minutes(now) : -1;
  const showNow = nowMin >= startHour * 60 && nowMin <= endHour * 60;

  return (
    <div className={cx("ap-daygrid", className)}>
      <div className="ap-daygrid-head" style={cols}>
        <span />
        {days.map((d) => {
          const date = parseIsoDate(d);
          const isToday = d === today;
          return (
            <button key={d} type="button" className="ap-daygrid-dayhead" aria-label={fullFmt.format(date) + (isToday ? ", " + todayLabel : "")} aria-current={isToday ? "date" : undefined} onClick={() => onSelectDay?.(d)}>
              <span className="ap-daygrid-weekday">{weekdayFmt.format(date).replace(".", "")}</span>
              <span className={cx("ap-daygrid-num", isToday && "ap-daygrid-num-today")}>{date.getDate()}</span>
            </button>
          );
        })}
      </div>
      {whole.length ? (
        <div className="ap-daygrid-allday" style={cols}>
          <span className="ap-daygrid-hour">{allDay}</span>
          {days.map((d) => (
            <div key={d} className="ap-daygrid-alldaycol">
              {whole.filter((e) => e.date === d).map((e) => (
                <button key={e.id} type="button" className="ap-daygrid-wholeevent" onClick={() => onSelectEvent?.(e.id)}><EventBlock compact title={e.title} color={e.color} /></button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      <div className="ap-daygrid-body" style={{ ...cols, height: hours.length * HOUR }}>
        <div className="ap-daygrid-hours" aria-hidden="true">
          {hours.map((h, i) => <span key={h} className="ap-daygrid-hour" style={{ top: i * HOUR }}>{String(h).padStart(2, "0")}:00</span>)}
        </div>
        {days.map((d) => (
          <div key={d} className="ap-daygrid-col" role="group" aria-label={fullFmt.format(parseIsoDate(d))}>
            {place(events.filter((e) => e.date === d && e.start)).map(({ e, s, f, col, cols: n }) => {
              const from = Math.max(s, startHour * 60), to = Math.min(f, endHour * 60);
              if (to <= from) return null;
              const time = e.start + (e.end ? "–" + e.end : "");
              const h = ((to - from) / 60) * HOUR - 4;
              return (
                <button key={e.id} type="button" className="ap-daygrid-event" style={{ top: top(from) + 2, height: h, left: (col / n) * 100 + "%", width: 100 / n + "%" }} aria-label={e.title + ", " + time + (e.place ? ", " + e.place : "")} onClick={() => onSelectEvent?.(e.id)}>
                  <EventBlock compact={h < 60} title={e.title} time={time} place={h < 60 ? undefined : e.place} color={e.color} />
                </button>
              );
            })}
            {showNow && d === today ? (
              <div className="ap-daygrid-now" style={{ top: top(nowMin) }}><span className="ap-sr-only">{nowLabel}, {now}</span></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
