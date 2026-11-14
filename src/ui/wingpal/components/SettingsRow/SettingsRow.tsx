import * as React from "react";
import { cx } from "../../utils";

export interface SettingsRowProps {
  /** Nome dell'impostazione: "Tema", "Lingua", "Copia di sicurezza". */
  label: React.ReactNode;
  /** Una frase che dice cosa cambia, o lo stato attuale: "Ultima copia: oggi alle 15:10". */
  description?: React.ReactNode;
  /** Il controllo a destra: Switch, Segmented, Button. */
  children?: React.ReactNode;
  /** danger: per azioni che cancellano dati; l'etichetta diventa danger. */
  tone?: "default" | "danger";
}

/** Una riga delle impostazioni: testo a sinistra, controllo a destra. Va dentro SettingsGroup. */
export function SettingsRow({ label, description, children, tone = "default" }: SettingsRowProps) {
  return (
    <div className={cx("ap-setting", tone === "danger" && "ap-setting-danger")}>
      <div className="ap-setting-text">
        <span className="ap-setting-label">{label}</span>
        {description ? <span className="ap-setting-desc">{description}</span> : null}
      </div>
      {children ? <div className="ap-setting-control">{children}</div> : null}
    </div>
  );
}

export interface SettingsGroupProps {
  /** Titolo del gruppo: "Aspetto", "I tuoi dati", "Informazioni". */
  title: string;
  /** Le SettingsRow del gruppo. */
  children: React.ReactNode;
  /** Livello del titolo (default 2). */
  headingLevel?: 2 | 3;
}

/** Un gruppo di impostazioni: titolo e una card in rilievo con le righe separate da una linea. */
export function SettingsGroup({ title, children, headingLevel = 2 }: SettingsGroupProps) {
  const H = ("h" + headingLevel) as "h2";
  const id = React.useId();
  return (
    <section className="ap-settings" aria-labelledby={id}>
      <H className="ap-settings-title" id={id}>{title}</H>
      <div className="ap-settings-card">{children}</div>
    </section>
  );
}
