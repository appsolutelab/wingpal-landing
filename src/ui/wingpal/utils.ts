export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export type CalendarColor = "graphite" | "sky" | "coral" | "plum" | "moss";

const CAL: Record<CalendarColor, string> = {
  graphite: "--cal-graphite",
  sky: "--cal-sky",
  coral: "--cal-coral",
  plum: "--cal-plum",
  moss: "--cal-moss",
};

/** Colore di un calendario come valore CSS, es. "var(--cal-sky)". */
export function calVar(c?: CalendarColor): string {
  return "var(" + (CAL[c ?? "graphite"] ?? CAL.graphite) + ")";
}

export const CALENDAR_COLORS: CalendarColor[] = ["graphite", "sky", "coral", "plum", "moss"];

/** Data locale come "2026-11-14": il formato che i componenti del calendario usano per i giorni. */
export function isoDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

/** "2026-11-14" → Date a mezzanotte locale. */
export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** "14:30" → minuti da mezzanotte. */
export function minutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** Un evento come lo leggono MonthGrid e DayGrid. Gli orari sono locali, già nel fuso in cui vanno mostrati. */
export interface CalendarEvent {
  id: string;
  /** Giorno dell'evento: "2026-11-14". */
  date: string;
  title: string;
  /** Ora di inizio "14:30". Senza, l'evento dura tutto il giorno. */
  start?: string;
  /** Ora di fine "16:00". */
  end?: string;
  place?: string;
  color?: CalendarColor;
}
