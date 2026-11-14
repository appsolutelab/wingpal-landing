import * as React from "react";
import { cx, calVar, CalendarColor } from "../../utils";

export interface SidebarItemProps {
  /** Nome della voce: "Calendario", "Attività", "Scuola". */
  label: string;
  /** Icona da 20px che usa currentColor. */
  icon?: React.ReactNode;
  /** Al posto dell'icona, il pallino di un calendario o di un'etichetta. */
  color?: CalendarColor;
  /** La voce della vista aperta: sfondo accent-soft e aria-current. */
  active?: boolean;
  /** Numero a destra, es. le attività da fare oggi. */
  count?: number;
  /** Con href la voce è un link; senza, un bottone. */
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/** Una voce della barra laterale. In una barra collapsed (AppShell) resta solo l'icona e il nome diventa il suggerimento. */
export function SidebarItem({ label, icon, color, active, count, href, onClick }: SidebarItemProps) {
  const inner = (
    <>
      <span className="ap-side-icon" aria-hidden="true">
        {color ? <span className="ap-side-dot" style={{ background: calVar(color) }} /> : icon}
      </span>
      <span className="ap-side-label">{label}</span>
      {count != null ? <span className="ap-side-count">{count}</span> : null}
    </>
  );
  const cls = cx("ap-side-item", active && "ap-side-item-active");
  return href != null ? (
    <a className={cls} href={href} title={label} aria-current={active ? "page" : undefined} onClick={onClick}>{inner}</a>
  ) : (
    <button type="button" className={cls} title={label} aria-current={active ? "page" : undefined} onClick={onClick}>{inner}</button>
  );
}

export interface SidebarGroupProps {
  /** Intestazione in maiuscolo: "Etichette". Senza, il gruppo non ha titolo (la navigazione principale). */
  label?: string;
  /** Un controllo piccolo accanto al titolo, es. un IconButton ghost "Nuova etichetta". */
  action?: React.ReactNode;
  /** Le SidebarItem del gruppo. */
  children: React.ReactNode;
}

/** Raggruppa le voci della barra laterale sotto un'intestazione. */
export function SidebarGroup({ label, action, children }: SidebarGroupProps) {
  const id = React.useId();
  return (
    <div className="ap-side-group" role="group" aria-labelledby={label ? id : undefined}>
      {label ? (
        <div className="ap-side-group-head">
          <span className="ap-side-group-label" id={id}>{label}</span>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}
