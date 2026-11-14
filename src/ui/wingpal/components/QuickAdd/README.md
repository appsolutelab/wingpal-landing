# QuickAdd

Campo a una riga per aggiungere al volo un'attività in cima a un elenco.

Il consumatore fornisce `label` (cosa si aggiunge: "Aggiungi attività") e `onAdd`, che riceve il testo quando la persona preme Invio o il bottone "+". Il campo si svuota da solo, pronto per la prossima.

- È scavato come `TextField`, con il bordo `line-strong`. Il bottone "+" si riempie di `accent` appena c'è del testo.
- `label` fa anche da testo d'esempio, a meno che non passi `placeholder`.
- `hint` è la riga di aiuto sotto: usala per dire cosa succede ("Invio per aggiungere").
- Aggiunge solo il titolo: scadenza, etichetta e collegamenti si scelgono dopo, aprendo l'attività.
- Va bene anche per una nota nuova ("Nuova nota") o un evento veloce nel giorno selezionato. Per un modulo completo usa `Dialog` con `TextField`.
