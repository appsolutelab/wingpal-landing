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

/**
 * Applica il tema a <html data-theme>. Con persist (default true) lo ricorda anche nel browser:
 * passa false quando il tema non l'ha scelto la persona (primo caricamento, cambio del sistema operativo),
 * così la pagina continua a seguire il sistema finché qualcuno non sceglie.
 */
export function applyTheme(theme: Theme, storageKey: string = DEFAULT_THEME_KEY, persist: boolean = true): void {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") !== theme) {
    // Per un istante niente transizioni: altrimenti ogni bottone animerebbe le ombre dal tema vecchio al nuovo e lampeggerebbe.
    root.classList.add("ap-theme-switching");
    root.setAttribute("data-theme", theme);
    void root.offsetWidth;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("ap-theme-switching")));
  }
  if (!persist) return;
  try { window.localStorage.setItem(storageKey, theme); } catch { /* niente */ }
}

/**
 * Segue il tema del sistema operativo finché la persona non ne ha scelto uno: quando il sistema cambia
 * e nel browser non c'è un tema salvato, chiama onChange. Restituisce la funzione che smette di ascoltare.
 */
export function followSystemTheme(onChange: (theme: Theme) => void, storageKey: string = DEFAULT_THEME_KEY): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const listener = () => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return;
    } catch { /* storage bloccato: si segue il sistema */ }
    onChange(mq.matches ? "dark" : "light");
  };
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

/** [tema, cambiaTema]: parte dal tema iniziale, segue il sistema finché la persona non sceglie, e ricorda solo ciò che sceglie lei con cambiaTema. */
export function useTheme(storageKey: string = DEFAULT_THEME_KEY): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = React.useState<Theme>(() => getInitialTheme(storageKey));
  React.useEffect(() => { applyTheme(getInitialTheme(storageKey), storageKey, false); }, [storageKey]);
  React.useEffect(() => followSystemTheme((t) => { setThemeState(t); applyTheme(t, storageKey, false); }, storageKey), [storageKey]);
  const setTheme = React.useCallback((t: Theme) => { setThemeState(t); applyTheme(t, storageKey, true); }, [storageKey]);
  return [theme, setTheme];
}
