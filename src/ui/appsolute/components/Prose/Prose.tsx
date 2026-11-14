import * as React from "react";
import { cx } from "../../utils";

export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  /** Elemento HTML (default "div"). Usa "article" per una pagina intera come la privacy. */
  as?: "div" | "article" | "section";
  /** HTML normale: h1–h3, p, ul, ol, a, code, pre, blockquote, hr, table. */
  children: React.ReactNode;
}

/** Colonna di testo lungo, leggibile: informativa sulla privacy, note di versione, pagine "Chi siamo". Dà lo stile ai tag HTML che contiene. */
export function Prose({ as = "div", className, children, ...rest }: ProseProps) {
  const El = as as "div";
  return <El {...rest} className={cx("ap-prose", className)}>{children}</El>;
}
