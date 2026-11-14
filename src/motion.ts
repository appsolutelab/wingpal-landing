// Reveal allo scroll delle sezioni sotto l'hero. Gli stili stanno in motion.css.
const TARGETS = [
  "main > .ap-section .ap-section-head",
  "main > .ap-section .ap-section-grid > *",
  ".wp-chain > li",
  ".ap-steps > li",
  ".wp-about > *",
].join(",");

export function initMotion(): void {
  const root = document.documentElement;
  // Idempotente; senza IntersectionObserver o con "riduci movimento" tutto resta visibile.
  if (root.classList.contains("wp-motion") || !("IntersectionObserver" in window)) return;
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

  const els = document.querySelectorAll<HTMLElement>(TARGETS);
  // React non ha ancora disegnato la pagina: si riprova al prossimo frame.
  if (!els.length) return void requestAnimationFrame(initMotion);

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("wp-in");
      io.unobserve(e.target); // una sola volta
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  for (const el of els) {
    // Posizione tra i fratelli: decide il ritardo dello scaglionamento.
    el.style.setProperty("--wp-i", String(Array.prototype.indexOf.call(el.parentElement!.children, el)));
    el.classList.add("wp-reveal");
    io.observe(el);
  }
  root.classList.add("wp-motion");
}
