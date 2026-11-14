# DayGrid

La griglia oraria delle viste giorno e settimana.

Il consumatore fornisce `days`, i giorni in colonna come `"2026-11-14"` (uno per la vista giorno, sette per la settimana), e gli `events` di quei giorni con `start` ed `end` (`"14:30"`). `today` e `now` (`"15:10"`) disegnano oggi e l'ora attuale. `onSelectEvent` e `onSelectDay` dicono cosa è stato cliccato.

- Un'ora è alta 48px, mezz'ora `space-6`. `startHour` ed `endHour` (default 7 e 21) decidono le ore visibili.
- Ogni evento è un `EventBlock` alto quanto dura. Fino a un'ora è compatto, su una riga: titolo e orario. Due eventi che si sovrappongono si dividono la larghezza della colonna.
- Gli eventi senza `start` vanno nella riga "Tutto il giorno", in alto.
- **Oggi** ha il numero del giorno pieno di `marigold`; **l'ora attuale** è una linea `marigold-strong` con un pallino, solo nella colonna di oggi (`marigold` è un riempimento: per una linea sottile nel tema chiaro è troppo chiaro). Aggiorna `now` ogni minuto.
- Le righe delle ore sono `line`: la griglia è piatta, in rilievo ci sono solo gli eventi.
- L'intestazione con i giorni resta in alto quando la vista scorre.
- `locale` cambia i nomi dei giorni; `labels` traduce "Tutto il giorno", "oggi" e "Adesso".

Con sette giorni serve una finestra larga almeno 720px: sotto, passa alla vista giorno.
