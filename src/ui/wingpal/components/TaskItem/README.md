# TaskItem

Una riga della lista attività: checkbox, titolo e, se servono, scadenza, etichetta e collegamenti.

- La checkbox è 22px, ma l'area che risponde al tocco è 40px.
- Completata: checkbox `accent` con spunta `on-accent`, titolo `ink-muted` barrato, card scavata nello sfondo. Quando la spunti, la checkbox fa un salto, il segno si disegna e la riga barra il titolo da sinistra a destra.
- `late`: la scadenza diventa "In ritardo · …" in `danger`. La parola rende lo stato chiaro anche senza colore.
- `onOpen` rende il titolo un bottone che apre l'attività, per cambiare scadenza, etichetta e collegamenti. La checkbox e il titolo restano due bersagli distinti.
- `links`: i `LinkChip` della nota o dell'evento da cui l'attività è nata. Stanno sotto la scadenza.
- `done` è il valore di partenza, ma la riga lo segue anche dopo: se i dati cambiano da fuori (un'altra vista, un ricaricamento) si allinea, senza animazione.
- Il consumatore fornisce `title`, `due` già formattato ("Domani · 08:00") e `onToggle`, che riceve il nuovo stato. In inglese passa `labels` (`markDone`, `markTodo`, `late`).
