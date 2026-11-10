import * as React from "react";

export type Theme = "light" | "dark";

/** Chiave del browser in cui si ricorda il tema. Ogni prodotto può usarne una sua. */
export const DEFAULT_THEME_KEY = "theme";

/** Tema già impostato su <html data-theme>, altrimenti quello salvato, altrimenti quello del sistema operativo. */
export function getInitialTheme(storageKey: string = DEFAULT_THEME_KEY): Theme {
  if (typeof window === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* storage bloccato: si usa il sistema */ }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Applica il tema a <html data-theme> e lo ricorda. */
export function applyTheme(theme: Theme, storageKey: string = DEFAULT_THEME_KEY): void {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") !== theme) {
    // Per un istante niente transizioni: altrimenti ogni bottone animerebbe le ombre dal tema vecchio al nuovo e lampeggerebbe.
    root.classList.add("ap-theme-switching");
    root.setAttribute("data-theme", theme);
    void root.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("ap-theme-switching")));
  }
  try { window.localStorage.setItem(storageKey, theme); } catch { /* niente */ }
}

/** [tema, cambiaTema]: legge il tema iniziale e lo applica a ogni cambio. */
export function useTheme(storageKey: string = DEFAULT_THEME_KEY): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = React.useState<Theme>(() => getInitialTheme(storageKey));
  React.useEffect(() => { applyTheme(theme, storageKey); }, [theme, storageKey]);
  return [theme, setTheme];
}
