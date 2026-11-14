# MonthGrid

La vista mese del calendario.

Il consumatore fornisce `year` e `month` (da 0 a 11, come in `Date`), gli `events` del periodo, `today` e, se c'è, il giorno `selected`. I giorni sono stringhe `"2026-11-14"` e gli orari `"14:30"`, già nel fuso in cui vanno mostrati. `onSelectDay` e `onSelectEvent` dicono cosa è stato cliccato.

- La settimana inizia di lunedì. I giorni dei mesi vicini sono in `ink-muted`.
- **Oggi** è il numero pieno di `marigold` con testo `on-marigold`: è l'unico marigold della griglia. Il giorno **selezionato** ha lo sfondo `accent-soft`. Non scambiarli.
- Gli eventi sono `EventBlock` compatti, in ordine di orario. Oltre `maxPerDay` (default 3) compare "Altri n", che porta al giorno.
- La griglia è piatta, divisa da `line`: in rilievo ci sono solo gli eventi.
- Riempie l'altezza del contenitore; ogni giorno è alto almeno 104px.
- `locale` cambia i nomi dei giorni e le date lette dagli screen reader ("it" di default, "en" per l'inglese); `labels.more` traduce "Altri {n}".

Il titolo del mese e le frecce stanno nel `ViewHeader`, non qui.
