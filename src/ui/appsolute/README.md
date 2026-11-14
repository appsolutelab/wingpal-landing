Appsolute è il design system di base di appsolute, il gruppo di sei studenti dell'ITIS G. Cardano di Pavia che sviluppa app gratuite e open source. Contiene quello che serve a qualsiasi nostro progetto: token (colori in bianco e nero, ombre, tipografia, spaziature), componenti generici come bottoni e campi di testo, e i blocchi di una landing page. Ogni prodotto parte da qui e aggiunge solo ciò che è suo: WingPal, per esempio, aggiunge i colori dei calendari e i componenti per attività, eventi e sondaggi. Lo stile è neumorfico: forme morbide che escono dallo sfondo o ci affondano.

## Principi

- **Neutro, così il prodotto può parlare.** L'interfaccia è in grigi e un accento solo, nero nel tema chiaro e grigio chiarissimo in quello scuro. I colori veri li porta il contenuto o il prodotto che si appoggia su Appsolute.
- **Leggibile per tutti.** Il testo è in Atkinson Hyperlegible Next, pensato per chi legge con difficoltà. Ogni coppia testo/sfondo dichiarata nei token rispetta almeno 4.5:1 in entrambi i temi.
- **Onesti.** Nelle pagine e nelle app scriviamo solo promesse verificabili: licenza, link al codice, "niente pubblicità" solo se è vero. Se un servizio passa da un server, lo diciamo.
- **Leggeri.** Pochi componenti, niente dipendenze oltre a React, animazioni brevi che partono solo da un'azione.

## Tono di voce

- Dai del **tu**, frasi brevi, verbo all'inizio: "Scarica", "Vedi il codice", "Aggiungi".
- Maiuscola solo all'inizio della frase: "Codice pubblico", non "Codice Pubblico".
- Niente punti esclamativi, niente emoji nell'interfaccia.
- Gli errori dicono cosa è successo e come risolvere: "La password è troppo corta. Usa almeno 8 caratteri."
- Italiano e inglese: ogni testo dentro i componenti si può tradurre con le loro prop (`labels`, `label`, `errorPrefix`).

## Colore

- Sfondo `bg`. Bottoni, card e pannelli usano `surface`, che ha lo stesso colore dello sfondo: si distinguono solo per le ombre (vedi Neumorfismo). Input, checkbox, blocchi di codice e cose premute su `surface-sunken`; menu e dialoghi su `surface-raised` con `shadow-pop`.
- Testo principale `ink`, testo secondario `ink-muted`. Non creare altri grigi per il testo.
- Bottone primario: riempimento `accent`, testo `on-accent` (mai `#fff` fisso: nel tema scuro il bottone è chiaro e `on-accent` è scuro). Al massimo un bottone primario per vista.
- Link: `accent` e **sempre sottolineati**, perché `accent` ha quasi lo stesso tono di `ink`.
- Elemento selezionato (voce attiva del menu): sfondo `accent-soft`, testo `ink`.
- Bordo sottile `line-strong` su input, checkbox e pillole; divisori `line`. I bottoni non hanno bordo: li riconosci dal testo e dal rilievo.
- Stati: `danger` e `success` sempre accompagnati da una parola o un'icona.
- Un prodotto può aggiungere i suoi colori (WingPal aggiunge `marigold` e i colori dei calendari) ma non cambia il significato di questi.

## Temi

Due temi, `light` (Chiaro) e `dark` (Scuro), con gli stessi nomi di token. La pagina segue il tema del sistema operativo e permette di forzarlo con `ThemeToggle` (uno `Switch` con sole e luna), che lo scrive su `<html data-theme>`. Nel browser si ricorda solo il tema scelto dalla persona: finché nessuno sceglie, la pagina continua a seguire il sistema operativo, anche se cambia mentre è aperta. L'hook `useTheme` fa lo stesso per chi tiene il tema nello stato dell'app. In futuro si può aggiungere un tema OLED con sfondo nero puro: lì le ombre neumorfiche non si vedono, quindi rilievo e scavo andranno resi con bordi sottili e superfici grigio scuro. Non scrivere mai un colore fisso nel codice: usa sempre `var(--nome-token)`.

## Tipografia

- Tre famiglie: `display` (Bricolage Grotesque) per i titoli, `sans` (Atkinson Hyperlegible Next) per tutto il resto, `mono` (JetBrains Mono) per codice, comandi e scorciatoie.
- Stili: `display` per il titolo della landing (uno per pagina); `title` per i titoli di sezione; `heading` per card e sottosezioni; `body` per il testo; `body-strong` per etichette e titoli brevi; `small` per metadati e note; `label` in maiuscolo per sopratitoli; `mono` per il codice.
- Numeri in colonna con `font-variant-numeric: tabular-nums`.
- Tutte e tre le famiglie sono su Google Fonts con licenza OFL; nelle app native includile come file `.woff2`.

## Spaziatura, forme, profondità

- Griglia di 4px: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-6` 24 · `space-8` 32 · `space-12` 48. Margine laterale minimo su telefono `space-4`; tra le sezioni di una landing `space-12`.
- Contenuto largo al massimo 1120px.
- Raggi: `radius-sm` 4px per checkbox e pillole piccole, `radius-md` 10px per bottoni, input e blocchi di codice, `radius-lg` 12px per card e pannelli, `radius-pill` per pillole e cambio lingua.

## Neumorfismo

L'interfaccia sembra modellata nello stesso materiale dello sfondo: le cose escono dal piano o ci affondano, con la luce che arriva dall'alto a sinistra. Ogni ombra ha una parte scura in basso a destra e una chiara in alto a sinistra, e la sfocatura è il doppio della distanza.

- **In rilievo** (`shadow-raised`): card e pannelli. `shadow-raised-sm` per i controlli piccoli.
- **Bottoni** (`shadow-button`): escono dallo schermo più delle card. Gradiente a 145° da `surface-raised` a `surface-sunken` (il primario da `accent-hover` ad `accent`) e un filo di luce in alto a sinistra (`shadow-button-edge`), tranne sul primario: sul nero sembrerebbe un bordo. Al passaggio del puntatore `shadow-button-hover` e il bottone sale di 1px. Le ombre di un bottone non coprono mai un altro bottone.
- **Scavato** (`shadow-inset` su `surface-sunken`): campi di input, checkbox, blocchi di codice.
- **Premuto:** un bottone premuto passa da in rilievo a scavato. Sul riempimento accent si usa `shadow-inset-accent`.
- **Colore solo per l'azione:** il bottone primario ha l'alone `shadow-glow`. Al massimo una o due cose con l'alone per schermata.
- **Ciò che galleggia** (menu, popover, dialoghi) usa `surface-raised` con `shadow-pop`. Dietro un `Dialog` aperto c'è il velo `scrim`.
- Non più di due livelli: card in rilievo, controlli dentro in rilievo piccolo o scavati, e basta.

Con sole ombre chiare molte persone non vedono dove finisce un controllo. Per questo tre regole non si toccano:

1. Il testo segue sempre i contrasti dei token (almeno 4.5:1), anche su superfici in rilievo o scavate.
2. Input, checkbox e pillole hanno sempre il bordo sottile `line-strong`, oltre all'ombra.
3. Lo stato non si comunica solo con l'ombra: la voce attiva ha anche lo sfondo `accent-soft`, la lingua attiva cambia colore del testo, il focus da tastiera ha sempre l'anello `accent`.
4. Con il contrasto elevato del sistema operativo (`forced-colors`) ombre, gradienti e sfondi spariscono. `forced-colors.css` dà un contorno a ogni forma in rilievo o scavata e usa i colori di selezione del sistema per ciò che era pieno di `accent`. Ogni componente nuovo va aggiunto lì.

## Interazione

- Focus da tastiera: anello solido di 2px in `accent`, distanziato di 3px (`outline: 2px solid var(--accent); outline-offset: 3px`). Mai rimosso. Nei campi di testo l'anello è il bordo `accent` con l'alone.
- Area toccabile minima 40×40px, 44px per i bottoni.
- Animazioni brevi, che confermano un'azione:
    - **Click su un bottone:** scende di 1px e diventa scavato mentre lo premi, poi torna su con un piccolo rimbalzo in 240ms.
    - **Selezione di un campo di testo:** il campo si schiarisce, il bordo diventa `accent` e intorno si allarga un alone in 250ms.
    - **Switch:** il pomello scorre sull'opzione scelta in 300ms con un piccolo rimbalzo.
    - **Cambio di tema:** il pomello del `ThemeToggle` scorre; i colori della pagina cambiano subito, senza animare ombre e sfondi, così nessun bottone lampeggia.
- Niente animazioni all'apertura della pagina.
- Con `prefers-reduced-motion` attivo le animazioni si tolgono e gli stati cambiano subito.

## Icone

[Lucide](https://lucide.dev) (licenza ISC), 20px, tratto 1.75, colorate con `currentColor`. Il design system esporta le poche icone che usano i componenti (`MenuIcon`, `CloseIcon`, `SunIcon`, `MoonIcon`, `CopyIcon`, `CheckIcon`, `CodeIcon`, `ArrowRightIcon`, `DownloadIcon`, `ChevronDownIcon`, `InfoIcon`, `AlertIcon`, `CircleCheckIcon`); per tutte le altre usa `lucide-react`. Non disegnare loghi di altre aziende: GitHub, Google e simili si scrivono a parole. Il logo di appsolute (simbolo e scritta "Appsolute Lab") è nel gruppo di asset Logos: usalo come maschera su `ink`, così segue il tema; le regole sono nel README del gruppo.

## Componenti

I componenti sono in `components/bundle.js` (React 18, oggetto globale `window.Appsolute`) con gli stili in `components/bundle.css`. Le classi CSS iniziano con `ap-` e leggono solo i token.

- **Controlli:** `Button` (anche come link con `href`), `IconButton`, `TextField`, `Checkbox`, `Switch` (due posizioni, con icone o sigle) e `Segmented` (da due a cinque opzioni con un nome).
- **Switch già pronti:** `ThemeToggle` (sole/luna, con la logica del tema) e `LangSwitch` (IT/EN). Sono lo stesso `Switch` con le opzioni impostate: per ogni altra scelta tra due cose si usa `Switch` direttamente, cambiando icone o sigle e cosa fa `onChange`, senza creare un componente nuovo.
- **Contenuti e contenitori:** `Badge`, `Kbd`, `Card`, `Callout`, `EmptyState`, `Dialog`. Servono sia alle landing sia alle app.
- **Landing page:** `Navbar`, `Hero`, `Section`, `FeatureCard`, `Steps`, `DownloadCard`, `WindowFrame`, `ProjectCard`, `TeamCard`, `Faq`, `Prose`, `CodeBlock`, `RepoCard`, `Footer`.

Una landing si compone così: `Navbar` → `Hero` → una `Section` per argomento → `Footer`. Un solo `h1` (nel `Hero`), un `h2` per `Section`.

- **Landing di un prodotto** (wingpal.appsolute-lab.it): le funzioni con `FeatureCard` in griglia, l'app mostrata dentro un `WindowFrame`, la roadmap con `Steps`, il download con `DownloadCard` in una sezione con `id="scarica"`, le domande con `Faq`, il codice con `RepoCard` e `CodeBlock`. Finché non c'è una versione da scaricare, al posto di `DownloadCard` metti un `Callout` "In sviluppo" e il link al codice.
- **Pagina di appsolute** (appsolute-lab.it): i prodotti con `ProjectCard`, il gruppo con `TeamCard`, il codice con `RepoCard`.
- **Pagine di testo** (privacy, note di versione): `Navbar` → una `Section` con dentro `Prose` → `Footer`.

Stati e pillole si scrivono con `Badge`; un avviso dentro la pagina è un `Callout`; una vista vuota è un `EmptyState`; una conferma o un modulo breve sopra la vista è un `Dialog`.

**Sorgenti TypeScript.** `components/src/` contiene i componenti come moduli React + TypeScript: un file `.tsx` e un `.css` per componente, `index.ts` che li esporta tutti e `styles.css` che importa gli stili. `bundle.js`, `bundle.css` e `index.d.ts` sono generati da lì con esbuild. In un progetto React + Vite si copia la cartella (es. in `src/ui/appsolute/`), si importa `styles.css` una volta in `main.tsx` e poi `import { Navbar, Hero } from "./ui/appsolute"`.

## Prodotti costruiti su Appsolute

- **WingPal** — calendario, note, attività e calendario di famiglia. Usa tutti i token e i componenti di Appsolute e aggiunge `marigold`, i colori dei calendari e i componenti `Tag`, `TaskItem`, `EventBlock`, `PollCard` nel suo design system.

Un nuovo prodotto fa lo stesso: copia i token di Appsolute, aggiunge i suoi e tiene nel proprio design system solo i componenti che hanno senso per lui. Se un componente serve a due prodotti, va spostato qui.


---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

`components/bundle.js` defines `window.Appsolute` (28 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. The bundle needs react 18 (not packed in this system: bring your own copy) (`window.React`), react-dom 18 (not packed in this system: bring your own copy) (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `tokens.css`, `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); in each artboard that uses this system, right after the `support.js` line, load `tokens.css` first, then the stylesheet, then the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="Appsolute.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens only — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers.

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`; stored assets and their paths: `api/assets/<Group>.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` and `assets/<Group>/README.md` are the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: surface, text, fill, palette, type, spacing, radius, shadow. (12.9k)

**Icons and assets**

- `api/assets/Logos.md` — 6 files, by asset id. (2.2k)

**Components** (`api/components/<Comp>.md`, 28)

- **Azioni**: `Button` — Esegue un'azione; l'etichetta è un verbo all'inizio, con la maiuscola solo sulla prima parola ("Aggiungi evento") · `IconButton` — Bottone con una sola icona, per barre e controlli compatti; ha sempre un'etichetta letta dagli screen reader · `Switch` — Selettore a due posizioni: un binario scavato con un pomello che scorre sull'opzione attiva · `Segmented` — Scelta tra poche opzioni con un nome, tutte visibili: Mese / Settimana / Giorno · `LangSwitch` — Uno Switch già pronto per la lingua: IT a sinistra, EN a destra · `ThemeToggle` — Uno Switch già pronto per il tema: sole a sinistra (chiaro), luna a destra (scuro), più la logica che applica e ricorda il tema
- **Input**: `TextField` — Campo di testo con etichetta sempre visibile; il placeholder è un esempio, mai l'etichetta · `Checkbox` — Casella per una scelta sì/no dentro un modulo o un elenco di opzioni
- **Contenuti**: `Badge` — Pillola piccola che dice lo stato di qualcosa: una versione, una licenza, "In sviluppo" · `Kbd` — Mostra una scorciatoia da tastiera: ogni tasto è un piccolo tasto in rilievo, in mono
- **Contenitori**: `Card` — Pannello generico: il contenitore di base per raggruppare contenuti in un'app o in una landing · `Callout` — Avviso dentro la pagina: dice una cosa che la persona deve sapere prima di andare avanti · `EmptyState` — Riempie una vista o una card ancora vuota e dice come iniziare · `Dialog` — Finestra sopra la vista per una cosa sola: confermare un'azione o compilare un modulo breve
- **Landing**: `Navbar` — Barra in alto della landing page: logo e nome a sinistra, voci di menu, controlli a destra; su telefono le voci vanno in un menu a comparsa · `Hero` — Apertura della landing page: un titolo, una frase che spiega cosa fa il prodotto, al massimo due azioni · `Section` — Una sezione della landing page: contenitore largo al massimo 1120px con intestazione (sopratitolo, titolo, frase) e il contenuto sotto · `FeatureCard` — Card in rilievo che presenta una funzione dell'app: icona, nome, una o due frasi, eventualmente un link · `Steps` — Elenco numerato di tappe in ordine: una roadmap, i passi di un'installazione, "come funziona" · `DownloadCard` — Il blocco "Scarica" di una landing: propone il file giusto per il computer del visitatore e tiene gli altri a portata di mano · `WindowFrame` — Cornice a forma di finestra per mostrare l'app in una landing · `ProjectCard` — Card di un prodotto nella pagina di appsolute: tutta la card è un link alla landing del prodotto · `TeamCard` — Una persona del gruppo: avatar tondo, nome e di cosa si occupa · `Faq` — Domande e risposte che si aprono una per una · `Prose` — Colonna di testo lungo, leggibile: informativa sulla privacy, note di versione, una pagina "Chi siamo" · `CodeBlock` — Blocco di codice o di comandi da terminale con il bottone Copia, per la sezione "Il codice è pubblico" e la documentazione · `RepoCard` — Card che porta al codice su GitHub: nome del repository, una frase, licenza e linguaggi · `Footer` — Chiusura della landing page: nome e frase a sinistra, colonne di link a destra, riga finale con licenza e promesse
