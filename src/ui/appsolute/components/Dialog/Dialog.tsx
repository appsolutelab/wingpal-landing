import * as React from "react";
import { cx } from "../../utils";
import { CloseIcon } from "../../icons";
import { IconButton } from "../IconButton/IconButton";

export interface DialogProps {
  /** Aperta o chiusa: lo stato lo tiene chi la usa. */
  open: boolean;
  /** Chiamata quando la persona chiude (Esc, clic fuori, bottone X). Metti open a false qui. */
  onClose: () => void;
  /** Titolo: dice cosa si sta facendo, "Nuovo evento", "Eliminare la nota?". */
  title: React.ReactNode;
  /** Contenuto: testo o un modulo. */
  children?: React.ReactNode;
  /** Bottoni in fondo, allineati a destra: prima "Annulla", poi l'azione. */
  actions?: React.ReactNode;
  /** sm 400px (conferme), md 520px (moduli, default). */
  size?: "sm" | "md";
  /** false: la finestra sta nel flusso della pagina senza velo. Serve solo per anteprime e documentazione. */
  modal?: boolean;
  /** Testo del bottone di chiusura (default "Chiudi"). */
  closeLabel?: string;
  className?: string;
}

/** Finestra di dialogo sopra la vista, costruita su <dialog>: il browser gestisce focus, Esc e sfondo inerte. */
export function Dialog({ open, onClose, title, children, actions, size = "md", modal = true, closeLabel = "Chiudi", className }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!modal) return; // nel flusso della pagina basta l'attributo open: niente focus spostato
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open, modal]);
  return (
    <dialog
      ref={ref}
      open={!modal && open ? true : undefined}
      className={cx("ap-dialog", "ap-dialog-" + size, !modal && "ap-dialog-inline", className)}
      aria-labelledby={titleId}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClose={() => { if (open) onClose(); }}
      // Il clic sul velo arriva sul <dialog> stesso: il contenuto sta in .ap-dialog-panel.
      onClick={(e) => { if (modal && e.target === e.currentTarget) onClose(); }}
    >
      <div className="ap-dialog-panel">
        <header className="ap-dialog-head">
          <h2 className="ap-dialog-title" id={titleId}>{title}</h2>
          <IconButton variant="ghost" size="sm" label={closeLabel} icon={<CloseIcon />} onClick={onClose} />
        </header>
        {children ? <div className="ap-dialog-body">{children}</div> : null}
        {actions ? <footer className="ap-dialog-actions">{actions}</footer> : null}
      </div>
    </dialog>
  );
}
