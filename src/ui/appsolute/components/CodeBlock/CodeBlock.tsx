import * as React from "react";
import { Button } from "../Button/Button";
import { CopyIcon, CheckIcon } from "../../icons";

export interface CodeBlockProps {
  /** Il codice, anche su più righe. Viene copiato così com'è, senza il "$". */
  code: string;
  /** Nome del file o del linguaggio, in alto a sinistra: "bash", "src/main.ts". */
  title?: string;
  /** Mostra "$" davanti a ogni riga, per i comandi da terminale. Il "$" non si seleziona e non si copia. */
  prompt?: boolean;
  /** Testi del bottone, da tradurre per l'inglese. */
  labels?: { copy?: string; copied?: string; failed?: string };
}

export function CodeBlock({ code, title, prompt, labels = {} }: CodeBlockProps) {
  const { copy = "Copia", copied = "Copiato", failed = "Copia non riuscita" } = labels;
  const [state, setState] = React.useState<"idle" | "ok" | "err">("idle");
  React.useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(t);
  }, [state]);
  const doCopy = () => {
    if (!navigator.clipboard) { setState("err"); return; }
    navigator.clipboard.writeText(code).then(() => setState("ok"), () => setState("err"));
  };
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <figure className="ap-code">
      <figcaption className="ap-code-head">
        <span className="ap-code-title">{title}</span>
        <Button variant="ghost" size="sm" onClick={doCopy}>
          {state === "ok" ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          <span aria-live="polite">{state === "ok" ? copied : state === "err" ? failed : copy}</span>
        </Button>
      </figcaption>
      <pre className="ap-code-pre" tabIndex={0}>
        <code>
          {lines.map((l, i) => (
            <span className="ap-code-line" key={i}>
              {prompt ? <span className="ap-code-prompt" aria-hidden="true">$ </span> : null}
              {l}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
