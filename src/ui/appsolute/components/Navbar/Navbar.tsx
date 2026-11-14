import * as React from "react";
import { cx, NavLink } from "../../utils";
import { IconButton } from "../IconButton/IconButton";
import { MenuIcon, CloseIcon } from "../../icons";

export interface NavbarProps {
  /** Nome del prodotto accanto al logo. */
  brand: React.ReactNode;
  /** Logo prima del nome, es. <img src={logo} alt="" width={28} height={28} />. Decorativo: il nome dà già il testo. */
  logo?: React.ReactNode;
  /** Dove porta il logo (default "/"). */
  homeHref?: string;
  /** Voci di menu: ancore della landing ("#funzioni") o pagine. */
  links?: NavLink[];
  /** href della voce attiva: riceve aria-current="page". */
  current?: string;
  /** Controlli a destra: LangSwitch, ThemeToggle, un Button primario. */
  actions?: React.ReactNode;
  /** Resta in alto durante lo scorrimento (default true). */
  sticky?: boolean;
  /** Ancora del contenuto principale, es. "#contenuto": aggiunge il link "Vai al contenuto", che compare solo con il tasto Tab. */
  skipHref?: string;
  /** Testi per gli screen reader, da tradurre per l'inglese. */
  labels?: { nav?: string; open?: string; close?: string; skip?: string };
}

export function Navbar({ brand, logo, homeHref = "/", links = [], current, actions, sticky = true, skipHref, labels = {} }: NavbarProps) {
  const { nav = "Menu principale", open: openLabel = "Apri il menu", close = "Chiudi il menu", skip = "Vai al contenuto" } = labels;
  const ref = React.useRef<HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();
  React.useEffect(() => {
    if (!open) return;
    // Esc chiude il pannello e riporta il focus sul bottone menu: altrimenti resterebbe su una voce ormai nascosta.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector<HTMLElement>(".ap-nav-toggle")?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header ref={ref} className={cx("ap-nav", sticky && "ap-nav-sticky", open && "ap-nav-open")}>
      {skipHref ? <a className="ap-skip" href={skipHref}>{skip}</a> : null}
      <div className="ap-nav-bar">
        <a className="ap-nav-brand" href={homeHref}>
          {logo ? <span className="ap-nav-logo" aria-hidden="true">{logo}</span> : null}
          <span className="ap-nav-name">{brand}</span>
        </a>
        <IconButton
          className="ap-nav-toggle"
          variant="ghost"
          label={open ? close : openLabel}
          icon={open ? <CloseIcon /> : <MenuIcon />}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
        />
        <div className="ap-nav-panel" id={panelId}>
          {links.length ? (
            <nav className="ap-nav-links" aria-label={nav}>
              <ul>
                {links.map((l, i) => (
                  <li key={i}>
                    <a className={cx("ap-nav-link", l.href === current && "ap-nav-link-on")} href={l.href} aria-current={l.href === current ? "page" : undefined} onClick={() => setOpen(false)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {actions ? <div className="ap-nav-actions">{actions}</div> : null}
        </div>
      </div>
    </header>
  );
}
