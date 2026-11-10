import * as React from "react";

/* Icone interne ai componenti, disegnate come Lucide (licenza ISC): griglia 24, tratto 1.75, currentColor. */
function Icon({ size = 20, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const SunIcon = (p: { size?: number }) => (
  <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></Icon>
);
export const MoonIcon = (p: { size?: number }) => (
  <Icon {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Icon>
);
export const MenuIcon = (p: { size?: number }) => (
  <Icon {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>
);
export const CloseIcon = (p: { size?: number }) => (
  <Icon {...p}><path d="M18 6 6 18M6 6l12 12" /></Icon>
);
export const CopyIcon = (p: { size?: number }) => (
  <Icon {...p}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>
);
export const CheckIcon = (p: { size?: number }) => (
  <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>
);
export const CodeIcon = (p: { size?: number }) => (
  <Icon {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></Icon>
);
export const ArrowRightIcon = (p: { size?: number }) => (
  <Icon {...p}><path d="M5 12h14M12 5l7 7-7 7" /></Icon>
);
