import * as React from "react";
import { cx } from "../../utils";

export interface WindowFrameProps {
  /** Titolo nella barra: il nome dell'app o della vista. */
  title?: React.ReactNode;
  /** Il contenuto della finestra: uno screenshot (<img>) o componenti veri. */
  children: React.ReactNode;
  /** Descrizione per gli screen reader quando il contenuto è solo un'immagine dimostrativa. */
  label?: string;
  /** Il contenuto arriva ai bordi (per gli screenshot). Default: con padding space-4. */
  flush?: boolean;
  className?: string;
}

/** Cornice a forma di finestra per mostrare l'app in una landing. I tre punti sono neutri: non imita nessun sistema operativo. */
export function WindowFrame({ title, children, label, flush, className }: WindowFrameProps) {
  return (
    <figure className={cx("ap-window", flush && "ap-window-flush", className)} aria-label={label}>
      <div className="ap-window-bar" aria-hidden="true">
        <span className="ap-window-dots"><i /><i /><i /></span>
        {title ? <span className="ap-window-title">{title}</span> : null}
      </div>
      <div className="ap-window-body">{children}</div>
    </figure>
  );
}
