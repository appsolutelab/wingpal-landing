import * as React from "react";
import { Switch, SwitchOption } from "../Switch/Switch";

export interface LangOption {
  /** Codice della lingua, es. "it". Va anche nell'attributo lang. */
  value: string;
  /** Sigla mostrata, es. "IT". */
  label: string;
  /** Nome per esteso nella sua lingua, letto dagli screen reader: "Italiano", "English". */
  name: string;
}

export interface LangSwitchProps {
  /** Lingua attiva. Senza value il componente tiene lo stato da solo. */
  value?: string;
  onChange?: (value: string) => void;
  /** Le due lingue (default italiano e inglese). */
  options?: [LangOption, LangOption];
  /** Nome del gruppo per gli screen reader (default "Lingua"). */
  label?: string;
}

const DEFAULT: [LangOption, LangOption] = [
  { value: "it", label: "IT", name: "Italiano" },
  { value: "en", label: "EN", name: "English" },
];

/** Uno Switch già pronto per la lingua: le sigle come contenuto, il nome per esteso nella sua lingua per gli screen reader. */
export function LangSwitch({ value, onChange, options = DEFAULT, label = "Lingua" }: LangSwitchProps) {
  const opts = options.map((o) => ({ value: o.value, name: o.name, content: o.label, lang: o.value })) as [SwitchOption, SwitchOption];
  return <Switch label={label} value={value} defaultValue={options[0].value} options={opts} onChange={onChange} />;
}
