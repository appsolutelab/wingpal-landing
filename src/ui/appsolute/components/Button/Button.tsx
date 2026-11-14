import * as React from "react";
import { cx } from "../../utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: l'azione principale della vista (max una). secondary: default. ghost: azioni leggere in toolbar. danger: elimina. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "md" | "sm";
  /** Con href il bottone diventa un link <a> con lo stesso aspetto: usalo per navigare (es. "Scarica", "Vedi il codice"). */
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export function Button({ variant = "secondary", size = "md", href, target, rel, className, onClick, type = "button", children, ...rest }: ButtonProps) {
  const [pops, setPops] = React.useState(0);
  const cls = cx("ap-btn", "ap-btn-" + variant, size === "sm" && "ap-btn-sm", pops > 0 && (pops % 2 ? "ap-pop-1" : "ap-pop-2"), className);
  const handle = (e: React.MouseEvent<HTMLElement>) => {
    setPops((n) => n + 1);
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
  };
  if (href != null) {
    // Un link non si può disabilitare: senza href non è più raggiungibile e aria-disabled lo dice agli screen reader.
    const { disabled, ...anchorRest } = rest;
    if (disabled) return <a {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} role="link" aria-disabled="true" className={cls}>{children}</a>;
    return (
      <a {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={href} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)} className={cls} onClick={handle}>
        {children}
      </a>
    );
  }
  return (
    <button {...rest} type={type} className={cls} onClick={handle}>
      {children}
    </button>
  );
}
