import * as React from "react";
import { Switch } from "../Switch/Switch";
import { SunIcon, MoonIcon } from "../../icons";
import { Theme, getInitialTheme, applyTheme, followSystemTheme } from "../../theme";

export interface ThemeToggleProps {
  /** Tema attivo. Senza theme il componente legge il tema salvato o quello del sistema e cambia da solo <html data-theme>. */
  theme?: Theme;
  onChange?: (theme: Theme) => void;
  /** Chiave del browser in cui ricordare il tema, senza theme (default "theme"). */
  storageKey?: string;
  /** Testi per gli screen reader, da tradurre per l'inglese. */
  labels?: { label?: string; light?: string; dark?: string };
}

/** Uno Switch già pronto per il tema: sole e luna, e in più la logica che applica e ricorda il tema. */
export function ThemeToggle({ theme, onChange, storageKey, labels = {} }: ThemeToggleProps) {
  const { label = "Tema", light = "Tema chiaro", dark = "Tema scuro" } = labels;
  const [inner, setInner] = React.useState<Theme>(() => theme ?? getInitialTheme(storageKey));
  const current = theme ?? inner;
  // Al primo render il tema si applica senza salvarlo: si salva solo quando lo sceglie la persona (vedi onChange).
  // Così, finché nessuno sceglie, la pagina continua a seguire il sistema operativo.
  React.useEffect(() => { if (theme == null) applyTheme(getInitialTheme(storageKey), storageKey, false); }, [theme, storageKey]);
  React.useEffect(() => {
    if (theme != null) return;
    return followSystemTheme((t) => { setInner(t); applyTheme(t, storageKey, false); }, storageKey);
  }, [theme, storageKey]);
  // Se il tema cambia da un'altra parte (un secondo ThemeToggle, useTheme), il pomello si allinea.
  React.useEffect(() => {
    if (theme != null || typeof MutationObserver === "undefined") return;
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      const t = root.getAttribute("data-theme");
      if (t === "light" || t === "dark") setInner(t);
    });
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [theme]);
  return (
    <Switch
      label={label}
      value={current}
      options={[
        { value: "light", name: light, content: <SunIcon size={18} /> },
        { value: "dark", name: dark, content: <MoonIcon size={18} /> },
      ]}
      onChange={(v) => {
        setInner(v as Theme);
        if (theme == null) applyTheme(v as Theme, storageKey, true);
        onChange?.(v as Theme);
      }}
    />
  );
}
