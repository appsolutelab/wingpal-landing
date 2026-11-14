# Reminder

Il promemoria dentro l'app, quando arriva l'ora di un evento o di una scadenza.

Il consumatore fornisce `title` (il titolo dell'evento o dell'attività) e `time` ("Tra 10 minuti · 14:30"). `actions` sono al massimo due bottoni piccoli ("Posticipa di 5 min", "Apri"); `onDismiss` aggiunge la X.

- Accompagna la notifica del sistema operativo, non la sostituisce: serve a chi ha l'app aperta davanti.
- Galleggia in basso a destra della finestra su `surface-raised` con `shadow-pop`, largo al massimo 360px. Se ce n'è più di uno, in colonna con `space-3`.
- La campanella sta in un pozzetto `marigold` con `on-marigold`, la parola "Promemoria" è in `marigold-strong`: è il colore del tempo, non usarlo per altri avvisi.
- Non sparisce da solo: lo chiude la persona.
- Ha `role="status"`: gli screen reader lo leggono senza togliere il focus da dove si sta scrivendo.
- Per errori e conferme usa `Callout` di Appsolute.
