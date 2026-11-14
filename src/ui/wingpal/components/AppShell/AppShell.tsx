import * as React from "react";
import { cx } from "../../utils";

export interface AppShellProps {
  /** La barra laterale: logo, SidebarGroup e SidebarItem. */
  sidebar: React.ReactNode;
  /** L'intestazione della vista, di solito un ViewHeader. */
  header?: React.ReactNode;
  /** La vista: MonthGrid, DayGrid, l'elenco delle attività, l'editor di una nota. Scorre da sola. */
  children: React.ReactNode;
  /** Pannello a destra per il dettaglio di ciò che è selezionato (la nota di un evento, i collegamenti). */
  aside?: React.ReactNode;
  /** Barra laterale stretta, solo icone (72px). */
  collapsed?: boolean;
  /** Nomi delle zone per gli screen reader. */
  labels?: { sidebar?: string; aside?: string };
  className?: string;
}

/** La finestra dell'app: barra laterale in rilievo a sinistra, vista al centro, pannello di dettaglio facoltativo a destra. Occupa tutta l'altezza del contenitore. */
export function AppShell({ sidebar, header, children, aside, collapsed, labels = {}, className }: AppShellProps) {
  const { sidebar: sidebarLabel = "Navigazione", aside: asideLabel = "Dettaglio" } = labels;
  return (
    <div className={cx("ap-shell", collapsed && "ap-shell-collapsed", aside ? "ap-shell-has-aside" : null, className)}>
      <nav className="ap-shell-sidebar" aria-label={sidebarLabel}>{sidebar}</nav>
      <div className="ap-shell-main">
        {header ? <div className="ap-shell-header">{header}</div> : null}
        <main className="ap-shell-content">{children}</main>
      </div>
      {aside ? <aside className="ap-shell-aside" aria-label={asideLabel}>{aside}</aside> : null}
    </div>
  );
}
