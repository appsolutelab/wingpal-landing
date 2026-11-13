import "./hero.css";
import { useEffect, useState, type PointerEvent } from "react";
import { Bell, CalendarDays, Code, EyeOff, FileText, ListTodo, UserX, WifiOff } from "lucide-react";
import {
  Button, FeatureCard, Footer, Hero, LangSwitch, Navbar, RepoCard, Section, ThemeToggle,
  applyTheme, getInitialTheme, type Theme,
} from "./ui/appsolute";
import { EventBlock, Tag, TaskItem } from "./ui/wingpal";
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

export function App({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : it;
  // Il tema si salva solo quando lo sceglie la persona: fino ad allora la pagina segue il sistema operativo.
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(THEME_KEY));
  const changeTheme = (next: Theme) => { setTheme(next); applyTheme(next, THEME_KEY); };
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      try { if (window.localStorage.getItem(THEME_KEY)) return; } catch { /* storage bloccato: si segue il sistema */ }
      const next: Theme = mq.matches ? "dark" : "light";
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next); // non applyTheme: salverebbe la scelta
    };
    mq.addEventListener("change", follow);
    return () => mq.removeEventListener("change", follow);
  }, []);

  const links = [
    { label: t.nav.features, href: "#funzioni" },
    { label: t.nav.principles, href: "#principi" },
    { label: t.nav.roadmap, href: "#roadmap" },
    { label: t.nav.about, href: "#chi-siamo" },
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
        labels={{ nav: t.nav.main, open: t.nav.open, close: t.nav.close }}
        actions={
          <>
            <LangSwitch value={lang} label={t.nav.language} onChange={(l) => { window.location.href = home(l as Lang) + window.location.hash; }} />
            <ThemeToggle theme={theme} onChange={changeTheme} labels={{ label: t.nav.theme, light: t.nav.light, dark: t.nav.dark }} />
          </>
        }
      />
      <main>
        <Hero
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          lead={
            <>
              <span className="wp-hero-status">{t.hero.status}</span>
              {t.hero.lead}
            </>
          }
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

        <Section id="collegamenti" align="center" eyebrow={t.links.eyebrow} title={t.links.title} lead={t.links.lead}>
          <ol className="wp-chain" role="list">
            <li>
              <span className="wp-chain-step">{t.links.steps[0]}</span>
              <EventBlock title={t.preview.event1} time="14:30–16:00" place={t.preview.event1Place} color="sky" />
            </li>
            <li>
              <span className="wp-chain-step">{t.links.steps[1]}</span>
              <div className="wp-note">
                <span className="wp-note-title"># {t.links.noteTitle}</span>
                {t.links.noteLines.map((l) => <span key={l}>- {l}</span>)}
              </div>
            </li>
            <li>
              <span className="wp-chain-step">{t.links.steps[2]}</span>
              <TaskItem title={t.preview.task1} due={t.links.taskDue} tag={t.preview.tagSchool} tagColor="sky" labels={taskLabels} />
            </li>
          </ol>
        </Section>

        <Section id="principi" eyebrow={t.principles.eyebrow} title={t.principles.title} grid>
          {t.principles.items.map((x, i) => (
            <FeatureCard key={x.title} icon={icon(principleIcons[i])} title={x.title}>{x.text}</FeatureCard>
          ))}
        </Section>

        <Section id="roadmap" eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} lead={t.roadmap.lead}>
          <ol className="wp-roadmap" role="list">
            {t.roadmap.items.map((x, i) => (
              <li key={x.title}>
                <FeatureCard icon={<span className="wp-roadmap-n">{i + 1}</span>} title={x.title} status={t.roadmap.status}>{x.text}</FeatureCard>
              </li>
            ))}
          </ol>
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
      </main>
      <Footer
        brand="WingPal"
        logo={<Logo />}
        tagline={t.footer.tagline}
        navLabel={t.footer.nav}
        columns={[
          { title: t.footer.page, links },
          { title: t.footer.project, links: [{ label: t.footer.code, href: REPO_URL }, { label: t.footer.license, href: LICENSE_URL }] },
        ]}
        bottom={t.footer.bottom}
      />
    </>
  );
}
