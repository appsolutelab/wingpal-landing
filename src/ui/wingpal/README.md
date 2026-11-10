# wingpal-ui

I componenti di prodotto di WingPal: `Tag`, `TaskItem`, `EventBlock`, `PollCard`. Tutto il resto (bottoni, campi di testo, Navbar e blocchi della landing, tema) arriva da **appsolute-ui**.

## Installazione

1. Copia questa cartella accanto ad appsolute-ui, per esempio in `src/ui/wingpal/`.
2. In `src/main.tsx` importa gli stili in quest'ordine, **una volta sola**:

```tsx
import "./ui/appsolute/styles.css"; // base: font, token, bottoni, landing
import "./ui/wingpal/styles.css";   // token di WingPal (marigold, colori dei calendari) e componenti di prodotto
```

3. Usa i componenti insieme:

```tsx
import { Button, Navbar, ThemeToggle } from "./ui/appsolute";
import { TaskItem, EventBlock, Tag } from "./ui/wingpal";
```

## Tema

Usa `ThemeToggle` e `useTheme` di appsolute-ui con la chiave di WingPal, così il tema scelto non si mescola con quello di altri progetti sullo stesso dominio:

```tsx
<ThemeToggle storageKey="wingpal-theme" />
```

e nello script in `<head>` di `index.html` usa `var key = "wingpal-theme"` (vedi il README di appsolute-ui).

## Italiano e inglese

`TaskItem` e `PollCard` hanno la prop `labels` per tradurre i testi interni ("Segna come fatta", "In ritardo", "(il tuo voto)", "voti").

## Struttura

- `components/<Nome>/<Nome>.tsx` e `<Nome>.css`: un componente per cartella.
- `index.ts` esporta tutto, compreso il tipo `CalendarColor`; `styles.css` importa token e stili.
- `tokens.css`: tutti i token di WingPal (quelli di Appsolute più `marigold` e i colori dei calendari). Generato dal design system WingPal.

## Regole

- Mai colori scritti a mano: solo `var(--nome-token)`. I colori dei calendari si scelgono con la prop `color` (`"sky"`, `"coral"`, `"plum"`, `"moss"`, `"graphite"`).
- Un componente che servirebbe anche a un altro progetto va spostato in appsolute-ui.
- Se modifichi un componente, aggiorna anche il design system WingPal: i sorgenti stanno in `project/components/src/`.
