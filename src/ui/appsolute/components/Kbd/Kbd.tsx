import * as React from "react";
import { cx } from "../../utils";

export interface KbdProps {
  /** I tasti della scorciatoia, in ordine: ["Ctrl", "K"]. Su macOS passa "⌘" al posto di "Ctrl". */
  keys?: string[];
  /** In alternativa a keys, un tasto solo come testo. */
  children?: React.ReactNode;
  className?: string;
}

/** Scorciatoia da tastiera: ogni tasto è un piccolo tasto in rilievo, in mono. */
export function Kbd({ keys, children, className }: KbdProps) {
  if (!keys) return <kbd className={cx("ap-kbd", className)}>{children}</kbd>;
  return (
    <span className={cx("ap-kbd-group", className)}>
      {keys.map((k, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <span className="ap-kbd-plus" aria-hidden="true">+</span> : null}
          <kbd className="ap-kbd">{k}</kbd>
        </React.Fragment>
      ))}
    </span>
  );
}
