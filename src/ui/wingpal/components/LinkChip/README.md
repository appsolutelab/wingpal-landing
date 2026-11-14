# LinkChip

Il collegamento tra un evento, la sua nota e le attività che ne nascono: è il motivo per cui WingPal esiste.

Il consumatore fornisce `kind` (`event`, `note` o `task`: cosa c'è dall'altra parte), `title` e `onOpen`, che apre l'elemento collegato. `meta` è un dettaglio breve: l'orario dell'evento, la scadenza dell'attività.

- Mostrali dove serve passare da una cosa all'altra: nel dettaglio di un evento ("La sua nota"), in fondo a una nota ("Evento", "Attività nate da qui"), dentro una `NoteCard`.
- L'icona dice il tipo; gli screen reader leggono anche la parola ("Evento: Riunione di progetto").
- `onRemove` aggiunge una X che toglie il collegamento, **non** l'elemento: evento, nota e attività restano.
- È una pillola in rilievo piccolo come `Tag`, ma si clicca: premuta affonda. `Tag` è per le etichette, `LinkChip` per i collegamenti.
- `labels` traduce i tre tipi e l'azione della X.
