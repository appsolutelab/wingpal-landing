import * as React from "react";
import { cx } from "../../utils";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Etichetta sempre visibile sopra il campo. */
  label: string;
  /** Aiuto sotto il campo. */
  hint?: string;
  /** Messaggio di errore: sostituisce hint e colora il bordo con danger. */
  error?: string;
  /** Parola prima del messaggio di errore (default "Errore"). */
  errorPrefix?: string;
  /** Campo su più righe (<textarea>) per testi lunghi: la descrizione di un evento, un messaggio. */
  multiline?: boolean;
  /** Righe visibili con multiline (default 4). Il campo si può allungare trascinando l'angolo. */
  rows?: number;
}

export function TextField({ label, hint, error, errorPrefix = "Errore", multiline, rows = 4, id, className, ...rest }: TextFieldProps) {
  const autoId = React.useId();
  const fieldId = id ?? "ap-field-" + autoId;
  const hintId = fieldId + "-hint";
  const msg = error || hint;
  return (
    <div className={cx("ap-field", error && "ap-field-error", className)}>
      <label htmlFor={fieldId}>{label}</label>
      {multiline ? (
        <textarea {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} rows={rows} id={fieldId} aria-invalid={error ? true : undefined} aria-describedby={msg ? hintId : undefined} />
      ) : (
        <input {...rest} id={fieldId} aria-invalid={error ? true : undefined} aria-describedby={msg ? hintId : undefined} />
      )}
      {msg ? <span id={hintId} className="ap-field-hint">{error ? errorPrefix + ": " + error : hint}</span> : null}
    </div>
  );
}
