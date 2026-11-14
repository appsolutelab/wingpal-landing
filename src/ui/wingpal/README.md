WingPal è l'app di appsolute che mette calendario, note, attività, promemoria e il calendario di famiglia in un unico posto, e può collegarsi a Google Workspace per essere usata a scuola al posto di Google Classroom. È open source. I dati vivono sul dispositivo e passano da un server solo per sincronizzarsi tra i tuoi dispositivi e con le persone con cui condividi un calendario. Il design deve trasmettere tre cose: ordine, calma e controllo sui propri dati. Lo stile è neumorfico: forme morbide che escono dallo sfondo o ci affondano.

WingPal è costruito sul design system **Appsolute** (https://claude.ai/artifact/Wwoj3Re3YXVT3ZFJyAqUAe), quello di base di appsolute: da lì arrivano i token neutri, i controlli (`Button`, `IconButton`, `TextField`, `Checkbox`, `Switch`, `Segmented`, `LangSwitch`, `ThemeToggle`), contenuti e contenitori (`Badge`, `Kbd`, `Card`, `Callout`, `EmptyState`, `Dialog`) e i blocchi della landing page (`Navbar`, `Hero`, `Section`, `FeatureCard`, `Steps`, `DownloadCard`, `WindowFrame`, `Faq`, `Prose`, `CodeBlock`, `RepoCard`, `Footer`). Questo design system aggiunge solo ciò che è di WingPal: `marigold`, i colori dei calendari, le regole su sincronizzazione, privacy e scuola, e i componenti dell'app: la finestra (`AppShell`, `SidebarItem`, `ViewHeader`, `SettingsRow`), il calendario (`MonthGrid`, `DayGrid`, `EventBlock`, `ColorSwatches`) e i contenuti (`TaskItem`, `QuickAdd`, `NoteCard`, `LinkChip`, `Reminder`, `Tag`, `PollCard`). I token di base sono ripetuti qui con gli stessi valori, così le anteprime funzionano da sole: se ne cambi uno, cambialo prima in Appsolute.

## Principi

- **Il contenuto è la persona.** Eventi, note e attività dell'utente sono la cosa più colorata dello schermo. L'interfaccia intorno resta neutra (`bg`, `surface`, `ink`).
- **Un accento solo, in bianco e nero.** `accent` è nero nel tema chiaro e grigio chiarissimo in quello scuro: indica cosa si può fare e cosa è selezionato. `marigold` indica il tempo: oggi, adesso, un promemoria. Non scambiarli.
- **Leggibile per tutti.** Il testo è in Atkinson Hyperlegible Next, pensato per chi legge con difficoltà. Ogni coppia testo/sfondo dichiarata nei token rispetta almeno 4.5:1 in entrambi i temi.
- **Privato, e onesto su come funziona.** La sincronizzazione passa da un server, quindi non promettere mai "i tuoi dati non lasciano il dispositivo". Spiega cosa succede in parole semplici: cosa viene inviato, a chi, e perché.

## Sincronizzazione e privacy

- Funziona anche senza connessione: l'app salva tutto sul dispositivo e sincronizza appena può. Non bloccare mai l'utente in attesa del server.
- Dì sempre con chi è condiviso un elemento. Un calendario condiviso mostra le persone che lo vedono (avatar o nomi), uno privato dice "Solo tu".
- Stato della sincronizzazione in `small` e `ink-muted`, sempre con una parola: "Sincronizzato", "In attesa di connessione", "Sincronizzazione…". Se fallisce, `danger` e cosa fare: "Non sincronizzato. Controlla la connessione, le modifiche sono salvate sul dispositivo."
- Usa "cifrato end-to-end" o "nemmeno noi possiamo leggere i tuoi dati" solo se il server lo garantisce davvero. Altrimenti scrivi cosa fa: "Le note private restano sul dispositivo. Gli eventi condivisi passano dal server di WingPal per arrivare alla tua famiglia."
- Niente pubblicità, niente tracciamento: se è vero, scrivilo nelle impostazioni e sulla landing page, in una frase.
- Open source: nelle impostazioni ("Informazioni") e nel footer della landing page metti il link al codice e il nome della licenza. Non serve altro: "Il codice è pubblico" è già una prova di quello che promettiamo.

## Google Workspace e scuola

- Il collegamento a Google è sempre una scelta dell'utente, mai obbligatorio. Prima di collegarlo, dì in una frase cosa verrà letto e scritto: "WingPal leggerà i tuoi corsi e il calendario di Google. Gli eventi che crei qui compariranno anche su Google Calendar."
- I dati che arrivano da Google passano dai server di Google: non dire mai che sono "solo sul tuo dispositivo". Marca gli elementi che vengono da Google con la scritta "Da Google" in `small` e `ink-muted`.
- Accesso con l'account della scuola: usa il bottone ufficiale "Accedi con Google" così com'è (colori, logo e testo di Google). Non ridisegnarlo con i nostri colori: le regole di Google lo vietano.
- Non usare il logo di Google Classroom né i suoi colori. Si parla di "corsi" e "compiti", non di "Classroom".
- Parole per la scuola: "corso" (non "classe virtuale"), "compito", "consegna", "valutazione", "docente", "studente". Scadenze dei compiti come in `TaskItem`: "Consegna entro ven 14 nov · 23:59".
- Le persone di una scuola si mostrano con nome e cognome, mai solo con l'indirizzo email istituzionale.
- File e allegati (materiali di un corso, consegne dei compiti, file condivisi in famiglia) stanno su Google Drive, non sul server di WingPal. L'utente sceglie il file con la finestra di selezione di Google; l'app vede solo i file scelti o creati da lei, mai tutto il Drive.
- Un allegato si mostra come una riga: icona del tipo di file, nome del file in `body-strong`, sotto "Google Drive · 2,4 MB" in `small` e `ink-muted`. Toccandola si apre il file in Drive.
- Prima di allegare un file a un corso o a un calendario condiviso, dì chi potrà vederlo: "Lo vedranno i 24 studenti del corso 4B Informatica." Se serve cambiare i permessi su Drive, l'app lo chiede, non lo fa in silenzio.
- Senza account Google non si possono allegare file: il bottone "Allega" spiega il perché ("Collega Google Drive per allegare file") invece di sparire.

## Tono di voce

- Dai del **tu**, frasi brevi, verbo all'inizio: "Aggiungi evento", "Crea nota", "Vota".
- Maiuscola solo all'inizio della frase: "Nuovo calendario", non "Nuovo Calendario".
- Niente punti esclamativi, niente emoji nell'interfaccia. L'utente può usarli nei propri contenuti.
- Gli errori dicono cosa è successo e come risolvere: "La data di fine è prima dell'inizio. Scegli un orario dopo le 14:30."
- Date e orari nel formato italiano: `mer 12 nov`, `14:30–16:00` (trattino lungo, niente "dalle... alle"), settimana che inizia di lunedì.

## Colore

- Sfondo dell'app `bg`. Bottoni, card, pannelli ed editor usano `surface`, che ha lo stesso colore dello sfondo: si distinguono solo per le ombre (vedi Neumorfismo). Input, checkbox e cose premute su `surface-sunken`; menu e dialoghi su `surface-raised` con `shadow-pop`.
- Testo principale `ink`, testo secondario `ink-muted`. Non creare altri grigi per il testo.
- Bottone primario: riempimento `accent`, testo `on-accent` (mai `#fff` fisso: nel tema scuro il bottone è chiaro e `on-accent` è scuro). All'hover cambia solo l'ombra, non il colore. Al massimo un bottone primario per vista.
- Elemento selezionato (voce in barra laterale, opzione votata): sfondo `accent-soft`, testo `ink`.
- Oggi, ora attuale e promemoria: riempimento `marigold` con testo `on-marigold`. Per testo, icone e linee sottili (la parola "Promemoria" in `Reminder`, la linea dell'ora attuale in `DayGrid`) usa `marigold-strong`.
- Bordo sottile `line-strong` su input e checkbox, insieme all'ombra scavata; divisori e griglia del calendario `line`. I bottoni non hanno bordo: li riconosci dal testo e dal rilievo.
- Stati: `danger` e `success` sempre accompagnati da una parola o un'icona.
- Colori dei calendari ed etichette: `cal-graphite` (predefinito), `cal-sky`, `cal-coral`, `cal-plum`, `cal-moss`. Si usano come striscia di 4px a sinistra di un evento o come pallino da 8px accanto a un nome, mai come colore del testo. Lo sfondo di un evento è il colore del calendario al 10% su `surface` (vedi `EventBlock`).

## Temi

Ci sono due temi, `light` (Chiaro) e `dark` (Scuro), con gli stessi nomi di token. In futuro si può aggiungere un tema OLED con sfondo nero puro: lì le ombre neumorfiche non si vedono, quindi rilievo e scavo andranno resi con bordi sottili e superfici grigio scuro invece che con le ombre. L'app segue il tema del sistema operativo e permette di forzarlo nelle impostazioni. Non scrivere mai un colore fisso nel codice: usa sempre `var(--nome-token)`, così il cambio di tema è automatico.

## Tipografia

- Tre famiglie: `display` (Bricolage Grotesque) per i titoli, `sans` (Atkinson Hyperlegible Next) per tutto il resto, `mono` (JetBrains Mono) per scorciatoie e codice nelle note.
- Stili: `display` solo sulla landing page e sulle schermate di benvenuto; `title` per il titolo della vista; `heading` per le sezioni; `body` per il testo; `body-strong` per titoli di eventi e attività; `small` per orari e metadati; `label` in maiuscolo per le intestazioni dei gruppi.
- Orari e numeri in colonna con `font-variant-numeric: tabular-nums`.
- Tutte e tre le famiglie sono su Google Fonts; nelle app native includile come file `.ttf`/`.woff2` (sono sotto licenza OFL, gratuite).

## Spaziatura, forme, profondità

- Griglia di 4px: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-6` 24 · `space-8` 32 · `space-12` 48. Margine laterale minimo su telefono `space-4`.
- Nel calendario mezz'ora è alta `space-6` (24px), un'ora 48px.
- Raggi: `radius-sm` per checkbox ed etichette, `radius-md` per bottoni, input ed eventi, `radius-lg` per card e dialoghi, `radius-pill` per filtri, avatar e barre dei sondaggi.
- Raggi attuali: `radius-sm` 4px, `radius-md` 10px, `radius-lg` 12px, `radius-pill` 999px.

## Neumorfismo

L'interfaccia sembra modellata nello stesso materiale dello sfondo: le cose escono dal piano o ci affondano, con la luce che arriva dall'alto a sinistra. Ogni ombra ha una parte scura in basso a destra e una chiara in alto a sinistra.

- **In rilievo** (`shadow-raised`): card e pannelli, per esempio attività e sondaggi. `shadow-raised-sm` per i controlli piccoli: etichette, eventi, opzioni.
- **Bottoni** (`shadow-button`): escono dallo schermo più delle card. Gradiente a 145° da `surface-raised` a `surface-sunken` (il primario da `accent-hover` ad `accent`) e un filo di luce sul bordo in alto a sinistra (`shadow-button-edge`). Al passaggio del puntatore `shadow-button-hover` e il bottone sale di 1px. Le ombre di un bottone non coprono mai un altro bottone: stanno su `::before` sotto il bottone e il contenitore isola l'impilamento; per lo stesso motivo i bottoni si muovono con `top`, non con `transform`.
- **Distanza e sfocatura:** la sfocatura di ogni ombra è il doppio della distanza (6px → 12px, 3px → 6px), come su neumorphism.io.
- **Scavato** (`shadow-inset` su `surface-sunken`): campi di input, checkbox vuote, barre di avanzamento.
- **Premuto:** un bottone premuto, un'attività completata, un'opzione votata passano da in rilievo a scavato. Il cambio di ombra è il feedback principale. Sul riempimento accent si usa `shadow-inset-accent`, perché `shadow-inset` lì sembrerebbe bianca.
- **Colore solo per l'azione:** il bottone primario e la checkbox spuntata sono pieni di `accent` con l'alone `shadow-glow`. Al massimo una o due cose con l'alone per schermata.
- **Ciò che galleggia** (menu, popover, dialoghi, promemoria, evento trascinato) usa `surface-raised` con `shadow-pop`. Dietro un `Dialog` aperto c'è il velo `scrim`.
- Non annidare rilievi dentro rilievi per più di due livelli: card in rilievo, controlli dentro in rilievo piccolo o scavati, e basta.

Il neumorfismo ha un difetto noto: con sole ombre chiare molte persone non vedono dove finisce un controllo. Per questo tre regole non si toccano:

1. Il testo segue sempre i contrasti dei token (almeno 4.5:1), anche su superfici in rilievo o scavate.
2. Input e checkbox hanno sempre il bordo sottile `line-strong`, oltre all'ombra.
3. Lo stato non si comunica solo con l'ombra: l'opzione votata ha anche il bordo `accent` e la scritta "(il tuo voto)", l'attività completata è barrata, il focus da tastiera ha sempre l'anello `accent`.
4. Con il contrasto elevato del sistema operativo (`forced-colors`) ombre e sfondi spariscono: `forced-colors.css` dà un contorno a ogni forma e tiene i colori dei calendari, che servono a distinguere gli eventi. Ogni componente nuovo va aggiunto lì.

## Interazione

- Focus da tastiera: anello solido di 2px in `accent`, distanziato di 2px dall'elemento (`outline: 2px solid var(--accent); outline-offset: 2px`). Visibile in entrambi i temi, mai rimosso. Nei campi di testo l'anello è il bordo `accent` da 2px con l'alone.
- Area toccabile minima 40×40px su mobile, anche se l'elemento disegnato è più piccolo (es. checkbox da 20px).
- Animazioni brevi, che confermano un'azione e non decorano:
    - **Click su un bottone:** scende di 1px e diventa scavato mentre lo premi, poi torna su con un piccolo rimbalzo in 240ms.
    - **Spunta di un'attività:** la checkbox fa un salto e si riempie di `accent` con l'alone, il segno di spunta si disegna, la riga barra il titolo da sinistra a destra e la card affonda nello sfondo. In tutto circa 350ms. Togliendo la spunta, tutto torna indietro.
    - **Voto in un sondaggio:** l'opzione si schiaccia e la barra dei voti si allunga in 350ms.
    - **Selezione di un campo di testo:** il campo si schiarisce, il bordo diventa `accent` e intorno si allarga un alone in 250ms. L'etichetta sopra diventa `accent`.
- Niente animazioni all'apertura della schermata: partono solo da un'azione dell'utente.
- Con `prefers-reduced-motion` attivo nel sistema operativo le animazioni si tolgono e gli stati cambiano subito.

## Icone

Le icone sono [Lucide](https://lucide.dev) (licenza ISC, tratto 1.75px a 20px), come in Appsolute e nella landing, colorate con `currentColor` così seguono il testo. La scelta del set è ancora da confermare nel piano dell'MVP: se cambia, cambiano solo i file `icons.tsx`. Il design system esporta le icone che usano i suoi componenti (`CalendarIcon`, `NoteIcon`, `TaskIcon`, `BellIcon`, `PlusIcon`, `ChevronLeftIcon`, `ChevronRightIcon`); per tutte le altre usa `lucide-react`. Il logo è nel gruppo di asset Product-Logos. Accanto al logo il nome si scrive `WingPal` in Bricolage Grotesque 700 a 20px, in `ink`; senza logo basta il nome.

## Componenti

I componenti di prodotto sono in `components/bundle.js` (React 18, oggetto globale `window.WingPal`) con gli stili in `components/bundle.css`. Le classi CSS iniziano con `ap-` come quelle di Appsolute e leggono solo i token.

- **Struttura:** `AppShell` (la finestra: barra laterale, vista, pannello di dettaglio), `SidebarItem` con `SidebarGroup`, `ViewHeader`, `SettingsRow` con `SettingsGroup`.
- **Calendario:** `MonthGrid` (mese), `DayGrid` (giorno e settimana), `EventBlock`, `ColorSwatches`.
- **Contenuti:** `TaskItem`, `QuickAdd`, `NoteCard`, `LinkChip`, `Reminder`, `Tag`, `PollCard`.

Una schermata dell'app si compone così: `AppShell` con la barra laterale (`SidebarGroup` e `SidebarItem` per Calendario, Attività, Note e per le etichette), un `ViewHeader` come intestazione e la vista al centro.

- **Calendario:** `MonthGrid` oppure `DayGrid`, scelti con il `Segmented` del `ViewHeader`. Un evento si crea e si modifica in un `Dialog` con `TextField` e `ColorSwatches`.
- **Attività:** `QuickAdd` in cima, poi i `TaskItem` in colonna. Vista vuota: `EmptyState`.
- **Note:** elenco di `NoteCard` a sinistra e l'editor nella vista; in fondo alla nota i suoi `LinkChip`.
- **Collegamenti:** dovunque un evento, una nota e un'attività sono collegati si vede un `LinkChip` che porta dall'uno all'altro. È la funzione che distingue WingPal: non nasconderla in un menu.
- **Impostazioni:** `SettingsGroup` con dentro le `SettingsRow` (tema, lingua, copia di sicurezza, informazioni).
- **Promemoria:** un `Reminder` in basso a destra della finestra, insieme alla notifica del sistema.

Gli eventi passano ai componenti del calendario come `CalendarEvent`: giorno `"2026-11-14"`, orari `"14:30"` già nel fuso in cui vanno mostrati. La conversione da UTC la fa la logica dell'app, non l'interfaccia.

Bottoni, campi di testo, cambio lingua e tema e tutti i blocchi della landing page sono nel design system Appsolute: in un progetto si caricano prima gli stili e i componenti di Appsolute, poi quelli di WingPal. Per comodità il bundle di questo design system contiene anche una copia di Appsolute: `window.WingPal.Button`, `window.WingPal.Dialog` e gli altri esistono, e `bundle.css` comprende i loro stili. Così anteprime e prototipi funzionano con un file solo. Quando Appsolute cambia, questo bundle va rigenerato.

Per la parte scuola (compito, corso, consegna) non ci sono ancora componenti dedicati: per ora un compito è un `TaskItem` con un `Tag` del colore del corso.

**Sorgenti TypeScript.** `components/src/` contiene i componenti come moduli React + TypeScript (un `.tsx` e un `.css` ciascuno), con `index.ts`, `styles.css`, `icons.tsx` e `utils.ts`. `ViewHeader`, `LinkChip`, `Reminder` e `ColorSwatches` usano bottoni e icone di Appsolute: li importano da `appsolute.ts`, che punta alla cartella accanto (`../appsolute`). `bundle-entry.ts` serve solo a generare il bundle di questo design system. `bundle.js`, `bundle.css` e `index.d.ts` sono generati da lì con esbuild. In un progetto React + Vite si copia la cartella accanto a quella di Appsolute (es. `src/ui/wingpal/` e `src/ui/appsolute/`) e si importano gli stili di Appsolute prima di quelli di WingPal.

**Testi e lingue.** Ogni componente che contiene testo ha la prop `labels` (o `label`, `names`) per passare la traduzione da i18next: `TaskItem`, `PollCard`, `AppShell`, `ViewHeader`, `MonthGrid`, `DayGrid`, `LinkChip`, `Reminder`, `ColorSwatches`, `QuickAdd`. `MonthGrid` e `DayGrid` hanno anche `locale` per i nomi dei giorni.
