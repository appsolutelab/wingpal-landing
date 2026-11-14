# AppShell

La finestra dell'app: barra laterale a sinistra, vista al centro, pannello di dettaglio facoltativo a destra.

Il consumatore fornisce tre zone:

- `sidebar`: il nome o il logo, poi `SidebarGroup` con dentro le `SidebarItem`.
- `header`: l'intestazione della vista, di solito un `ViewHeader`.
- `children`: la vista (`MonthGrid`, `DayGrid`, l'elenco delle attività, l'editor di una nota). Scorre da sola; barra laterale e intestazione restano ferme.
- `aside` (facoltativo): il dettaglio di ciò che è selezionato, per esempio la nota di un evento con i suoi `LinkChip`. Sotto i 960px scende sotto la vista.

Regole:

- Occupa tutta l'altezza del contenitore: dagli `height: 100vh` (o mettilo in un contenitore alto quanto la finestra).
- La barra laterale e il pannello di dettaglio sono card in rilievo staccate dai bordi; la vista al centro è piatta su `bg`, così i suoi contenuti (eventi, attività, note) possono avere il rilievo senza annidare più di due livelli.
- `collapsed` stringe la barra a 72px con le sole icone; il nome di ogni voce resta come suggerimento.
- Il bottone primario della vista sta nell'intestazione, in alto a destra. Uno solo.
- `labels` traduce i nomi delle zone per gli screen reader ("Navigazione", "Dettaglio").
