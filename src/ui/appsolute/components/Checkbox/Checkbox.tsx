import * as React from "react";
import { cx } from "../../utils";
import { CheckIcon } from "../../icons";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Testo accanto alla casella: tutta la riga è cliccabile. */
  label: React.ReactNode;
  /** Riga di aiuto sotto l'etichetta. */
  hint?: React.ReactNode;
}

/** Casella per una scelta sì/no dentro un modulo o un elenco di opzioni. Per completare un'attività di WingPal usa TaskItem. */
export function Checkbox({ label, hint, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx("ap-checkbox", rest.disabled && "ap-checkbox-disabled", className)}>
      <input {...rest} type="checkbox" />
      <span className="ap-checkbox-box" aria-hidden="true"><CheckIcon size={14} /></span>
      <span className="ap-checkbox-text">
        {label}
        {hint ? <span className="ap-checkbox-hint">{hint}</span> : null}
      </span>
    </label>
  );
}
