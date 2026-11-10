import * as React from "react";
import { cx } from "../../utils";
import { Button, ButtonProps } from "../Button/Button";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  /** Cosa fa il bottone, letto dagli screen reader e mostrato come suggerimento. Obbligatorio: l'icona da sola non basta. */
  label: string;
  /** Un'icona da 20px che usa currentColor. */
  icon: React.ReactNode;
}

export function IconButton({ label, icon, className, title, ...rest }: IconButtonProps) {
  return (
    <Button {...rest} aria-label={label} title={title ?? label} className={cx("ap-btn-icon", className)}>
      {icon}
    </Button>
  );
}
