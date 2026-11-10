# appsolute-ui

I componenti React + TypeScript del design system Appsolute: token di base, controlli (Button, IconButton, TextField, Switch, con i due Switch già pronti LangSwitch e ThemeToggle) e blocchi per le landing page (Navbar, Hero, Section, FeatureCard, CodeBlock, RepoCard, Footer). Vanno bene per qualsiasi progetto di appsolute.

## Installazione

1. Copia questa cartella nel progetto, per esempio in `src/ui/appsolute/`.
2. Serve solo React 18 (`react`, `react-dom`).
3. In `src/main.tsx` importa gli stili **una volta sola**:

```tsx
import "./ui/appsolute/styles.css";
```

4. Usa i componenti:

```tsx
import { Navbar, Hero, Section, FeatureCard, Button, LangSwitch, ThemeToggle, Footer } from "./ui/appsolute";
```

Se il progetto è un prodotto con un suo design system (per esempio WingPal), importa dopo anche gli stili del prodotto: i suoi token completano o sostituiscono questi.

## Niente lampo del tema sbagliato

Metti questo script in `index.html`, dentro `<head>`, prima di tutto il resto. Usa la stessa chiave che passi a `ThemeToggle` (`storageKey`, default `"theme"`):

```html
<script>
  (function () {
    var key = "theme", t = null;
    try { t = localStorage.getItem(key); } catch (e) {}
    if (t !== "light" && t !== "dark") t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
  })();
</script>
```

`ThemeToggle` senza props legge e aggiorna proprio quell'attributo. Se il tema ti serve nello stato dell'app usa `const [theme, setTheme] = useTheme("theme")` e passa `theme`/`onChange` al toggle.

## Switch: uno per tutte le scelte tra due cose

`ThemeToggle` e `LangSwitch` sono `Switch` già configurati. Per qualsiasi altra scelta tra due opzioni usa `Switch` e cambia solo icone, sigle e `onChange`:

```tsx
<Switch
  label="Vista"
  value={view}
  onChange={setView}
  options={[
    { value: "grid", name: "Griglia", content: <LayoutGrid size={18} /> },
    { value: "list", name: "Lista", content: <List size={18} /> },
  ]}
/>
```

## Italiano e inglese

I testi interni ai componenti sono in italiano di default. Ogni componente ha una prop per tradurli (`labels`, `label`, `navLabel`, `errorPrefix`). Con i18next:

```tsx
const { t, i18n } = useTranslation();

<Navbar
  brand="appsolute"
  labels={{ nav: t("nav.main"), open: t("nav.open"), close: t("nav.close") }}
  actions={<>
    <LangSwitch value={i18n.language} onChange={(l) => i18n.changeLanguage(l)} label={t("nav.language")} />
    <ThemeToggle labels={{ label: t("theme.label"), light: t("theme.light"), dark: t("theme.dark") }} />
  </>}
/>
```

Aggiorna anche `<html lang>` quando cambia la lingua.

## Com'è fatta una landing

```tsx
<Navbar brand="Nome prodotto" links={[{ label: "Funzioni", href: "#funzioni" }]} actions={…} />
<main>
  <Hero
    eyebrow="Gratis e open source"
    title="Cosa fa il prodotto, in una riga"
    lead="Una o due frasi oneste."
    actions={<>
      <Button variant="primary" href="#scarica">Scarica</Button>
      <Button href="https://github.com/…">Vedi il codice</Button>
    </>}
  />
  <Section id="funzioni" eyebrow="Funzioni" title="…" grid>
    <FeatureCard icon={<Calendar size={20} />} title="…">…</FeatureCard>
  </Section>
</main>
<Footer brand="Nome prodotto" columns={[…]} bottom={…} />
```

Un solo `h1` (nel `Hero`), un `h2` per ogni `Section`. Icone da `lucide-react` a 20px.

## Struttura

- `components/<Nome>/<Nome>.tsx` e `<Nome>.css`: un componente per cartella.
- `index.ts` esporta tutto; `styles.css` importa token, base e stili dei componenti.
- `tokens.css`: i token come variabili CSS. È generato dal design system: se cambi un valore, cambialo lì e ricopia il file.
- `theme.ts`: `useTheme`, `getInitialTheme`, `applyTheme`. `icons.tsx`: le icone usate dai componenti.

## Regole

- Mai colori, ombre o spaziature scritti a mano: solo `var(--nome-token)`.
- Le classi iniziano con `ap-`: non riusarle per altro.
- Qui stanno solo componenti utili a più progetti. Ciò che serve a un prodotto solo va nel design system del prodotto.
- Se modifichi un componente, aggiorna anche il design system Appsolute: i sorgenti stanno in `project/components/src/` e il bundle si rigenera da lì con esbuild.
