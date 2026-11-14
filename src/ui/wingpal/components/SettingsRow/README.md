# SettingsRow

Una riga delle impostazioni: a sinistra cosa cambia, a destra il controllo.

Il consumatore fornisce `label` (il nome dell'impostazione), una `description` facoltativa e il controllo come `children`: `ThemeToggle`, `LangSwitch`, `Segmented`, un `Button` piccolo. Le righe vanno dentro `SettingsGroup`, che ha un `title` ("Aspetto", "I tuoi dati", "Informazioni") e le disegna in una card in rilievo, separate da `line`.

- `description` dice cosa cambia o lo stato attuale ("Ultima copia: oggi alle 15:10"), in `small` e `ink-muted`.
- Un controllo per riga. Le scelte hanno effetto subito: niente bottone "Salva" in fondo.
- `tone="danger"` per le azioni che cancellano dati: l'etichetta diventa `danger`, il bottone è `danger` e prima di agire apre un `Dialog` di conferma.
- Su finestre strette il controllo va a capo sotto il testo.
- In "Informazioni" metti la versione, la licenza AGPL-3.0 e il link al codice: sono la prova di quello che promettiamo.
