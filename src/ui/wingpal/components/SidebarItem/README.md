# SidebarItem

Una voce della barra laterale: porta a una vista dell'app o filtra per un'etichetta.

Il consumatore fornisce `label` e una tra `icon` (20px, per le viste: Calendario, Attività, Note) e `color` (il pallino di un'etichetta o di un calendario). `active` segna la vista aperta. `count` è un numero a destra, per esempio le attività da fare oggi. Con `href` la voce è un link, altrimenti un bottone con `onClick`.

- A riposo è piatta; al passaggio prende `shadow-raised-sm`; quella attiva è scavata su `accent-soft`, in grassetto e con `aria-current="page"`. Lo stato quindi non dipende solo dall'ombra.
- Una sola voce attiva in tutta la barra.
- `SidebarGroup` raggruppa le voci sotto un'intestazione in `label` ("Etichette"); la navigazione principale non ha intestazione. `action` è un controllo piccolo accanto al titolo, per esempio un `IconButton` ghost "Nuova etichetta".
- Nomi di una o due parole, maiuscola solo all'inizio. Se il nome è lungo viene troncato con i puntini.
- `count` solo dove serve agire (attività da fare), non per contare tutto.
