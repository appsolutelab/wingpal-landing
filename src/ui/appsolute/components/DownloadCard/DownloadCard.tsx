import * as React from "react";
import { cx } from "../../utils";
import { DownloadIcon } from "../../icons";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

export type Platform = "windows" | "macos" | "linux";

export interface DownloadOption {
  platform: Platform;
  /** Indirizzo del file, di solito una release su GitHub. */
  href: string;
  /** Nome mostrato del sistema (default "Windows", "macOS", "Linux"). */
  label?: string;
  /** Nome del file: "WingPal_0.1.0_x64-setup.exe". */
  file?: string;
  /** Peso già formattato: "8,4 MB". */
  size?: string;
  /** Requisiti o formato: "Windows 10 o successivo", "AppImage, 64 bit". */
  note?: string;
}

export interface DownloadCardProps {
  /** Titolo della card (default "Scarica"). */
  title?: React.ReactNode;
  /** Versione, mostrata in un Badge: "v0.1.0". */
  version?: string;
  /** Data della versione già formattata: "24 gen 2027". */
  date?: string;
  /** Un file per sistema. Più file per lo stesso sistema (es. .deb e AppImage) sono ammessi: il primo è quello consigliato. */
  options: DownloadOption[];
  /** Sistema da proporre. Senza, il componente lo rileva dal browser dopo il primo render. */
  platform?: Platform | null;
  /** Riga in fondo: link a note di versione, checksum, codice. */
  footer?: React.ReactNode;
  /** Testi da tradurre. In download, {os} diventa il nome del sistema. */
  labels?: { download?: string; others?: string; all?: string; mobile?: string; get?: string };
  /** Livello del titolo (default 3). */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

const NAMES: Record<Platform, string> = { windows: "Windows", macos: "macOS", linux: "Linux" };

/** Sistema operativo del visitatore, o null su telefoni, tablet e dove non si capisce. Da chiamare solo nel browser. */
export function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } }).userAgentData;
  const ua = navigator.userAgent || "";
  if (uaData?.mobile || /Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return null;
  const p = (uaData?.platform || navigator.platform || ua).toLowerCase();
  if (p.includes("win")) return "windows";
  if (p.includes("mac")) return navigator.maxTouchPoints > 1 ? null : "macos"; // iPadOS si presenta come Mac
  if (p.includes("linux") || p.includes("x11")) return "linux";
  return null;
}

function Row({ o, get }: { o: DownloadOption; get: string }) {
  const name = o.label ?? NAMES[o.platform];
  return (
    <li>
      <a className="ap-download-row" href={o.href}>
        <span className="ap-download-row-text">
          <span className="ap-download-row-name">{name}</span>
          <span className="ap-download-meta">{[o.note, o.size].filter(Boolean).join(" · ")}</span>
        </span>
        <span className="ap-download-row-cta"><DownloadIcon size={16} />{get}<span className="ap-sr-only"> {name}{o.file ? ", " + o.file : ""}</span></span>
      </a>
    </li>
  );
}

/** Il blocco "Scarica" di una landing: propone il file per il sistema del visitatore e tiene gli altri a portata di mano. */
export function DownloadCard({ title = "Scarica", version, date, options, platform, footer, labels = {}, headingLevel = 3, className }: DownloadCardProps) {
  const { download = "Scarica per {os}", others = "Altri sistemi", all = "Scegli il tuo sistema", mobile = "È un'app per computer: apri questa pagina da Windows, macOS o Linux per scaricarla.", get = "Scarica" } = labels;
  // Il rilevamento parte dopo il primo render: così l'HTML generato in build e quello del browser coincidono.
  const [detected, setDetected] = React.useState<Platform | null | undefined>(platform);
  React.useEffect(() => { if (platform === undefined) setDetected(detectPlatform()); }, [platform]);
  const current = platform !== undefined ? platform : detected;
  const main = current ? options.find((o) => o.platform === current) : undefined;
  const rest = options.filter((o) => o !== main);
  const H = ("h" + headingLevel) as "h3";
  return (
    <section className={cx("ap-download", className)}>
      <header className="ap-download-head">
        <H className="ap-download-title">{title}</H>
        {version ? <Badge tone="accent">{version}</Badge> : null}
        {date ? <span className="ap-download-meta">{date}</span> : null}
      </header>
      {main ? (
        <div className="ap-download-main">
          <Button variant="primary" href={main.href}><DownloadIcon />{download.replace("{os}", main.label ?? NAMES[main.platform])}</Button>
          <span className="ap-download-meta">{[main.file, main.size, main.note].filter(Boolean).join(" · ")}</span>
        </div>
      ) : current === null ? (
        <p className="ap-download-mobile">{mobile}</p>
      ) : null}
      {rest.length ? (
        <div className="ap-download-others">
          <p className="ap-download-label">{main ? others : all}</p>
          <ul className="ap-download-list" role="list">{rest.map((o, i) => <Row key={o.platform + i} o={o} get={get} />)}</ul>
        </div>
      ) : null}
      {footer ? <div className="ap-download-footer">{footer}</div> : null}
    </section>
  );
}
