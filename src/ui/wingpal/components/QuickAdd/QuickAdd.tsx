import * as React from "react";
import { cx } from "../../utils";
import { PlusIcon } from "../../icons";

export interface QuickAddProps {
  /** Cosa si aggiunge, come etichetta per gli screen reader e testo d'esempio: "Aggiungi attività". */
  label: string;
  /** Chiamata con il testo quando la persona preme Invio o il bottone. Il campo si svuota da solo. */
  onAdd: (text: string) => void;
  /** Testo d'esempio nel campo (default uguale a label). */
  placeholder?: string;
  /** Riga di aiuto sotto il campo: "Invio per aggiungere". */
  hint?: React.ReactNode;
  /** Nome del bottone per gli screen reader (default "Aggiungi"). */
  submitLabel?: string;
  className?: string;
}

/** Campo a una riga per aggiungere al volo un'attività (o un evento, una nota) in cima a un elenco. */
export function QuickAdd({ label, onAdd, placeholder, hint, submitLabel = "Aggiungi", className }: QuickAddProps) {
  const [text, setText] = React.useState("");
  const hintId = React.useId();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText("");
  };
  return (
    <form className={cx("ap-quickadd", className)} onSubmit={submit}>
      <div className="ap-quickadd-field">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder ?? label} aria-label={label} aria-describedby={hint ? hintId : undefined} autoComplete="off" />
        <button type="submit" className="ap-quickadd-submit" aria-label={submitLabel} title={submitLabel} disabled={!text.trim()}><PlusIcon /></button>
      </div>
      {hint ? <span className="ap-quickadd-hint" id={hintId}>{hint}</span> : null}
    </form>
  );
}
