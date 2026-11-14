# ColorSwatches

Scelta del colore di un evento, di un calendario o di un'etichetta tra i cinque colori `cal-*`.

Il consumatore fornisce `label` per gli screen reader ("Colore dell'evento") e `onChange`, che riceve `graphite`, `sky`, `coral`, `plum` o `moss`. Con `value` lo stato lo tiene chi lo usa; senza, parte da `defaultValue` (grafite).

- Ogni colore ha un nome letto dagli screen reader e mostrato come suggerimento: Grafite, Azzurro, Corallo, Prugna, Muschio. `names` li traduce.
- Quello scelto ha la spunta e un anello `accent`: lo stato non dipende solo dal colore.
- Con le frecce della tastiera si passa da un colore all'altro.
- I colori sono solo questi cinque: non aggiungere un selettore libero, i token `cal-*` hanno già la versione per il tema scuro.
- Mettilo in un modulo accanto a una scritta visibile ("Colore"), come in un `SettingsRow` o nel `Dialog` di un evento.
