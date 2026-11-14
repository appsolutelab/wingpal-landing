import * as React from "react";

/* Icone interne ai componenti di WingPal, disegnate come Lucide (licenza ISC): griglia 24, tratto 1.75, currentColor. */
function Icon({ size = 20, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const ChevronLeftIcon = (p: { size?: number }) => <Icon {...p}><path d="m15 18-6-6 6-6" /></Icon>;
export const ChevronRightIcon = (p: { size?: number }) => <Icon {...p}><path d="m9 18 6-6-6-6" /></Icon>;
export const PlusIcon = (p: { size?: number }) => <Icon {...p}><path d="M5 12h14M12 5v14" /></Icon>;
export const CalendarIcon = (p: { size?: number }) => <Icon {...p}><path d="M8 2v4M16 2v4M3 10h18" /><rect x="3" y="4" width="18" height="18" rx="2" /></Icon>;
export const NoteIcon = (p: { size?: number }) => <Icon {...p}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7ZM14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" /></Icon>;
export const TaskIcon = (p: { size?: number }) => <Icon {...p}><rect x="3" y="5" width="6" height="6" rx="1" /><path d="m3 17 2 2 4-4M13 6h8M13 12h8M13 18h8" /></Icon>;
export const BellIcon = (p: { size?: number }) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" /></Icon>;
