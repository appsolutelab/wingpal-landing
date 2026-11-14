# EventBlock

Un evento nella griglia del calendario: striscia di 4px nel colore del calendario, sfondo con lo stesso colore al 10% su `surface`, titolo `ink`, orario `ink-muted`.

- Nella vista giorno/settimana l'altezza segue la durata: 48px per ora (`height`). `DayGrid` lo fa da solo.
- `compact` per la vista mese o per eventi brevi: titolo e orario su una riga.
- Il titolo viene troncato con i puntini, mai a capo su più di una riga.
- Un evento di tutto il giorno non ha `time`: se c'è, sotto il titolo resta solo `place`.
- Non è cliccabile da solo: `MonthGrid` e `DayGrid` lo mettono dentro un bottone. Se lo usi altrove e deve aprire l'evento, fai lo stesso.
- Il consumatore fornisce `title`, `time` già formattato ("14:30–16:00"), `place` facoltativo e `color` del calendario.
