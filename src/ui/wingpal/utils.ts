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
