import "./hero.css";
import type { PointerEvent } from "react";
import { Bell, CalendarDays, Code, EyeOff, FileText, ListTodo, UserX, WifiOff } from "lucide-react";
import {
  Button, Callout, FeatureCard, Footer, Hero, LangSwitch, Navbar, Prose, RepoCard, Section, Steps, ThemeToggle,
  useTheme,
} from "./ui/appsolute";
import { EventBlock, LinkChip, NoteCard, Tag, TaskItem } from "./ui/wingpal";
import { it, type Texts } from "./i18n/it";
import { en } from "./i18n/en";
import heroLight from "./assets/hero-light.webp";
import heroDark from "./assets/hero-dark.webp";

type Lang = "it" | "en";

// shortcut: è il repository di questa landing, l'unico pubblico; da cambiare quando esce quello dell'app.
const REPO_NAME = "appsolutelab/wingpal-landing";
const REPO_URL = "https://github.com/" + REPO_NAME;
const LICENSE_URL = "https://www.gnu.org/licenses/agpl-3.0.html";
const THEME_KEY = "wingpal-theme";

const home = (lang: Lang) => import.meta.env.BASE_URL + (lang === "en" ? "en/" : "");
const privacyUrl = (lang: Lang) => home(lang) + "privacy/";
const icon = (I: typeof Bell) => <I size={20} strokeWidth={1.75} />;

function Logo() {
  return <span className="wp-logo" />;
}

function HeroPreview({ t }: { t: Texts["preview"] }) {
  const labels = { markDone: t.markDone, markTodo: t.markTodo, late: t.late };
  // Parallasse: solo mouse; il CSS la applica solo con pointer fine e senza prefers-reduced-motion.
  const parallax = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--wp-hero-px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty("--wp-hero-py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const rest = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty("--wp-hero-px");
    e.currentTarget.style.removeProperty("--wp-hero-py");
  };
  return (
    <div className="wp-hero-stage" onPointerMove={parallax} onPointerLeave={rest}>
      <div className="wp-hero-art">
        {/* React 18.3 non conosce fetchPriority: l'attributo va scritto minuscolo. */}
        <img className="wp-hero-img wp-hero-img-light" src={heroLight} alt="" width={1472} height={1104} {...{ fetchpriority: "high" }} decoding="async" />
        <img className="wp-hero-img wp-hero-img-dark" src={heroDark} alt="" width={1472} height={1104} decoding="async" />
      </div>
      <span className="wp-hero-chip" aria-hidden="true"><Tag color="sky">{t.tagSchool}</Tag></span>
      <section className="wp-preview wp-hero-card" aria-label={t.label}>
        <div className="wp-preview-head">
          <span className="wp-preview-title">{t.today}</span>
          <Tag tone="reminder">{t.reminder}</Tag>
        </div>
        <EventBlock title={t.event1} time="14:30–16:00" place={t.event1Place} color="sky" />
        <EventBlock title={t.event2} time="17:00–18:30" color="coral" />
        <TaskItem title={t.task1} due={t.task1Due} tag={t.tagSchool} tagColor="sky" labels={labels} />
        <TaskItem title={t.task2} due={t.task2Due} labels={labels} />
      </section>
    </div>
  );
}

function Privacy({ t }: { t: Texts["privacy"] }) {
  return (
    <Section title={t.title} headingLevel={1} lead={t.lead}>
      <Prose as="article">
        {t.sections.flatMap((x) => [
          <h2 key={x.title}>{x.title}</h2>,
          <p key={x.title + "-p"}>{x.text} {x.link ? <a href={x.link.href}>{x.link.label}</a> : null}</p>,
        ])}
        <p><small>{t.updated}</small></p>
      </Prose>
    </Section>
  );
}

export function App({ lang, page = "home" }: { lang: Lang; page?: "home" | "privacy" }) {
  const t = lang === "en" ? en : it;
  const privacy = page === "privacy";
  const base = privacy ? home(lang) : ""; // dalla pagina privacy le ancore tornano alla home
  // Il tema si salva solo quando lo sceglie la persona: fino ad allora la pagina segue il sistema operativo.
  const [theme, changeTheme] = useTheme(THEME_KEY);
  const chipLabels = t.links.chip;

  const links = [
    { label: t.nav.features, href: base + "#funzioni" },
    { label: t.nav.principles, href: base + "#principi" },
    { label: t.nav.roadmap, href: base + "#roadmap" },
    { label: t.nav.about, href: base + "#chi-siamo" },
  ];
  const featureIcons = [CalendarDays, ListTodo, FileText, Bell];
  const principleIcons = [WifiOff, UserX, EyeOff, Code];
  const taskLabels = { markDone: t.preview.markDone, markTodo: t.preview.markTodo, late: t.preview.late };

  return (
    <>
      <Navbar
        brand="WingPal"
        logo={<Logo />}
        homeHref={home(lang)}
        links={links}
        skipHref="#contenuto"
        labels={{ nav: t.nav.main, open: t.nav.open, close: t.nav.close, skip: t.nav.skip }}
        actions={
          <>
            <LangSwitch value={lang} label={t.nav.language} onChange={(l) => { window.location.href = (privacy ? privacyUrl(l as Lang) : home(l as Lang)) + window.location.hash; }} />
            <ThemeToggle theme={theme} onChange={changeTheme} labels={{ label: t.nav.theme, light: t.nav.light, dark: t.nav.dark }} />
          </>
        }
      />
      <main id="contenuto">
        {privacy ? <Privacy t={t.privacy} /> : <>
        <Hero
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          status={t.hero.status}
          lead={t.hero.lead}
          actions={
            <>
              <Button variant="primary" href={REPO_URL}>{t.hero.primary}</Button>
              <Button href="#funzioni">{t.hero.secondary}</Button>
            </>
          }
          media={<HeroPreview t={t.preview} />}
        />

        <Section id="problema" eyebrow={t.problem.eyebrow} title={t.problem.title} lead={t.problem.lead} grid>
          {t.problem.items.map((x) => (
            <FeatureCard key={x.title} title={x.title}>{x.text}</FeatureCard>
          ))}
        </Section>

        <Section id="funzioni" eyebrow={t.features.eyebrow} title={t.features.title} lead={t.features.lead} grid>
          {t.features.items.map((x, i) => (
            <FeatureCard key={x.title} icon={icon(featureIcons[i])} title={x.title}>{x.text}</FeatureCard>
          ))}
        </Section>

        <Section id="scarica">
          <Callout title={t.download.title} action={<Button size="sm" href={REPO_URL}>{t.download.action}</Button>}>{t.download.text}</Callout>
        </Section>

        <Section id="collegamenti" align="center" eyebrow={t.links.eyebrow} title={t.links.title} lead={t.links.lead}>
          <ol className="wp-chain" role="list">
            <li>
              <span className="wp-chain-step">{t.links.steps[0]}</span>
              <EventBlock title={t.preview.event1} time="14:30–16:00" place={t.preview.event1Place} color="sky" />
            </li>
            <li>
              <span className="wp-chain-step">{t.links.steps[1]}</span>
              <NoteCard
                title={t.links.noteTitle}
                excerpt={t.links.noteLines.join(". ") + "."}
                links={<LinkChip kind="event" title={t.preview.event1} meta="14:30" labels={chipLabels} />}
              />
            </li>
            <li>
              <span className="wp-chain-step">{t.links.steps[2]}</span>
              <TaskItem title={t.preview.task1} due={t.links.taskDue} tag={t.preview.tagSchool} tagColor="sky" labels={taskLabels} links={<LinkChip kind="note" title={t.links.noteTitle} labels={chipLabels} />} />
            </li>
          </ol>
        </Section>

        <Section id="principi" eyebrow={t.principles.eyebrow} title={t.principles.title} grid>
          {t.principles.items.map((x, i) => (
            <FeatureCard key={x.title} icon={icon(principleIcons[i])} title={x.title}>{x.text}</FeatureCard>
          ))}
        </Section>

        <Section id="roadmap" eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} lead={t.roadmap.lead}>
          <Steps layout="grid" items={t.roadmap.items.map((x) => ({ ...x, status: t.roadmap.status }))} />
        </Section>

        <Section id="chi-siamo" eyebrow={t.about.eyebrow} title={t.about.title}>
          <div className="wp-about">
            <div className="wp-about-text">
              <div className="wp-about-logo" role="img" aria-label="Appsolute Lab"><span className="wp-about-mark" /><span className="wp-about-wordmark" /></div>
              <p>{t.about.text}</p>
            </div>
            <RepoCard name={REPO_NAME} href={REPO_URL} description={t.about.repoDescription} license="AGPL-3.0" linkLabel={t.about.repoLink} />
          </div>
        </Section>
        </>}
      </main>
      <Footer
        brand="WingPal"
        logo={<Logo />}
        tagline={t.footer.tagline}
        navLabel={t.footer.nav}
        columns={[
          { title: t.footer.page, links },
          { title: t.footer.project, links: [{ label: t.footer.code, href: REPO_URL }, { label: t.footer.license, href: LICENSE_URL }, { label: t.footer.privacy, href: privacyUrl(lang) }] },
        ]}
        bottom={t.footer.bottom}
      />
    </>
  );
}
