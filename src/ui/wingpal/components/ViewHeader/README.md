# ViewHeader

Intestazione di ogni vista dell'app: titolo, navigazione nel tempo, cambio vista e azione principale.

Il consumatore fornisce `title`, che è l'`<h1>` della finestra: il mese nel calendario ("Novembre 2026"), "Attività", il titolo di una nota. Il resto compare solo se lo passi:

- `onPrev`, `onNext`: le frecce per andare avanti e indietro. `onToday`: il bottone "Oggi".
- `views`, `view`, `onViewChange`: un `Segmented` piccolo per Mese / Settimana / Giorno.
- `actions`: a destra, il bottone primario della vista ("Nuovo evento", "Nuova nota") ed eventualmente la ricerca.
- `subtitle`: una riga in `small` sotto il titolo ("Settimana 46", "3 da fare oggi").

Regole:

- Un solo bottone primario, sempre a destra, sempre con il verbo ("Nuovo evento").
- Il titolo è in stile `title` e prende la maiuscola iniziale da solo: puoi passargli il mese come lo scrive `Intl.DateTimeFormat` ("novembre 2026").
- Nelle viste senza tempo (Attività, Note) non passare le frecce né "Oggi".
- `labels` traduce "Precedente", "Successivo", "Oggi" e il nome del gruppo delle viste.
