export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Link usato da Navbar e Footer. */
export interface NavLink {
  label: string;
  href: string;
}
