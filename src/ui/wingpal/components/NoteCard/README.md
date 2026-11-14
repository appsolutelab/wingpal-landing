# NoteCard

Una nota nell'elenco delle note.

Il consumatore fornisce `title` (la prima riga della nota), `excerpt` (l'inizio del testo, senza i simboli del Markdown) e `updated`, l'ultima modifica già formattata ("Oggi · 15:10"). `links` sono i collegamenti della nota, come `LinkChip`. `onOpen` apre la nota nell'editor.

- Tutta la card apre la nota; i `LinkChip` restano cliccabili per conto loro.
- La nota aperta nell'editor ha `active`: sfondo `accent-soft`, scavata.
- Dell'`excerpt` si vedono due righe. Il titolo sta su una riga sola.
- In elenco le card stanno in colonna, con `space-4` tra l'una e l'altra.
- Una nota senza titolo si chiama "Senza titolo", scritto in `ink` come ogni altro titolo.
