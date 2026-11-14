# WingPal · landing page

La landing page di [WingPal](#cosè-wingpal), l'app di appsolute che tiene insieme calendario, note e attività. La pagina presenta il progetto e porta al codice su GitHub. Non ci sono iscrizioni e non c'è niente da scaricare finché non esce una versione da scaricare.

> Stato: prima bozza. Questo README descrive come deve essere la pagina, così chi la costruisce parte dalle stesse decisioni.

## Cos'è WingPal

App gratuita e open source (AGPL-3.0) che mette calendario, note e attività in un posto solo. L'evento, la nota della riunione e le cose da fare restano collegati, quindi non serve saltare tra tre app diverse. La prima versione (MVP) è un'app desktop per una persona sola: funziona in locale, anche senza internet, e non chiede di creare un account. È prevista per gennaio 2027.

## Decisioni

| Tema              | Decisione                                                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pagine            | Una sola pagina con sezioni e ancore (`#funzioni`, `#principi`, `#roadmap`, `#chi-siamo`).                                                                                        |
| Stack             | React + Vite + TypeScript. I componenti della pagina (Navbar, Footer, Section, FeatureCard) sono pensati per essere riusati dalla futura landing aziendale.                       |
| CSS               | File `.css` normali, solo con le variabili del design system. Niente Tailwind, niente librerie di animazione, niente router.                                                      |
| Lingue            | Italiano e inglese. Due pagine (`/` e `/en/`) montano lo stesso componente. I testi stanno in `src/i18n/it.ts` e `src/i18n/en.ts`, con le stesse chiavi. Non usiamo i18next.      |
| Tema              | Chiaro e scuro. La pagina segue il sistema operativo, e un pulsante nell'header permette di forzare il tema. La scelta resta salvata nel browser (`localStorage`, con try/catch). |
| Azione principale | Un solo bottone primario: "Vedi il codice su GitHub". Il secondario "Scopri le funzioni" scorre fino a `#funzioni`.                                                               |
| Pubblicazione     | GitHub Pages, con `base` di Vite impostato a `/wingpal-landing/`.                                                                                                                 |

## Sezioni, in ordine

1. **Header**: logo `logo-w` + "WingPal", link alle sezioni, selettore IT / EN e cambio tema.
2. **Hero**: titolo in stile `display`, una frase che spiega WingPal e i due bottoni. Sotto il titolo, in `small` e `ink-muted`, la riga "In sviluppo · prima versione prevista a gennaio 2027". A fianco (sotto, su mobile) un'anteprima interattiva costruita con i componenti veri del design system, perché non ci sono ancora screenshot: `EventBlock`, `TaskItem` e `Tag`, con un'attività che si può spuntare.
3. **Il problema**: calendario, note e attività vivono oggi in tre app separate.
4. **Funzioni dell'MVP**: calendario (mese, settimana, giorno), attività con scadenza, note in Markdown, promemoria.
5. **Collegamenti**: la sezione in evidenza. Da un evento si apre la sua nota, da una nota si crea un'attività. È il motivo per cui WingPal esiste.
6. **Principi**: funziona in locale e offline, niente account, niente pubblicità né tracciamento, open source AGPL-3.0.
7. **Cosa viene dopo**: le tappe della roadmap, senza date. Prima più funzioni, poi la sincronizzazione cifrata end-to-end senza account, poi web e Android, e per ultime la condivisione e la scuola con Google Workspace.
8. **Chi siamo**: appsolute, progetto dell'ITIS G. Cardano di Pavia. Al posto del logo aziendale, che ancora non esiste, c'è un segnaposto.
9. **Footer**: link al codice di WingPal e nome della licenza.

## Testi: cosa possiamo promettere

- Al presente diciamo solo quello che l'MVP fa davvero: "Tutto resta sul tuo computer, funziona anche senza internet."
- Cifratura end-to-end e sincronizzazione compaiono solo in "Cosa viene dopo", come cose "in programma".
- Scuola e Google Workspace compaiono solo nella roadmap. Non usiamo il logo né i colori di Google Classroom.
- Tono: si dà del tu, frasi brevi, verbo all'inizio. Maiuscola solo a inizio frase. Niente punti esclamativi, niente emoji.

## Identità: regole che non si toccano

Le regole complete sono nei README di `src/ui/appsolute/` e `src/ui/wingpal/`. Le più importanti:

- Colori, ombre, spaziature e raggi vengono solo da `var(--…)`. Non si scrive mai un valore a mano e non si fanno override per tema: chiaro e scuro arrivano dai token.
- Stile neumorfico: sfondo e superfici hanno lo stesso colore e si distinguono con ombre doppie. Lo stato non si comunica mai solo con l'ombra, serve anche un bordo, un'icona o un testo.
- Un solo accento (`accent`, bianco e nero). `marigold` si usa solo per il tempo (oggi, adesso, promemoria).
- Font: Bricolage Grotesque per i titoli, Atkinson Hyperlegible Next per il testo, JetBrains Mono per il codice. Si caricano da Google Fonts.
- Contrasto almeno 4.5:1, focus ring visibile (`outline: 2px solid var(--accent); outline-offset: 2px`), area toccabile di almeno 40×40px.
- Con `prefers-reduced-motion` attivo, niente animazioni. Le animazioni partono solo da un'azione dell'utente.
- Se un controllo esiste nel bundle (`Button`, `TextField`, `Tag`, `TaskItem`, `EventBlock`, `PollCard`), si usa quello e non si ridisegna.

## Design system nel progetto

Il design system sono due cartelle di componenti React copiate da `Assets/` in `src/ui/`: `appsolute/` (token, controlli, tema e i blocchi della landing: Navbar, Hero, Section, FeatureCard, Steps, Callout, Prose, RepoCard, Footer…) e `wingpal/` (token di WingPal e i componenti dell'app: Tag, TaskItem, EventBlock, NoteCard, LinkChip…). Ognuna ha il suo README e le schede in `api/`. Ultima copia: 14 novembre 2026, da https://claude.ai/artifact/Wwoj3Re3YXVT3ZFJyAqUAe (Appsolute) e https://claude.ai/artifact/8WEus46ryqjutF2ga2CmCH (WingPal). Non si modificano qui: si modifica il design system e si ricopia la cartella.

Gli stili si importano una volta sola in `src/main.tsx`, prima quelli di appsolute e poi quelli di WingPal. Il tema scuro si attiva con `data-theme="dark"` su `<html>`; la chiave nel browser è `wingpal-theme`.

## Struttura

```
index.html          pagina italiana
en/index.html       pagina inglese
src/
  main.tsx          legge la lingua da <html lang> e monta la pagina
  App.tsx           la pagina, riceve la lingua
  App.css           stili della sola landing (prefisso wp-)
  i18n/it.ts, en.ts
  ui/appsolute/     copia del design system appsolute (non modificare)
  ui/wingpal/       copia del design system WingPal (non modificare)
```

## Comandi

```bash
npm install
npm run dev       # sviluppo
npm run build     # build in dist/
```

## Da fare

- [x] Progetto Vite + React + TS, con `base` per GitHub Pages
- [x] Copia del design system
- [x] Sezioni in italiano e in inglese (prima bozza)
- [x] Anteprima interattiva nell'hero
- [ ] Repository dell'app: per ora `REPO_NAME` in `src/App.tsx` punta a questa landing
- [ ] Prova di entrambi i temi, su mobile e con `prefers-reduced-motion`
- [x] Pubblicazione su GitHub Pages: https://wingpal.appsolute-lab.it/wingpal-landing/ (workflow in `.github/workflows/pages.yml`, parte a ogni push su `main`)
