# PollCard

Sondaggio nel calendario di famiglia o di gruppo: una domanda, da due a cinque opzioni, un voto per persona.

- Ogni opzione mostra una barra proporzionale ai voti (`surface-sunken`) e il numero di voti in parole ("3 voti").
- L'opzione votata dall'utente ha bordo `accent` da 2px, barra `accent-soft` e la scritta "(il tuo voto)". Toccarla di nuovo toglie il voto: per questo ogni opzione è un bottone che si accende e si spegne, non una scelta obbligata.
- La domanda è un titolo nello stile `heading` (`headingLevel`, default `<h3>`); sotto, chi l'ha proposta e quando chiude.
- Se `myVote` cambia da fuori (dati ricaricati), la card si allinea.
- Il consumatore fornisce `question`, `options` con i voti degli altri, `myVote`, `meta` e `onVote` (riceve l'indice votato, o `null` se il voto è stato tolto). In inglese passa `labels` (`mine`, `vote`, `votes`).

Non fa parte della prima versione dell'app: serve quando arriverà la condivisione.
